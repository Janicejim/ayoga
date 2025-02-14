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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
var xlsx_1 = __importDefault(require("xlsx"));
var hash_1 = require("../utils/hash");
var path_1 = __importDefault(require("path"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var txn, tables, _i, tables_1, table, dataWorkbook, userData, yogaTypeData, classData, studentClassData, packages, user_credit_record, targetAreaData, poseData, bookmarkData, bank, teacherInfoData, studentCommentData, _a, userData_1, user, _b, _c, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, knex.transaction()];
                case 1:
                    txn = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 24, , 26]);
                    tables = [
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
                    _i = 0, tables_1 = tables;
                    _d.label = 3;
                case 3:
                    if (!(_i < tables_1.length)) return [3 /*break*/, 6];
                    table = tables_1[_i];
                    return [4 /*yield*/, txn.raw("truncate table ".concat(table, " restart identity cascade"))];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    dataWorkbook = xlsx_1.default.readFile(path_1.default.resolve("init_data.xlsx"));
                    userData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["users"]);
                    yogaTypeData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["yoga_type"]);
                    classData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["class"]);
                    studentClassData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["student_class"]);
                    packages = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["packages"]);
                    user_credit_record = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["user_credit_record"]);
                    targetAreaData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["target_area"]);
                    poseData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["pose"]);
                    bookmarkData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["bookmark"]);
                    bank = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["bank"]);
                    teacherInfoData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["teacher_info"]);
                    studentCommentData = xlsx_1.default.utils.sheet_to_json(dataWorkbook.Sheets["student_comment"]);
                    _a = 0, userData_1 = userData;
                    _d.label = 7;
                case 7:
                    if (!(_a < userData_1.length)) return [3 /*break*/, 10];
                    user = userData_1[_a];
                    _b = user;
                    _c = "password";
                    return [4 /*yield*/, (0, hash_1.hashPassword)(user.password)];
                case 8:
                    _b[_c] = _d.sent();
                    _d.label = 9;
                case 9:
                    _a++;
                    return [3 /*break*/, 7];
                case 10: return [4 /*yield*/, txn("users").insert(userData)];
                case 11:
                    _d.sent();
                    // Inserts yoga_type
                    return [4 /*yield*/, txn("yoga_type").insert(yogaTypeData)];
                case 12:
                    // Inserts yoga_type
                    _d.sent();
                    // Inserts class
                    return [4 /*yield*/, txn("class").insert(classData)];
                case 13:
                    // Inserts class
                    _d.sent();
                    // Inserts student_class
                    return [4 /*yield*/, txn("student_class").insert(studentClassData)];
                case 14:
                    // Inserts student_class
                    _d.sent();
                    // Inserts class_notification
                    // Inserts packages
                    return [4 /*yield*/, txn("packages").insert(packages)];
                case 15:
                    // Inserts class_notification
                    // Inserts packages
                    _d.sent();
                    // Inserts bank
                    return [4 /*yield*/, txn("bank").insert(bank)];
                case 16:
                    // Inserts bank
                    _d.sent();
                    // Inserts user_credit_record
                    return [4 /*yield*/, txn("user_credit_record").insert(user_credit_record)];
                case 17:
                    // Inserts user_credit_record
                    _d.sent();
                    // Inserts target_area
                    return [4 /*yield*/, txn("target_area").insert(targetAreaData)];
                case 18:
                    // Inserts target_area
                    _d.sent();
                    // Inserts pose
                    return [4 /*yield*/, txn("pose").insert(poseData)];
                case 19:
                    // Inserts pose
                    _d.sent();
                    // Inserts bookmark
                    return [4 /*yield*/, txn("bookmark").insert(bookmarkData)];
                case 20:
                    // Inserts bookmark
                    _d.sent();
                    // Inserts teacher_info
                    return [4 /*yield*/, txn("teacher_info").insert(teacherInfoData)];
                case 21:
                    // Inserts teacher_info
                    _d.sent();
                    // Inserts student_comment
                    return [4 /*yield*/, txn("student_comment").insert(studentCommentData)];
                case 22:
                    // Inserts student_comment
                    _d.sent();
                    return [4 /*yield*/, txn.commit()];
                case 23:
                    _d.sent();
                    return [3 /*break*/, 26];
                case 24:
                    e_1 = _d.sent();
                    console.log(e_1);
                    return [4 /*yield*/, txn.rollback()];
                case 25:
                    _d.sent();
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
//# sourceMappingURL=create_data.js.map