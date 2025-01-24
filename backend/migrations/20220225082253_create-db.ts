import { Knex } from "knex";

export async function up(knex: Knex) {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table.increments();
      table.string("email").notNullable().unique();
      table.string("name").notNullable();
      table.string("password").notNullable();
      table.string("icon");
      table.string("phone").notNullable().unique();
      table
        .enum("role", ["user", "teacher", "admin"])
        .defaultTo("user");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("yoga_type"))) {
    await knex.schema.createTable("yoga_type", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.enum("status", ["active", "inactive"]).defaultTo("active");
      table.timestamps(false, true);
    });
  }


  if (!(await knex.schema.hasTable("class"))) {
    await knex.schema.createTable("class", (table) => {
      table.increments();
      table.string("uuid").unique();
      table.string("name").notNullable();
      table.enum("type", ["online", "offline"]);
      table.string("link");
      table.integer("yoga_type_id").references("yoga_type.id");
      table.text("introduction").notNullable;
      table.integer("teacher_id").references("users.id");
      table.string("venue");
      table.point("venue_point");
      table.integer("capacity").notNullable();
      table.integer("credit");
      table.string("image");
      table.string("language");
      table
        .enum("status", ["active", "inactive"])
        .defaultTo("active");
      table.date("date");
      table.string("start_time");
      table.string("end_time");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("student_class"))) {
    await knex.schema.createTable("student_class", (table) => {
      table.increments();
      table.integer("class_id").references("class.id");
      table.integer("user_id").references("users.id");
      table
        .enum("status", ["active", "inactive", "pending"])
        .defaultTo("active");
      table.timestamps(false, true);
    });
  }
  if (!(await knex.schema.hasTable("packages"))) {
    await knex.schema.createTable("packages", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.integer("credit");
      table.integer("price");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("bank"))) {
    await knex.schema.createTable("bank", (table) => {
      table.increments();
      table.string("chi_name").notNullable();
      table.string("eng_name").notNullable();
      table.string("code").notNullable();
      table
        .enum("status", ["active", "inactive"])
        .defaultTo("active");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("user_credit_record"))) {
    await knex.schema.createTable("user_credit_record", (table) => {
      table.integer("package_id").references("packages.id");
      table
        .enum("type", ["top-up", "use", "earn", "withdrawal", "refund", "student-refund"])
      table.increments();
      table.integer("user_id").references("users.id");
      table.integer("class_id").references("class.id");
      table.integer("credit");
      table.string("full_name");
      table.integer("bank_id").references("bank.id");
      table.string("bank_number");
      table.string("transaction_id")
      table.timestamps(false, true);
    });
  }


  if (!(await knex.schema.hasTable("target_area"))) {
    await knex.schema.createTable("target_area", (table) => {
      table.increments();
      table.string("name");
      table.timestamps(false, true);
    });
  }
  if (!(await knex.schema.hasTable("pose"))) {
    await knex.schema.createTable("pose", (table) => {
      table.increments();
      table.string("name");
      table.string("image");
      table.integer("target_area_id").references("target_area.id");
      table.enum("level", ["beginner", "intermediate"]);
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("bookmark"))) {
    await knex.schema.createTable("bookmark", (table) => {
      table.increments();
      table.enum("type", ["class", "teacher"]);
      table.integer("user_id").references("users.id");
      table.integer("teacher_id").references("users.id");
      table.integer("class_id").references("class.id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("pose_history"))) {
    await knex.schema.createTable("pose_history", (table) => {
      table.increments();
      table.integer("user_id").references("users.id");
      table.integer("pose_id").references("pose.id");
      table.integer("accuracy");
      table.timestamps(false, true);
    });
  }



  if (!(await knex.schema.hasTable("teacher_info"))) {
    await knex.schema.createTable("teacher_info", (table) => {
      table.integer("id").references("users.id");
      table.text("introduction");
      table.string("photo");
      table.enum("sex", ["F", "M"]);
      table.string("id_photo");
      table.string("newest_qualification");
      table.string("cert");
      table.text("remark");
      table.enum("status", ["accept", "reject", "pending"]);
      table.timestamps(false, true);
    });
  }



  if (!(await knex.schema.hasTable("student_comment"))) {
    await knex.schema.createTable("student_comment", (table) => {
      table.increments();
      table.integer("user_id").references("users.id");
      table.integer("class_id").references("class.id");
      table.integer("star");
      table.text("comment");
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists("student_comment");
  await knex.schema.dropTableIfExists("teacher_info");
  await knex.schema.dropTableIfExists("pose_history");
  await knex.schema.dropTableIfExists("bookmark");
  await knex.schema.dropTableIfExists("pose");
  await knex.schema.dropTableIfExists("target_area");
  await knex.schema.dropTableIfExists("user_credit_record");
  await knex.schema.dropTableIfExists("bank");
  await knex.schema.dropTableIfExists("packages");
  await knex.schema.dropTableIfExists("student_class");
  await knex.schema.dropTableIfExists("class");
  await knex.schema.dropTableIfExists("yoga_type");
  await knex.schema.dropTableIfExists("users");
}
