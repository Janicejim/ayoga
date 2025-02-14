import { Knex } from "knex";

export interface ResultClassAvailability {
  classCap: any;
  classAttendee: any;
}

export interface ResultUserAndClassCredits {
  userCreditLeft: any;
  classCreditRequired: any;
  teacher_id: number;
}

export class ClassService {
  constructor(private knex: Knex) { }

  public async getClassDetails(classId: number) {
    return (
      await this.knex.raw(
        ` select class.id as class_id,venue_point,image,venue,class.name as name,users.name as teacher_name,class.type,uuid as class_number,link,introduction,credit,language,date,end_time,start_time,class.id,class.capacity,users.id as teacher_id,coalesce((class.capacity-booked),class.capacity)as available from class 
        join users on users.id = class.teacher_id 
        left join (select count(class_id) as booked,class_id from student_class where status='active' group by class_id) as 
       class_info on class_info.class_id = class.id
       where class.id = ?`,
        [classId]
      )
    ).rows;
  }

  public async checkClassBookmarked(classId: number, userId: number) {
    return await this.knex("bookmark")
      .select("bookmark.class_id")
      .where("bookmark.class_id", classId)
      .where("bookmark.user_id", userId);
  }

  public async addClassBookmark(classId: number, userId: number) {
    await this.knex("bookmark").insert({
      user_id: userId,
      class_id: classId,
      type: "class",
    });
  }

  public async deleteClassBookmark(classId: number, userId: number) {
    await this.knex("bookmark")
      .where({
        user_id: userId,
        class_id: classId,
      })
      .del();
  }

  public async checkClassSeatReserved(classId: number, userId: number) {
    return await this.knex("student_class")
      .select("id")
      .where(`student_class.class_id`, classId)
      .andWhere(`student_class.user_id`, userId).andWhere("status", "active")
  }

  public async checkClassAvailability(classId: number) {
    const classAttendeeNumber = await this.knex("student_class").where(
      `student_class.class_id`,
      classId
    );
    const classCap = await this.knex("class")
      .select(`class.capacity`)
      .from("class")
      .where(`class.id`, classId);

    const result: ResultClassAvailability = {
      classCap: classCap[0]["capacity"],
      classAttendee: classAttendeeNumber.length,
    };
    return result;
  }

  public async checkIsCreatorOfClass(classId: number, userId: number) {
    return await this.knex("class")
      .select("id")
      .where(`id`, classId)
      .where(`teacher_id`, userId);
  }


  public async checkTheClassIsEnd(class_id: number) {
    let is_end = ((await this.knex.raw(`SELECT 
    CASE
        WHEN (class.date::timestamp + class.end_time::time) < NOW() THEN true
        ELSE false
    END AS is_end
  FROM 
    class
  WHERE 
    class.id=?`, [class_id]))).rows[0].is_end
    return is_end
  }




  public async checkIsJoinerOfClass(classId: number, userId: number) {




    let result = (await this.knex.raw(`SELECT 
    student_class.id,
    student_comment.comment,
    class.date,
    class.end_time
FROM 
    student_class
LEFT JOIN 
    student_comment ON student_comment.user_id = student_class.user_id AND student_comment.class_id = student_class.class_id
LEFT JOIN 
    class ON class.id = student_class.class_id
WHERE 
    student_class.class_id = ?
    AND student_class.user_id = ? 
    AND student_class.status = 'active'`, [classId, userId])).rows

    // console.log({ result })

    if (result.length < 1) {
      return { isJoiner: false }
    } else if (!result[0].comment) {
      return { isJoiner: true, haveComment: false }

    } else {
      return { isJoiner: true, haveComment: true, comment: result[0].comment }
    }


  }

