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
exports.ClassService = void 0;
var ClassService = /** @class */ (function () {
    function ClassService(knex) {
        this.knex = knex;
    }
    ClassService.prototype.getClassDetails = function (classId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw(" select class.id as class_id,venue_point,image,venue,class.name as name,users.name as teacher_name,class.type,uuid as class_number,link,introduction,credit,language,date,end_time,start_time,class.id,class.capacity,users.id as teacher_id,coalesce((class.capacity-booked),class.capacity)as available from class \n        join users on users.id = class.teacher_id \n        left join (select count(class_id) as booked,class_id from student_class where status='active' group by class_id) as \n       class_info on class_info.class_id = class.id\n       where class.id = ?", [classId])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    ClassService.prototype.checkClassBookmarked = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("bookmark")
                            .select("bookmark.class_id")
                            .where("bookmark.class_id", classId)
                            .where("bookmark.user_id", userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClassService.prototype.addClassBookmark = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("bookmark").insert({
                            user_id: userId,
                            class_id: classId,
                            type: "class",
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassService.prototype.deleteClassBookmark = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("bookmark")
                            .where({
                            user_id: userId,
                            class_id: classId,
                        })
                            .del()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassService.prototype.checkClassSeatReserved = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("student_class")
                            .select("id")
                            .where("student_class.class_id", classId)
                            .andWhere("student_class.user_id", userId).andWhere("status", "active")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClassService.prototype.checkClassAvailability = function (classId) {
        return __awaiter(this, void 0, void 0, function () {
            var classAttendeeNumber, classCap, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("student_class").where("student_class.class_id", classId)];
                    case 1:
                        classAttendeeNumber = _a.sent();
                        return [4 /*yield*/, this.knex("class")
                                .select("class.capacity")
                                .from("class")
                                .where("class.id", classId)];
                    case 2:
                        classCap = _a.sent();
                        result = {
                            classCap: classCap[0]["capacity"],
                            classAttendee: classAttendeeNumber.length,
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ClassService.prototype.checkIsCreatorOfClass = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("class")
                            .select("id")
                            .where("id", classId)
                            .where("teacher_id", userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClassService.prototype.checkTheClassIsEnd = function (class_id) {
        return __awaiter(this, void 0, void 0, function () {
            var is_end;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("SELECT \n    CASE\n        WHEN (class.date::timestamp + class.end_time::time) < NOW() THEN true\n        ELSE false\n    END AS is_end\n  FROM \n    class\n  WHERE \n    class.id=?", [class_id])];
                    case 1:
                        is_end = ((_a.sent())).rows[0].is_end;
                        return [2 /*return*/, is_end];
                }
            });
        });
    };
    ClassService.prototype.checkIsJoinerOfClass = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("SELECT \n    student_class.id,\n    student_comment.comment,\n    class.date,\n    class.end_time\nFROM \n    student_class\nLEFT JOIN \n    student_comment ON student_comment.user_id = student_class.user_id AND student_comment.class_id = student_class.class_id\nLEFT JOIN \n    class ON class.id = student_class.class_id\nWHERE \n    student_class.class_id = ?\n    AND student_class.user_id = ? \n    AND student_class.status = 'active'", [classId, userId])];
                    case 1:
                        result = (_a.sent()).rows;
                        // console.log({ result })
                        if (result.length < 1) {
                            return [2 /*return*/, { isJoiner: false }];
                        }
                        else if (!result[0].comment) {
                            return [2 /*return*/, { isJoiner: true, haveComment: false }];
                        }
                        else {
                            return [2 /*return*/, { isJoiner: true, haveComment: true, comment: result[0].comment }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassService.prototype.toReserveClassSeat = function (teacherId, classId, userId, classCredit) {
        return __awaiter(this, void 0, void 0, function () {
            var txn, useRecord, earnRecord, timestamp, earnTransaction_id, useTransaction_id, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        txn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 9, , 11]);
                        return [4 /*yield*/, txn("user_credit_record").insert({
                                type: "use",
                                user_id: userId,
                                class_id: classId,
                                credit: -classCredit,
                            }).returning("id")];
                    case 3:
                        useRecord = _a.sent();
                        return [4 /*yield*/, txn("user_credit_record").insert({
                                type: "earn",
                                user_id: teacherId,
                                class_id: classId,
                                credit: classCredit
                            }).returning("id")];
                    case 4:
                        earnRecord = _a.sent();
                        timestamp = Date.now();
                        earnTransaction_id = "en".concat(timestamp, "-").concat(earnRecord[0].id).split("-").join("");
                        useTransaction_id = "ue".concat(timestamp, "-").concat(useRecord[0].id).split("-").join("");
                        return [4 /*yield*/, txn("user_credit_record").update({ transaction_id: earnTransaction_id }).where("id", earnRecord[0].id)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, txn("user_credit_record").update({ transaction_id: useTransaction_id }).where("id", useRecord[0].id)];
                    case 6:
                        _a.sent();
                        // add to student_class
                        return [4 /*yield*/, txn("student_class").insert({
                                class_id: classId,
                                user_id: userId,
                                status: 'active'
                            })];
                    case 7:
                        // add to student_class
                        _a.sent();
                        return [4 /*yield*/, txn.commit()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 9:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [4 /*yield*/, txn.rollback()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, { success: false }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ClassService.prototype.checkCancelDayClassDayPeriod = function (class_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("    select id,(date-interval '2 days')as last_cancel_period from class \n    where id=?\n  and current_date<=(date-interval '2 days')", [class_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    ClassService.prototype.toCancelClassSeat = function (records, classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var txn, timestamp, _i, records_1, record, refundRecord, transaction_id, e_2;
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
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [4 /*yield*/, txn.rollback()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ClassService.prototype.checkUserAndClassCredits = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var creditRes, classCredit, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select user_id,sum(credit) as credit from user_credit_record where user_id=? group by user_id", [userId])];
                    case 1:
                        creditRes = (_a.sent()).rows;
                        return [4 /*yield*/, this.knex("class")
                                .select("credit", "teacher_id")
                                .from("class")
                                .where("class.id", classId)];
                    case 2:
                        classCredit = _a.sent();
                        result = {
                            userCreditLeft: creditRes[0]["credit"],
                            classCreditRequired: classCredit[0]["credit"],
                            teacher_id: classCredit[0]["teacher_id"],
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ClassService.prototype.checkCreditRecords = function (classId, userId) {
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
    ClassService.prototype.checkClassBooked = function (classId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("*")
                            .from("student_class")
                            .where("class_id", classId)
                            .andWhere("user_id", userId).andWhere("status", "active")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClassService.prototype.checkInstructorOtherClasses = function (teacher_id, classId) {
        return __awaiter(this, void 0, void 0, function () {
            var classQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        classQuery = "";
                        if (classId) {
                            classQuery = "and class.id !=".concat(classId);
                        }
                        return [4 /*yield*/, this.knex.raw("   select image,venue,class.name as name,users.name as instructor,class.type,uuid as class_number,link,introduction,credit,language,date,end_time,start_time as time,\n      class.capacity as max_capacity,class.id as class_id,\n       coalesce((class.capacity-booked),class.capacity)as capacity from class \n          inner join users on users.id = class.teacher_id\n                  left join (select count(class_id) as booked,class_id from student_class where status='active' group by class_id) as \n             class_info on class_info.class_id = class.id\n          where class.teacher_id = ?\n".concat(classQuery, "\n          order by class.date desc"), [teacher_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    ClassService.prototype.getStudentCommentByClassId = function (classId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw(" select star,comment,student_comment.created_at,name,icon from student_comment left join users on users.id=student_comment.user_id where student_comment.class_id=? order by student_comment.created_at desc ", [classId])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    ClassService.prototype.studentGiveCommentByClassId = function (class_id, comment, star, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("student_comment").insert({ class_id: class_id, comment: comment, star: star, user_id: user_id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassService.prototype.studentEditCommentByCommentId = function (id, comment, star) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("student_comment").update({ comment: comment, star: star }).where("id", id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ClassService;
}());
exports.ClassService = ClassService;
//# sourceMappingURL=ClassService.js.map