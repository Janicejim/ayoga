import { Knex } from "knex";

export class CatalogService {
  constructor(private knex: Knex) { }

  public async getClassMySearch(
    date: string,
    start_time: string,
    instructor: string,
    venue: string,
    title: string,
    type: string,
    yogaType: string,
    credit: number,
    language: string,
    userId: number
  ) {
    let query = this.knex
      .select(
        "class.id",
        "image",
        "venue",
        "class.name",
        "users.name as instructor",
        "class.type",
        "uuid as class_number",
        "credit",
        "language",
        "date",
        "end_time",
        "start_time",
        "class.capacity as capacity",
        this.knex.raw(
          "coalesce((class.capacity - booked), class.capacity) as available"
        ),
        "yoga.name as yoga_type"
      )
      .from("class")
      .join("users", "users.id", "class.teacher_id")
      .leftJoin(
        this.knex
          .select(this.knex.raw("count(class_id) as booked"), "class_id")
          .from("student_class")
          .groupBy("class_id")
          .as("class_info"),
        "class_info.class_id",

        "class.id"
      )
      .join(
        this.knex.select("id", "name").from("yoga_type").as("yoga"),
        "yoga.id",

        "class.yoga_type_id"
      )
      .where("class.date", ">", this.knex.raw("CURRENT_DATE"))
      .andWhere(
        this.knex.raw(
          "coalesce((class.capacity - booked), class.capacity) != 0"
        )
      )
      .andWhere("teacher_id", "!=", userId);

    if (date && date !== "undefined") {
      query.where(`class.date`, date);
    }
    if (start_time && start_time !== "undefined") {
      query.where(`class.start_time`, start_time);
    }
    if (instructor && instructor !== "undefined") {
      query.whereILike("users.name", `%${instructor}%`);
    }
    if (venue && venue !== "undefined") {
      query.whereILike("class.venue", `%${venue}%`);
    }
    if (title && title !== "undefined") {
      query.whereILike("class.name", `%${title}%`);
    }
    if (type && type !== "undefined" && type !== "all") {
      query.where("type", type);
    }
    if (yogaType && yogaType !== "undefined" && yogaType !== "all") {
      query.where("yoga.name", yogaType);
    }
    if (credit && credit !== 0) {
      query.where("credit", "<", credit);
    }
    if (language && language !== "undefined" && language !== "all") {
      query.where("language", language);
    }
    if (userId) {
      query.whereNotIn("class.id", function () {
        this.select("class_id as id")
          .from("student_class")
          .where("user_id", userId);
      });
    }

    return await query.orderBy("class.date", "desc");
  }

  async getYogaType() {
    return await this.knex("yoga_type")
      .select("id", "name")
      .where("status", "active");
  }
}
