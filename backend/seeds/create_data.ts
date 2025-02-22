import { Knex } from "knex";
import xlsx from "xlsx";
import { hashPassword } from "../utils/hash";
import path from "path";
import { UserInExcel } from "../utils/models";



export async function seed(knex: Knex): Promise<void> {
  let txn = await knex.transaction();

  try {
    // truncate ALL existing entries
    let tables = [
      "student_comment",
      "teacher_info",
      "bookmark",
      "pose",
      "target_area",
      "user_credit_record",
      "bank",
      "packages",
      "student_class",
      "class",
      "yoga_type",
      "users",
    ];
    for (let table of tables) {
      await txn.raw(`truncate table ${table} restart identity cascade`);
    }

    //get all the excel data:
    let dataWorkbook = xlsx.readFile(path.resolve("init_data.xlsx"));
    let userData: UserInExcel[] = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["users"]
    );
    let yogaTypeData = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["yoga_type"]
    );
    let classData = xlsx.utils.sheet_to_json(dataWorkbook.Sheets["class"]);
    let studentClassData = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["student_class"]
    );
    let packages = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["packages"]
    );
    let user_credit_record = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["user_credit_record"]
    );
    let targetAreaData = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["target_area"]
    );
    let poseData = xlsx.utils.sheet_to_json(dataWorkbook.Sheets["pose"]);
    let bookmarkData = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["bookmark"]
    );

    let bank = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["bank"]
    );
    let teacherInfoData = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["teacher_info"]
    );

    let studentCommentData = xlsx.utils.sheet_to_json(
      dataWorkbook.Sheets["student_comment"]
    );

    // Inserts data

    for (let user of userData) {
      user["password"] = await hashPassword(user.password);
    }
    await txn("users").insert(userData);
    await txn("yoga_type").insert(yogaTypeData);
    await txn("class").insert(classData);
    await txn("student_class").insert(studentClassData);
    await txn("packages").insert(packages);
    await txn("bank").insert(bank);
    await txn("user_credit_record").insert(user_credit_record);
    await txn("target_area").insert(targetAreaData);
    await txn("pose").insert(poseData);
    await txn("bookmark").insert(bookmarkData);
    await txn("teacher_info").insert(teacherInfoData);
    await txn("student_comment").insert(studentCommentData);
    await txn.commit();
  } catch (e) {
    console.log(e);
    await txn.rollback();
  }
}
