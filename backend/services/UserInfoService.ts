import { Knex } from "knex";

export class UserInfoService {
  constructor(private knex: Knex) { }

  async getUserBoxInfo(user_id: number) {
    return (
      await this.knex.raw(
        `select email,phone,icon,name,role,coalesce ((credit),0) as credit from users left join (select user_id,sum(credit) as credit from user_credit_record group by user_id) as credit_info on users.id=credit_info.user_id where users.id=?`,
        [user_id]
      )
    ).rows;
  }

  async getBooking(user_id: number) {
    return (
      await this.knex.raw(
        `select uuid as class_number, yoga_type.name as yoga_type,class.id as id,image,venue,type,class.name,users.name as instructor,uuid,link,introduction,credit,language,capacity,date,end_time,start_time,
    (class.date + class.end_time::time) < NOW() AS is_end from class join users on class.teacher_id=users.id join student_class on class.id=student_class.class_id 
     left join yoga_type on yoga_type.id=class.yoga_type_id
    where student_class.user_id=? and student_class.status='active' order by class.date asc`,
        [user_id]
      )
    ).rows;
  }

  async getBookmark(user_id: number) {
    return (
      await this.knex.raw(
        ` select yoga_type.name as yoga_type,image,venue,class.name as name,users.name as instructor,class.type,uuid as class_number,link,introduction,credit,language,date,end_time,start_time,bookmark.user_id,class.id as class_id,class.capacity as max_capacity,coalesce((class.capacity-booked),class.capacity)as capacity from class 
      join users on users.id = class.teacher_id 
      left join (select count(class_id) as booked,class_id from student_class group by class_id) as 
     class_info on class_info.class_id = class.id
      left join bookmark on bookmark.class_id = class.id
      left join yoga_type on yoga_type.id=class.yoga_type_id
     where bookmark.user_id = ? order by class.date desc`,
        [user_id]
      )
    ).rows;
  }

  async getClassByTeacher(teacher_id: number) {

    return (
      await this.knex.raw(
        `SELECT
    image,
    venue,
    class.name AS name,
    users.name AS instructor,
    class.type,
    uuid AS class_number,
    link,
    introduction,
    credit,
    language,
    date,
    end_time,
    start_time,
    class.id AS id,
    class.capacity AS max_capacity,
    COALESCE((class.capacity - booked), class.capacity) AS capacity,
    (class.date + class.end_time::time) < NOW() AS is_end,yoga_type.name as yoga_type
FROM class
LEFT join yoga_type on yoga_type_id=yoga_type.id
JOIN users ON users.id = class.teacher_id
LEFT JOIN (
    SELECT COUNT(class_id) AS booked, class_id
    FROM student_class
    GROUP BY class_id
) AS class_info ON class_info.class_id = class.id
WHERE class.teacher_id = ? order by date asc;`,
        [teacher_id]
      )
    ).rows;
  }

  async getCreditForWithdrawal(user_id: number) {


    let allCredit = (
      await this.knex.raw(
        `select icon,name,role,coalesce ((credit),0) as credit from users left join (select user_id,sum(credit) as credit from user_credit_record group by user_id) as credit_info on users.id=credit_info.user_id where users.id=?`,
        [user_id]
      )
    ).rows;

    let unHoldCredit = (
      await this.knex.raw(
        `select coalesce (sum(credit),0) as credit from user_credit_record  full join (select id,date from class where teacher_id=2) as class_info on class_info.id=user_credit_record.class_id where user_credit_record.user_id =? 
and type='earn' and date<=CURRENT_DATE`,
        [user_id]
      )
    ).rows;


    let heldCredit = (
      await this.knex.raw(
        `select coalesce (sum(credit),0) as credit from user_credit_record full join (select id,date from class where teacher_id=2) as class_info on class_info.id=user_credit_record.class_id where user_credit_record.user_id =? and type='earn' and date>CURRENT_DATE`,
        [user_id]
      )
    ).rows;

    return { allCredit: allCredit[0].credit, unHoldCredit: unHoldCredit[0].credit, heldCredit: heldCredit[0].credit }

  }

  async withdrawalCredit(user_id: number, credit: number, full_name: string, bank_id: number, bank_number: number) {

    await this.knex("user_credit_record").insert({ user_id, credit: -credit, full_name, bank_id, bank_number, transaction_id: "wl14343", type: "withdrawal" })
  }

  async updateProfilePic(user_id: number, icon: string) {

    await this.knex("users").update({ icon }).where("id", user_id)
  }

  async editUser(user_id: number, name: string, phone: string) {

    await this.knex("users").update({ name, phone }).where("id", user_id)
  }

  async getOldPassword(user_id: number) {
    return (await this.knex("users").select("password").where("id", user_id))[0].password
  }

  async changePassword(user_id: number, password: string) {

    await this.knex("users").update({ password }).where("id", user_id)
  }
}
