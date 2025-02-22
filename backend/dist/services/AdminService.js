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
exports.AdminService = void 0;
var AdminService = /** @class */ (function () {
    function AdminService(knex) {
        this.knex = knex;
    }
    AdminService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users")
                            .select("id", "name", "icon", "email", "role", "phone")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminService.prototype.getUserByKeyword = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select id,name,icon,email,role,phone from users where email ilike ? or name ilike ?", ["%".concat(keyword, "%"), "%".concat(keyword, "%")])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    AdminService.prototype.getUserEmailById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users").select("email").where("id", id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminService.prototype.getTeacherRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select teacher_info.id, name,photo,introduction,newest_qualification,cert, id_photo,teacher_info.updated_at as request_date from teacher_info join users on users.id=teacher_info.id  where teacher_info.status='pending'  order by teacher_info.updated_at desc")];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    AdminService.prototype.acceptTeacherRequests = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("teacher_info")
                            .update({ status: "accept" })
                            .where("id", id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.rejectTeacherRequests = function (id, remark) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("teacher_info")
                            .update({ status: "reject", remark: remark })
                            .where("id", id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.updateUserRole = function (user_id, role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users").update({ role: role }).where("id", user_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.getTransactions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select type,id,user_id,class_id,credit,transaction_id,refund_related_id ,updated_at from user_credit_record where type !='top-up' and type !='withdrawal' order by created_at desc")];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    AdminService.prototype.getTransactionByKeyword = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("  select type,id,user_id,class_id,credit,transaction_id,refund_related_id ,updated_at from user_credit_record where type !='top-up' and type !='withdrawal'  and transaction_id=? or refund_related_id =? order by created_at desc", [keyword, keyword])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    AdminService.prototype.checkCreditRecords = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var useCreditRecord, earnCreditRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select id,transaction_id,credit,type,class_id,user_id from user_credit_record where class_id=? and user_id=? and type='use'", [classId, userId])];
                    case 1:
                        useCreditRecord = (_a.sent()).rows;
                        return [4 /*yield*/, this.knex.raw("select id,transaction_id,credit,type,class_id,user_id from user_credit_record where class_id=? and type='earn'", [classId])];
                    case 2:
                        earnCreditRecord = (_a.sent()).rows;
                        return [2 /*return*/, { useCreditRecord: useCreditRecord[0], earnCreditRecord: earnCreditRecord[0] }];
                }
            });
        });
    };
    AdminService.prototype.refundCaseHandle = function (records, classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var txn, timestamp, _i, records_1, record, refundRecord, transaction_id, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        txn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 10, , 12]);
                        timestamp = Date.now();
                        _i = 0, records_1 = records;
                        _a.label = 3;
                    case 3:
                        if (!(_i < records_1.length)) return [3 /*break*/, 7];
                        record = records_1[_i];
                        return [4 /*yield*/, txn("user_credit_record").insert({
                                type: record.type == "earn" ? "student-refund" : "refund",
                                credit: -record.credit,
                                class_id: record.class_id,
                                user_id: record.user_id,
                                refund_related_id: record.transaction_id
                            }).returning("id")];
                    case 4:
                        refundRecord = _a.sent();
                        transaction_id = "rf".concat(timestamp, "-").concat(refundRecord[0].id).split("-").join("");
                        return [4 /*yield*/, txn("user_credit_record").update({ transaction_id: transaction_id }).where("id", refundRecord[0].id)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7: 
                    // update student_class record to inactive
                    return [4 /*yield*/, txn("student_class").update({ status: "inactive" })
                            .where("class_id", classId)
                            .andWhere("user_id", userId)];
                    case 8:
                        // update student_class record to inactive
                        _a.sent();
                        return [4 /*yield*/, txn.commit()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [4 /*yield*/, txn.rollback()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=AdminService.js.map