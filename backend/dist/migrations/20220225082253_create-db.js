"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.hasTable("users")];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, knex.schema.createTable("users", function (table) {
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
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, knex.schema.hasTable("yoga_type")];
                case 4:
                    if (!!(_a.sent())) return [3 /*break*/, 6];
                    return [4 /*yield*/, knex.schema.createTable("yoga_type", function (table) {
                            table.increments();
                            table.string("name").notNullable();
                            table.enum("status", ["active", "inactive"]).defaultTo("active");
                            table.timestamps(false, true);
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, knex.schema.hasTable("class")];
                case 7:
                    if (!!(_a.sent())) return [3 /*break*/, 9];
                    return [4 /*yield*/, knex.schema.createTable("class", function (table) {
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
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, knex.schema.hasTable("student_class")];
                case 10:
                    if (!!(_a.sent())) return [3 /*break*/, 12];
                    return [4 /*yield*/, knex.schema.createTable("student_class", function (table) {
                            table.increments();
                            table.integer("class_id").references("class.id");
                            table.integer("user_id").references("users.id");
                            table
                                .enum("status", ["active", "inactive", "pending"])
                                .defaultTo("active");
                            table.timestamps(false, true);
                        })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [4 /*yield*/, knex.schema.hasTable("packages")];
                case 13:
                    if (!!(_a.sent())) return [3 /*break*/, 15];
                    return [4 /*yield*/, knex.schema.createTable("packages", function (table) {
                            table.increments();
                            table.string("name").notNullable();
                            table.integer("credit");
                            table.integer("price");
                            table.timestamps(false, true);
                        })];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: return [4 /*yield*/, knex.schema.hasTable("bank")];
                case 16:
                    if (!!(_a.sent())) return [3 /*break*/, 18];
                    return [4 /*yield*/, knex.schema.createTable("bank", function (table) {
                            table.increments();
                            table.string("chi_name").notNullable();
                            table.string("eng_name").notNullable();
                            table.string("code").notNullable();
                            table
                                .enum("status", ["active", "inactive"])
                                .defaultTo("active");
                            table.timestamps(false, true);
                        })];
                case 17:
                    _a.sent();
                    _a.label = 18;
                case 18: return [4 /*yield*/, knex.schema.hasTable("user_credit_record")];
                case 19:
                    if (!!(_a.sent())) return [3 /*break*/, 21];
                    return [4 /*yield*/, knex.schema.createTable("user_credit_record", function (table) {
                            table.integer("package_id").references("packages.id");
                            table
                                .enum("type", ["top-up", "use", "earn", "withdrawal", "refund", "student-refund"]);
                            table.increments();
                            table.integer("user_id").references("users.id");
                            table.integer("class_id").references("class.id");
                            table.integer("credit");
                            table.string("full_name");
                            table.integer("bank_id").references("bank.id");
                            table.string("bank_number");
                            table.string("transaction_id");
                            table.timestamps(false, true);
                        })];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21: return [4 /*yield*/, knex.schema.hasTable("target_area")];
                case 22:
                    if (!!(_a.sent())) return [3 /*break*/, 24];
                    return [4 /*yield*/, knex.schema.createTable("target_area", function (table) {
                            table.increments();
                            table.string("name");
                            table.timestamps(false, true);
                        })];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24: return [4 /*yield*/, knex.schema.hasTable("pose")];
                case 25:
                    if (!!(_a.sent())) return [3 /*break*/, 27];
                    return [4 /*yield*/, knex.schema.createTable("pose", function (table) {
                            table.increments();
                            table.string("name");
                            table.string("image");
                            table.integer("target_area_id").references("target_area.id");
                            table.enum("level", ["beginner", "intermediate"]);
                            table.timestamps(false, true);
                        })];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27: return [4 /*yield*/, knex.schema.hasTable("bookmark")];
                case 28:
                    if (!!(_a.sent())) return [3 /*break*/, 30];
                    return [4 /*yield*/, knex.schema.createTable("bookmark", function (table) {
                            table.increments();
                            table.enum("type", ["class", "teacher"]);
                            table.integer("user_id").references("users.id");
                            table.integer("teacher_id").references("users.id");
                            table.integer("class_id").references("class.id");
                            table.timestamps(false, true);
                        })];
                case 29:
                    _a.sent();
                    _a.label = 30;
                case 30: return [4 /*yield*/, knex.schema.hasTable("pose_history")];
                case 31:
                    if (!!(_a.sent())) return [3 /*break*/, 33];
                    return [4 /*yield*/, knex.schema.createTable("pose_history", function (table) {
                            table.increments();
                            table.integer("user_id").references("users.id");
                            table.integer("pose_id").references("pose.id");
                            table.integer("accuracy");
                            table.timestamps(false, true);
                        })];
                case 32:
                    _a.sent();
                    _a.label = 33;
                case 33: return [4 /*yield*/, knex.schema.hasTable("teacher_info")];
                case 34:
                    if (!!(_a.sent())) return [3 /*break*/, 36];
                    return [4 /*yield*/, knex.schema.createTable("teacher_info", function (table) {
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
                        })];
                case 35:
                    _a.sent();
                    _a.label = 36;
                case 36: return [4 /*yield*/, knex.schema.hasTable("student_comment")];
                case 37:
                    if (!!(_a.sent())) return [3 /*break*/, 39];
                    return [4 /*yield*/, knex.schema.createTable("student_comment", function (table) {
                            table.increments();
                            table.integer("user_id").references("users.id");
                            table.integer("class_id").references("class.id");
                            table.integer("star");
                            table.text("comment");
                            table.timestamps(false, true);
                        })];
                case 38:
                    _a.sent();
                    _a.label = 39;
                case 39: return [2 /*return*/];
            }
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.dropTableIfExists("student_comment")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("teacher_info")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("pose_history")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("bookmark")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("pose")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("target_area")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("user_credit_record")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("bank")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("packages")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("student_class")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("class")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("yoga_type")];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("users")];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.down = down;
//# sourceMappingURL=20220225082253_create-db.js.map