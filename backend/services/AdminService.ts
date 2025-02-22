import { Knex } from "knex";
import { UserRecord } from "../utils/models";

export class AdminService {
  constructor(private knex: Knex) { }

  async getAllUsers() {
    return await this.knex("users")
      .select("id", "name", "icon", "email", "role", "phone")

  }
  async getUserByKeyword(keyword: string) {
    return (
      await this.knex.raw(
        `select id,name,icon,email,role,phone from users where email ilike ? or name ilike ?`,
        [`%${keyword}%`, `%${keyword}%`]
      )
    ).rows;
  }

  async getUserEmailById(id: number) {
    return await this.knex("users").select("email").where("id", id);
  }

  async getTeacherRequests() {
    return (
      await this.knex.raw(
        `select teacher_info.id, name,photo,introduction,newest_qualification,cert, id_photo,teacher_info.updated_at as request_date from teacher_info join users on users.id=teacher_info.id  where teacher_info.status='pending'  order by teacher_info.updated_at desc`
      )
    ).rows;
  }

  async acceptTeacherRequests(id: number) {
    await this.knex("teacher_info")
      .update({ status: "accept" })
      .where("id", id);
  }
  async rejectTeacherRequests(id: number, remark: string) {
    await this.knex("teacher_info")
      .update({ status: "reject", remark })
      .where("id", id);
  }

  async updateUserRole(user_id: number, role: string) {
    await this.knex("users").update({ role }).where("id", user_id);
  }

  async getTransactions() {
    return (
      await this.knex.raw(
        `select type,id,user_id,class_id,credit,transaction_id,refund_related_id ,updated_at from user_credit_record where type !='top-up' and type !='withdrawal' order by created_at desc`
      )
    ).rows;
  }

  async getTransactionByKeyword(keyword: string) {
    return (
      await this.knex.raw(
        `  select type,id,user_id,class_id,credit,transaction_id,refund_related_id ,updated_at from user_credit_record where type !='top-up' and type !='withdrawal'  and transaction_id=? or refund_related_id =? order by created_at desc`,
        [keyword, keyword]
      )
    ).rows;
  }


  public async checkCreditRecords(classId: number, userId: number) {
    const useCreditRecord = (
      await this.knex.raw(
        `select id,transaction_id,credit,type,class_id,user_id from user_credit_record where class_id=? and user_id=? and type='use'`,
        [classId, userId]
      )
    ).rows;

    const earnCreditRecord = (
      await this.knex.raw(
        `select id,transaction_id,credit,type,class_id,user_id from user_credit_record where class_id=? and type='earn'`,
        [classId]
      )
    ).rows;


    return { useCreditRecord: useCreditRecord[0], earnCreditRecord: earnCreditRecord[0] }

  }


  public async refundCaseHandle(
    records: UserRecord[],
    classId: number,
    userId: number,
  ) {
    let txn = await this.knex.transaction();
    try {
      let timestamp = Date.now();

      for (let record of records) {
        let refundRecord = await txn("user_credit_record").insert({
          type: record.type == "earn" ? "student-refund" : "refund",
          credit: -record.credit,
          class_id: record.class_id,
          user_id: record.user_id,
          refund_related_id: record.transaction_id
        }).returning("id")

        let transaction_id = `rf${timestamp}-${refundRecord[0].id}`.split("-").join("");
        await txn("user_credit_record").update({ transaction_id }).where("id", refundRecord[0].id);


      }

      // update student_class record to inactive
      await txn("student_class").update({ status: "inactive" })
        .where("class_id", classId)
        .andWhere("user_id", userId)

      await txn.commit();
    } catch (e) {
      console.log(e);
      await txn.rollback();
    }
  }


}
