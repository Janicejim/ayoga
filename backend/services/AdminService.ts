import { Knex } from "knex";

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

  async getUnCommentStudentSummary() {
    return (
      await this.knex.raw(`
        select student_class.class_id,class.name as class_name,users_info.name as student_name,email,class.date from student_class join users on users.id=student_class.user_id join class on student_class.class_id=class.id left join student_comment on student_comment.class_id =student_class.class_id join (select id,name from users) as users_info on users_info.id=student_class.user_id  where date<current_date
        and comment isnull order by date asc
        
    `)
    ).rows;
  }

  async getCompanyFinancialData() {
    return;
  }
}
