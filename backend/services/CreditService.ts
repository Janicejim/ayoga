import { Knex } from "knex";

export class CreditService {
  constructor(private knex: Knex) { }

  async getPackages() {
    return await this.knex
      .select("*")
      .from("packages")
  }

  async addCreditRecord(user_id: number, package_id: number, price: number) {
    let record = await this.knex("user_credit_record").insert({
      user_id,
      package_id,
      credit: price,
      type: "top-up",
    }).returning("id");

    let timestamp = Date.now();
    let transaction_id = `tp${timestamp}-${record[0].id}`.split("-").join("");

    await this.knex("user_credit_record").update({ transaction_id }).where("id", record[0].id);

  }

  async getPackageInfoById(package_id: number) {
    return await this.knex("packages")
      .select("credit", "name")
      .where("id", package_id);
  }


  async getTransactionInfo(user_id: number) {
    return await this.knex
      .select(
        "user_credit_record.type",
        "user_credit_record.created_at as date",
        "user_credit_record.credit",
        "class.name as class",
        "packages.name as package",
        "transaction_id",
        "refund_related_id"
      )
      .from("user_credit_record")
      .leftJoin("packages", "packages.id", "user_credit_record.package_id")
      .leftJoin("class", "class.id", "user_credit_record.class_id")
      .where("user_id", user_id)
      .orderBy("user_credit_record.created_at", "desc");
  }



  async getBanks() {
    return await this.knex
      .select(
        "*"
      )
      .from("bank").where("status", "active")
      .orderBy("code", "asc");
  }
}
