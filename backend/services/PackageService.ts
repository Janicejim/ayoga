import { Knex } from "knex";

export class PackageService {
  constructor(private knex: Knex) { }

  async getPackages() {
    return await this.knex
      .select("*")
      .from("packages")
    // .where("status", "active");
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
}
