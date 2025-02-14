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
exports.UserInfoService = void 0;
var UserInfoService = /** @class */ (function () {
    function UserInfoService(knex) {
        this.knex = knex;
    }
    UserInfoService.prototype.getUserBoxInfo = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select email,phone,icon,name,role,coalesce ((credit),0) as credit from users left join (select user_id,sum(credit) as credit from user_credit_record group by user_id) as credit_info on users.id=credit_info.user_id where users.id=?", [user_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    UserInfoService.prototype.getBooking = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select uuid as class_number, yoga_type.name as yoga_type,class.id as id,image,venue,type,class.name,users.name as instructor,uuid,link,introduction,credit,language,capacity,date,end_time,start_time,\n    (class.date + class.end_time::time) < NOW() AS is_end from class join users on class.teacher_id=users.id join student_class on class.id=student_class.class_id \n     left join yoga_type on yoga_type.id=class.yoga_type_id\n    where student_class.user_id=? and student_class.status='active' order by class.date asc", [user_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    UserInfoService.prototype.getBookmark = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw(" select yoga_type.name as yoga_type,image,venue,class.name as name,users.name as instructor,class.type,uuid as class_number,link,introduction,credit,language,date,end_time,start_time,bookmark.user_id,class.id as class_id,class.capacity as max_capacity,coalesce((class.capacity-booked),class.capacity)as capacity from class \n      join users on users.id = class.teacher_id \n      left join (select count(class_id) as booked,class_id from student_class group by class_id) as \n     class_info on class_info.class_id = class.id\n      left join bookmark on bookmark.class_id = class.id\n      left join yoga_type on yoga_type.id=class.yoga_type_id\n     where bookmark.user_id = ? order by class.date desc", [user_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    UserInfoService.prototype.getClassByTeacher = function (teacher_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("SELECT\n    image,\n    venue,\n    class.name AS name,\n    users.name AS instructor,\n    class.type,\n    uuid AS class_number,\n    link,\n    introduction,\n    credit,\n    language,\n    date,\n    end_time,\n    start_time,\n    class.id AS id,\n    class.capacity AS max_capacity,\n    COALESCE((class.capacity - booked), class.capacity) AS capacity,\n    (class.date + class.end_time::time) < NOW() AS is_end,yoga_type.name as yoga_type\nFROM class\nLEFT join yoga_type on yoga_type_id=yoga_type.id\nJOIN users ON users.id = class.teacher_id\nLEFT JOIN (\n    SELECT COUNT(class_id) AS booked, class_id\n    FROM student_class\n    GROUP BY class_id\n) AS class_info ON class_info.class_id = class.id\nWHERE class.teacher_id = ? order by date asc;", [teacher_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    UserInfoService.prototype.getCreditForWithdrawal = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var allCredit, unHoldCredit, heldCredit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select icon,name,role,coalesce ((credit),0) as credit from users left join (select user_id,sum(credit) as credit from user_credit_record group by user_id) as credit_info on users.id=credit_info.user_id where users.id=?", [user_id])];
                    case 1:
                        allCredit = (_a.sent()).rows;
                        return [4 /*yield*/, this.knex.raw("select coalesce (sum(credit),0) as credit from user_credit_record  full join (select id,date from class where teacher_id=2) as class_info on class_info.id=user_credit_record.class_id where user_credit_record.user_id =? \nand type='earn' and date<=CURRENT_DATE", [user_id])];
                    case 2:
                        unHoldCredit = (_a.sent()).rows;
                        return [4 /*yield*/, this.knex.raw("select coalesce (sum(credit),0) as credit from user_credit_record full join (select id,date from class where teacher_id=2) as class_info on class_info.id=user_credit_record.class_id where user_credit_record.user_id =? and type='earn' and date>CURRENT_DATE", [user_id])];
                    case 3:
                        heldCredit = (_a.sent()).rows;
                        return [2 /*return*/, { allCredit: allCredit[0].credit, unHoldCredit: unHoldCredit[0].credit, heldCredit: heldCredit[0].credit }];
                }
            });
        });
    };
    UserInfoService.prototype.withdrawalCredit = function (user_id, credit, full_name, bank_id, bank_number) {
        return __awaiter(this, void 0, void 0, function () {
            var txn, record, timestamp, transaction_id, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        txn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, txn("user_credit_record").insert({ user_id: user_id, credit: -credit, full_name: full_name, bank_id: bank_id, bank_number: bank_number, type: "withdrawal" }).returning("id")];
                    case 3:
                        record = _a.sent();
                        timestamp = Date.now();
                        transaction_id = "wl".concat(timestamp, "-").concat(record[0].id).split("-").join("");
                        return [4 /*yield*/, txn("user_credit_record").update({ transaction_id: transaction_id }).where("id", record[0].id)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, txn.commit()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [4 /*yield*/, txn.rollback()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserInfoService.prototype.updateProfilePic = function (user_id, icon) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users").update({ icon: icon }).where("id", user_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserInfoService.prototype.editUser = function (user_id, name, phone) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users").update({ name: name, phone: phone }).where("id", user_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserInfoService.prototype.getOldPassword = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users").select("password").where("id", user_id)];
                    case 1: return [2 /*return*/, (_a.sent())[0].password];
                }
            });
        });
    };
    UserInfoService.prototype.changePassword = function (user_id, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users").update({ password: password }).where("id", user_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserInfoService;
}());
exports.UserInfoService = UserInfoService;
//# sourceMappingURL=UserInfoService.js.map