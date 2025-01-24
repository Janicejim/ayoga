import { Knex } from "knex";

export class TransactionInfoService {
  constructor(private knex: Knex) { }

  async getTransactionInfo(user_id: number) {
    return await this.knex
      .select(
        "user_credit_record.type",
        "user_credit_record.created_at as date",
        "user_credit_record.credit",
        "class.name as class",
        "packages.name as package"
      )
      .from("user_credit_record")
      .leftJoin("packages", "packages.id", "user_credit_record.package_id")
      .leftJoin("class", "class.id", "user_credit_record.class_id")
      .where("user_id", user_id)
      .orderBy("user_credit_record.created_at", "desc");
  }
}
