import { Knex } from "knex";

export class PosesService {
  constructor(private knex: Knex) { }

  async getPosesItems() {
    return await this.knex
      .select(
        "pose.id",
        "pose.name as name",
        "image",
        "target_area.name as target_name",
        "detect_id"
      )
      .from("pose")
      .innerJoin("target_area", "pose.target_area_id", "target_area.id");
  }

  async createPoseRecord(user_id: number, accuracy: number, pose_id: number) {
    await this.knex("pose_history").insert({ user_id, accuracy, pose_id });
  }

  async getAllPoseRecord(user_id: number) {
    return (
      await this.knex.raw(
        `    select image,pose_id,accuracy,pose_history.created_at,pose_history.id,name from pose_history join pose on pose.id=pose_history.pose_id where user_id=? order by pose_history.created_at desc`,
        [user_id]
      )
    ).rows;
  }

  async getPoseRecordSummary(user_id: number) {
    return (
      await this.knex.raw(
        `      select name,image,accuracy,pose_id from pose right join (select sum(accuracy) as accuracy, pose_id from pose_history where user_id=? group by pose_id) as records on records.pose_id=pose.id order by name asc`,
        [user_id]
      )
    ).rows;
  }

  async deletePoseRecord(id: number) {
    await this.knex("pose_history").where("id", id).del();
  }
}
