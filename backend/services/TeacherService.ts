import { Knex } from "knex";

export class TeacherService {
  constructor(private knex: Knex) { }

  async applyTeacherRole(
    user_id: number,
    sex: string,
    introduction: string,
    newest_qualification: string,
    photo: string,
    id_photo: string,
    cert: string
  ) {
    await this.knex("teacher_info").insert({
      id: user_id,
      sex,
      introduction,
      newest_qualification,
      photo,
      id_photo,
      cert,
      status: "pending",
    });
    return;
  }

  public async createClass(
    name: string,
    venue: string,
    capacity: number,
    language: string,
    credit: number,
    date: string,
    start_time: string,
    end_time: string,
    teacher_id: number,
    image: string,
    venue_point_lat: string,
    venue_point_lng: string,
    type: string,
    yoga_type_id: number,
    introduction: string
  ) {
    let classResult;
    if (type == "offline") {
      classResult = await this.knex("class")
        .returning("id")
        .insert({
          name,
          venue,
          capacity,
          language,
          credit,
          teacher_id,
          image,
          status: "active",
          venue_point: this.knex.raw(`point(?,?)`, [
            venue_point_lat,
            venue_point_lng,
          ]),
          type,
          yoga_type_id,
          introduction,
          date,
          start_time,
          end_time,
        });
    } else {
      classResult = await this.knex("class").returning("id").insert({
        name,
        capacity,
        language,
        credit,
        teacher_id,
        image,
        status: "active",
        type,
        yoga_type_id,
        introduction,
        date,
        start_time,
        end_time,
      });
    }
    //@ts-ignore
    const class_id = classResult[0]["id"];

    let uuid = `${date}${start_time}-${class_id}`.split("-").join("");

    await this.knex("class").update({ uuid }).where("id", class_id);

    return;
  }

  async getStudentList(class_id: number) {
    let activeStudent = (
      await this.knex.raw(
        `select user_id as id,status,email,name,phone from student_class join users on users.id=user_id where class_id=? and status='active' order by name asc`,
        [class_id]
      )
    ).rows;
    let inactiveStudent = (
      await this.knex.raw(
        `select user_id as id,status,email,name,phone,icon from student_class join users on users.id=user_id where class_id=? and status='inactive' order by name asc`,
        [class_id]
      )
    ).rows;

    return { activeStudent, inactiveStudent }

  }

  public async checkIsCreatorOfClass(classId: number, userId: number) {
    return await this.knex("class")
      .select("id")
      .where(`id`, classId)
      .where(`teacher_id`, userId);
  }



  async getTeacherSchedule(teacher_id: number) {
    return (
      await this.knex.raw(
        `select uuid,name,id,date,start_time,end_time from class where teacher_id =? and status='active'`,
        [teacher_id]
      )
    ).rows;
  }



  async checkWhetherTheClassHaveStudentJoin(class_id: number) {
    return await this.knex("student_class")
      .select("id")
      .where("class_id", class_id);
  }

  async editClassInfo(
    class_id: number,
    name: string,
    venue: string,
    capacity: number,
    language: string,
    credit: number,
    date: string,
    start_time: string,
    end_time: string,
    image: string,
    venue_point_lat: string,
    venue_point_lng: string,
    type: string,
    yoga_type_id: number,
    introduction: string
  ) {
    let uuid = `${date}${start_time}-${class_id}`.split("-").join("");

    if (type == "offline") {
      await this.knex("class")
        .update({
          uuid,
          name,
          venue,
          capacity,
          language,
          credit,
          date,
          start_time,
          end_time,
          image,
          type,
          yoga_type_id,
          introduction,
          venue_point: this.knex.raw(`point(?,?)`, [
            venue_point_lat,
            venue_point_lng,
          ]),
        })
        .where("id", class_id);
    } else {
      await this.knex("class")
        .update({
          uuid,
          name,
          capacity,
          language,
          credit,
          date,
          start_time,
          end_time,
          image,
          type,
          yoga_type_id,
          introduction,
        })
        .where("id", class_id);
    }
    return;
  }

  async getTeacherInfoAndComment(teacher_id: number) {

    let teacherInfo = (
      await this.knex.raw(
        `select users.id, name,introduction,photo,newest_qualification,cert from teacher_info left join users on users.id=teacher_info.id where status='accept' and users.id=?`,
        [teacher_id]
      )
    ).rows;
    let teacherScore = (
      await this.knex.raw(
        `select avg(star) as score from student_class join class on class.id=student_class.class_id left join student_comment on student_comment.class_id =student_class.class_id where teacher_id =?
    `,
        [teacher_id]
      )
    ).rows;


    if (teacherScore.length > 0 && teacherScore[0].score !== null) {

      teacherInfo[0]["score"] = Math.round(teacherScore[0].score * 100) / 100
    } else {
      teacherInfo[0]["score"] = "No score";
    }

    let comments = (
      await this.knex.raw(
        `select student_comment.id,users.name,icon,class.name as class_name,student_comment.updated_at,comment,star from student_class join class on class.id=student_class.class_id join users on student_class.user_id=users.id right join student_comment on student_comment.class_id =student_class.class_id where teacher_id =? order by student_comment.created_at desc`,
        [teacher_id]
      )
    ).rows;
    return { teacherInfo, comments };
  }


  async getTeacherInfo(user_id: number) {

    return (
      await this.knex.raw(
        `select introduction,newest_qualification,cert from teacher_info left join users on users.id=teacher_info.id where status='accept' and users.id=?`,
        [user_id]
      )
    ).rows;



  }




  async getTeacherRevenueData(user_id: number) {

    let yearData = (await this.knex.raw(`SELECT TO_CHAR(created_at, 'YYYY') AS year, COALESCE(SUM(credit), 0) AS credit
FROM user_credit_record
WHERE (type = 'earn' OR (type = 'refund' AND credit < 0)) AND user_id = ?
GROUP BY TO_CHAR(created_at, 'YYYY') order by year asc`, [user_id])).rows


    let monthData = (await this.knex.raw(`SELECT EXTRACT(month FROM created_at) AS month, COALESCE(SUM(credit), 0) AS credit
FROM user_credit_record
WHERE (type = 'earn' OR (type = 'refund' AND credit < 0)) AND user_id = ?
AND EXTRACT(year FROM created_at) = EXTRACT(year FROM CURRENT_DATE)
GROUP BY EXTRACT(month FROM created_at) order by month asc`, [user_id])).rows

    return { yearData, monthData }


  }

  async editTeacherInfo(user_id: number, introduction: string, newest_qualification: string) {
    await this.knex("teacher_info").update({ introduction, newest_qualification }).where("id", user_id)

  }

}