  public async toReserveClassSeat(
    teacherId: number,
    classId: number,
    userId: number,
    classCredit: number
  ) {
    let txn = await this.knex.transaction();
    try {
      //Insert student use credit record
      let useRecord = await txn("user_credit_record").insert({
        type: "use",
        user_id: userId,
        class_id: classId,
        credit: -classCredit,
      }).returning("id");
      //insert teacher earn credit record:90%
      let earnRecord = await txn("user_credit_record").insert({
        type: "earn",
        user_id: teacherId,
        class_id: classId,
        credit: classCredit
      }).returning("id");


      let timestamp = Date.now();
      let earnTransaction_id = `en${timestamp}-${earnRecord[0].id}`.split("-").join("");
      let useTransaction_id = `ue${timestamp}-${useRecord[0].id}`.split("-").join("");

      await txn("user_credit_record").update({ transaction_id: earnTransaction_id }).where("id", earnRecord[0].id);
      await txn("user_credit_record").update({ transaction_id: useTransaction_id }).where("id", useRecord[0].id);

      // add to student_class
      await txn("student_class").insert({
        class_id: classId,
        user_id: userId,
        status: 'active'
      });

      await txn.commit();
      return { success: true }
    } catch (e) {
      console.log(e);
      await txn.rollback();
      return { success: false }
    }
  }

  public async checkCancelDayClassDayPeriod(class_id: number) {
    return (
      await this.knex.raw(
        `    select id,(date-interval '2 days')as last_cancel_period from class 
    where id=?
  and current_date<=(date-interval '2 days')`,
        [class_id]
      )
    ).rows;
  }

  public async toCancelClassSeat(
    records: any[],
    classId: number,
    userId: number,
  ) {
    let txn = await this.knex.transaction();
    try {
      //amend teacher and student records to refund
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

  public async checkUserAndClassCredits(classId: number, userId: number) {
    const creditRes = (
      await this.knex.raw(
        `select user_id,sum(credit) as credit from user_credit_record where user_id=? group by user_id`,
        [userId]
      )
    ).rows;

    const classCredit = await this.knex("class")
      .select("credit", "teacher_id")
      .from("class")
      .where(`class.id`, classId);

    const result: ResultUserAndClassCredits = {
      userCreditLeft: creditRes[0]["credit"],
      classCreditRequired: classCredit[0]["credit"],
      teacher_id: classCredit[0]["teacher_id"],
    };
    return result;
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


  public async checkClassBooked(classId: number, userId: number) {
    return await this.knex
      .select("*")
      .from("student_class")
      .where("class_id", classId)
      .andWhere("user_id", userId).andWhere("status", "active");
  }

  public async checkInstructorOtherClasses(
    teacher_id: number,
    classId?: number
  ) {
    let classQuery = ``;
    if (classId) {
      classQuery = `and class.id !=${classId}`;
    }

    return (
      await this.knex.raw(
        `   select image,venue,class.name as name,users.name as instructor,class.type,uuid as class_number,link,introduction,credit,language,date,end_time,start_time as time,
      class.capacity as max_capacity,class.id as class_id,
       coalesce((class.capacity-booked),class.capacity)as capacity from class 
          inner join users on users.id = class.teacher_id
                  left join (select count(class_id) as booked,class_id from student_class where status='active' group by class_id) as 
             class_info on class_info.class_id = class.id
          where class.teacher_id = ?
${classQuery}
          order by class.date desc`,
        [teacher_id]
      )
    ).rows;
  }

  public async getStudentCommentByClassId(classId: number) {
    return (
      await this.knex.raw(
        ` select star,comment,student_comment.created_at,name,icon from student_comment left join users on users.id=student_comment.user_id where student_comment.class_id=? order by student_comment.created_at desc `,
        [classId]
      )
    ).rows;
  }

  public async studentGiveCommentByClassId(class_id: number, comment: string, star: number, user_id: number) {

    await this.knex("student_comment").insert({ class_id, comment, star, user_id })

  }

  public async studentEditCommentByCommentId(id: number, comment: string, star: number) {

    await this.knex("student_comment").update({ comment, star }).where("id", id)

  }
}
