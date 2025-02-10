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
exports.TeacherService = void 0;
var TeacherService = /** @class */ (function () {
    function TeacherService(knex) {
        this.knex = knex;
    }
    TeacherService.prototype.applyTeacherRole = function (user_id, sex, introduction, newest_qualification, photo, id_photo, cert) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("teacher_info").insert({
                            id: user_id,
                            sex: sex,
                            introduction: introduction,
                            newest_qualification: newest_qualification,
                            photo: photo,
                            id_photo: id_photo,
                            cert: cert,
                            status: "pending",
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeacherService.prototype.createClass = function (name, venue, capacity, language, credit, date, start_time, end_time, teacher_id, image, venue_point_lat, venue_point_lng, type, yoga_type_id, introduction) {
        return __awaiter(this, void 0, void 0, function () {
            var classResult, class_id, uuid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type == "offline")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.knex("class")
                                .returning("id")
                                .insert({
                                name: name,
                                venue: venue,
                                capacity: capacity,
                                language: language,
                                credit: credit,
                                teacher_id: teacher_id,
                                image: image,
                                status: "active",
                                venue_point: this.knex.raw("point(?,?)", [
                                    venue_point_lat,
                                    venue_point_lng,
                                ]),
                                type: type,
                                yoga_type_id: yoga_type_id,
                                introduction: introduction,
                                date: date,
                                start_time: start_time,
                                end_time: end_time,
                            })];
                    case 1:
                        classResult = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.knex("class").returning("id").insert({
                            name: name,
                            capacity: capacity,
                            language: language,
                            credit: credit,
                            teacher_id: teacher_id,
                            image: image,
                            status: "active",
                            type: type,
                            yoga_type_id: yoga_type_id,
                            introduction: introduction,
                            date: date,
                            start_time: start_time,
                            end_time: end_time,
                        })];
                    case 3:
                        classResult = _a.sent();
                        _a.label = 4;
                    case 4:
                        class_id = classResult[0]["id"];
                        uuid = "".concat(date).concat(start_time, "-").concat(class_id).split("-").join("");
                        return [4 /*yield*/, this.knex("class").update({ uuid: uuid }).where("id", class_id)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeacherService.prototype.getStudentList = function (class_id) {
        return __awaiter(this, void 0, void 0, function () {
            var activeStudent, inactiveStudent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select user_id as id,status,email,name,phone from student_class join users on users.id=user_id where class_id=? and status='active' order by name asc", [class_id])];
                    case 1:
                        activeStudent = (_a.sent()).rows;
                        return [4 /*yield*/, this.knex.raw("select user_id as id,status,email,name,phone,icon from student_class join users on users.id=user_id where class_id=? and status='inactive' order by name asc", [class_id])];
                    case 2:
                        inactiveStudent = (_a.sent()).rows;
                        return [2 /*return*/, { activeStudent: activeStudent, inactiveStudent: inactiveStudent }];
                }
            });
        });
    };
    TeacherService.prototype.checkIsCreatorOfClass = function (classId, userId) {
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
    TeacherService.prototype.getTeacherSchedule = function (teacher_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select uuid,name,id,date,start_time,end_time from class where teacher_id =? and status='active'", [teacher_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    TeacherService.prototype.checkWhetherTheClassHaveStudentJoin = function (class_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("student_class")
                            .select("id")
                            .where("class_id", class_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TeacherService.prototype.editClassInfo = function (class_id, name, venue, capacity, language, credit, date, start_time, end_time, image, venue_point_lat, venue_point_lng, type, yoga_type_id, introduction) {
        return __awaiter(this, void 0, void 0, function () {
            var uuid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uuid = "".concat(date).concat(start_time, "-").concat(class_id).split("-").join("");
                        if (!(type == "offline")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.knex("class")
                                .update({
                                uuid: uuid,
                                name: name,
                                venue: venue,
                                capacity: capacity,
                                language: language,
                                credit: credit,
                                date: date,
                                start_time: start_time,
                                end_time: end_time,
                                image: image,
                                type: type,
                                yoga_type_id: yoga_type_id,
                                introduction: introduction,
                                venue_point: this.knex.raw("point(?,?)", [
                                    venue_point_lat,
                                    venue_point_lng,
                                ]),
                            })
                                .where("id", class_id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.knex("class")
                            .update({
                            uuid: uuid,
                            name: name,
                            capacity: capacity,
                            language: language,
                            credit: credit,
                            date: date,
                            start_time: start_time,
                            end_time: end_time,
                            image: image,
                            type: type,
                            yoga_type_id: yoga_type_id,
                            introduction: introduction,
                        })
                            .where("id", class_id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeacherService.prototype.getTeacherInfoAndComment = function (teacher_id) {
        return __awaiter(this, void 0, void 0, function () {
            var teacherInfo, teacherScore, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select users.id, name,introduction,photo,newest_qualification,cert from teacher_info left join users on users.id=teacher_info.id where status='accept' and users.id=?", [teacher_id])];
                    case 1:
                        teacherInfo = (_a.sent()).rows;
                        return [4 /*yield*/, this.knex.raw("select avg(star) as score from student_class join class on class.id=student_class.class_id left join student_comment on student_comment.class_id =student_class.class_id where teacher_id =?\n    ", [teacher_id])];
                    case 2:
                        teacherScore = (_a.sent()).rows;
                        if (teacherScore.length > 0 && teacherScore[0].score !== null) {
                            teacherInfo[0]["score"] = Math.round(teacherScore[0].score * 100) / 100;
                        }
                        else {
                            teacherInfo[0]["score"] = "No score";
                        }
                        return [4 /*yield*/, this.knex.raw("select student_comment.id,users.name,icon,class.name as class_name,student_comment.updated_at,comment,star from student_class join class on class.id=student_class.class_id join users on student_class.user_id=users.id right join student_comment on student_comment.class_id =student_class.class_id where teacher_id =? order by student_comment.created_at desc", [teacher_id])];
                    case 3:
                        comments = (_a.sent()).rows;
                        return [2 /*return*/, { teacherInfo: teacherInfo, comments: comments }];
                }
            });
        });
    };
    TeacherService.prototype.getTeacherInfo = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select introduction,newest_qualification,cert from teacher_info left join users on users.id=teacher_info.id where status='accept' and users.id=?", [user_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    TeacherService.prototype.getTeacherRevenueData = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var yearData, monthData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("SELECT TO_CHAR(created_at, 'YYYY') AS year, COALESCE(SUM(credit), 0) AS credit\nFROM user_credit_record\nWHERE (type = 'earn' OR (type = 'refund' AND credit < 0)) AND user_id = ?\nGROUP BY TO_CHAR(created_at, 'YYYY') order by year asc", [user_id])];
                    case 1:
                        yearData = (_a.sent()).rows;
                        return [4 /*yield*/, this.knex.raw("SELECT EXTRACT(month FROM created_at) AS month, COALESCE(SUM(credit), 0) AS credit\nFROM user_credit_record\nWHERE (type = 'earn' OR (type = 'refund' AND credit < 0)) AND user_id = ?\nAND EXTRACT(year FROM created_at) = EXTRACT(year FROM CURRENT_DATE)\nGROUP BY EXTRACT(month FROM created_at) order by month asc", [user_id])];
                    case 2:
                        monthData = (_a.sent()).rows;
                        return [2 /*return*/, { yearData: yearData, monthData: monthData }];
                }
            });
        });
    };
    TeacherService.prototype.editTeacherInfo = function (user_id, introduction, newest_qualification) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("teacher_info").update({ introduction: introduction, newest_qualification: newest_qualification }).where("id", user_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeacherService.prototype.getTeachers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select coalesce(score,0) as score,users.id, name,photo from teacher_info left join users on users.id=teacher_info.id left join \n(select avg(star) as score,class.teacher_id from student_class join class on class.id=student_class.class_id left join student_comment on\nstudent_comment.class_id =student_class.class_id group by class.teacher_id ) as score_info on score_info.teacher_id=teacher_info.id\nwhere status='accept' order by score desc limit 10\n")];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    TeacherService.prototype.getHighScoreComment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw("select student_comment.id,users.name,icon,student_comment.updated_at,comment,star from student_class join class on class.id=student_class.class_id join users on student_class.user_id=users.id right join student_comment on student_comment.class_id =student_class.class_id order by student_comment.created_at desc\n limit 10\n")];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    return TeacherService;
}());
exports.TeacherService = TeacherService;
//# sourceMappingURL=TeacherService.js.map