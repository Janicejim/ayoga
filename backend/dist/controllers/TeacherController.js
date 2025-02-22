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
exports.TeacherController = void 0;
var formidable_1 = require("../utils/formidable");
var TeacherController = /** @class */ (function () {
    function TeacherController(teacherService) {
        var _this = this;
        this.teacherService = teacherService;
        this.applyTeacherRole = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var form;
            var _this = this;
            return __generator(this, function (_a) {
                form = (0, formidable_1.createFormidableS3Form)();
                form.parse(req, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                    var user_id, sex, introduction, newest_qualification, photo, id_photo, cert, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                user_id = req.user.id;
                                sex = fields.sex, introduction = fields.introduction, newest_qualification = fields.newest_qualification;
                                photo = Array.isArray(files.photo) ? files.photo[0].newFilename : files.photo.newFilename;
                                id_photo = Array.isArray(files.id_photo) ? files.id_photo[0].newFilename : files.id_photo.newFilename;
                                cert = Array.isArray(files.cert) ? files.cert[0].newFilename : files.cert.newFilename;
                                if (!sex ||
                                    !introduction ||
                                    !newest_qualification ||
                                    !photo ||
                                    !id_photo ||
                                    !cert) {
                                    res.json({ success: false, msg: "missing info" });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.teacherService.applyTeacherRole(user_id, sex.toString(), introduction.toString(), newest_qualification.toString(), photo, id_photo, cert)];
                            case 1:
                                _a.sent();
                                res.json({
                                    success: true,
                                    msg: "Your request is sent,our admin will handle your request as soon as possible. Result will send by email!",
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.log(error_1);
                                res.status(401).json({
                                    msg: "system error",
                                    success: false,
                                });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.createClass = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var form;
            var _this = this;
            return __generator(this, function (_a) {
                form = (0, formidable_1.createFormidableS3Form)();
                form.parse(req, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                    var teacher_id, name_1, capacity, language, credit, date, start_time, end_time, type, yoga_type, introduction, file, venue, venue_point_lat, venue_point_lng, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                teacher_id = req.user.id;
                                name_1 = fields.name, capacity = fields.capacity, language = fields.language, credit = fields.credit, date = fields.date, start_time = fields.start_time, end_time = fields.end_time, type = fields.type, yoga_type = fields.yoga_type, introduction = fields.introduction;
                                file = Array.isArray(files.image) ? files.image[0].newFilename : files.image.newFilename;
                                if (+capacity < 0 && +capacity > 20) {
                                    res.json({
                                        success: false,
                                        msg: "Class size has to be under 20 students",
                                    });
                                    return [2 /*return*/];
                                }
                                if (!name_1 ||
                                    !date ||
                                    !capacity ||
                                    !language ||
                                    !credit ||
                                    !start_time ||
                                    !end_time) {
                                    res.json({
                                        success: false,
                                        msg: "Please fill in missing column",
                                    });
                                    return [2 /*return*/];
                                }
                                venue = "";
                                venue_point_lat = "";
                                venue_point_lng = "";
                                if (type == "offline") {
                                    venue = fields.venue.toString();
                                    venue_point_lat = fields.venue_point_lat.toString();
                                    venue_point_lng = fields.venue_point_lng.toString();
                                    if (!venue || !venue_point_lat || !venue_point_lng) {
                                        res.json({
                                            success: false,
                                            msg: "Please fill in missing column",
                                        });
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, this.teacherService.createClass(name_1.toString(), venue.toString(), +capacity, language.toString(), +credit, date.toString(), start_time.toString(), end_time.toString(), +teacher_id, file.toString(), venue_point_lat, venue_point_lng, type.toString(), +yoga_type, introduction.toString())];
                            case 1:
                                _a.sent();
                                res.json({
                                    success: true,
                                    msg: "class created",
                                    // token: token,
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                console.log(e_1);
                                res.status(500).json({
                                    msg: "system error",
                                    success: false,
                                });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.getStudentList = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var class_id, userId, isCreatorResult, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        class_id = req.query.class_id;
                        userId = req.user.id;
                        if (!class_id) {
                            res.json({ success: false, msg: "missing query" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.teacherService.checkIsCreatorOfClass(+class_id, userId)];
                    case 1:
                        isCreatorResult = _a.sent();
                        if (!(isCreatorResult.length < 1)) return [3 /*break*/, 2];
                        res.json({ success: false, msg: "Only class creator can see the student list" });
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.teacherService.getStudentList(+class_id)];
                    case 3:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getTeacherSchedule = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var teacher_id, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        teacher_id = req.user.id;
                        return [4 /*yield*/, this.teacherService.getTeacherSchedule(teacher_id)];
                    case 1:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editClassInfo = function (req, res) {
            var form = (0, formidable_1.createFormidableS3Form)();
            form.parse(req, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                var class_id, result, name_2, capacity, language, credit, date, start_time, end_time, type, yoga_type, introduction, image, venue, venue_point_lat, venue_point_lng, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            class_id = req.query.class_id;
                            if (!class_id) {
                                res.json({ success: false, msg: "missing query" });
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.teacherService.checkWhetherTheClassHaveStudentJoin(+class_id)];
                        case 1:
                            result = _a.sent();
                            if (result.length > 0) {
                                res.json({ success: false, msg: "Have Student Attend, can't edit" });
                                return [2 /*return*/];
                            }
                            name_2 = fields.name, capacity = fields.capacity, language = fields.language, credit = fields.credit, date = fields.date, start_time = fields.start_time, end_time = fields.end_time, type = fields.type, yoga_type = fields.yoga_type, introduction = fields.introduction;
                            image = "";
                            if (files.hasOwnProperty("image")) {
                                image = Array.isArray(files.image) ? files.image[0].newFilename : files.image.newFilename;
                            }
                            if (!name_2 ||
                                !date ||
                                !capacity ||
                                !language ||
                                !credit ||
                                !start_time ||
                                !end_time ||
                                !yoga_type ||
                                !introduction) {
                                res.json({
                                    success: false,
                                    msg: "Please fill in missing column",
                                });
                                return [2 /*return*/];
                            }
                            venue = "";
                            venue_point_lat = "";
                            venue_point_lng = "";
                            if (type == "offline") {
                                venue = fields.venue.toString();
                                venue_point_lat = fields.venue_point_lat.toString();
                                venue_point_lng = fields.venue_point_lng.toString();
                                if (!venue || !venue_point_lat || !venue_point_lng) {
                                    res.json({
                                        success: false,
                                        msg: "Please fill in missing column",
                                    });
                                    return [2 /*return*/];
                                }
                            }
                            return [4 /*yield*/, this.teacherService.editClassInfo(+class_id, name_2.toString(), venue.toString(), +capacity, language.toString(), +credit, date.toString(), start_time.toString(), end_time.toString(), image.toString(), venue_point_lat, venue_point_lng, type.toString(), +yoga_type, introduction.toString())];
                        case 2:
                            _a.sent();
                            res.json({ success: true, msg: "edit class success" });
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            console.log(error_4);
                            res.status(401).json({
                                msg: "system error",
                                success: false,
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        };
        this.getTeacherInfoAndComment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var teacher_id, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        teacher_id = req.query.teacher_id;
                        if (!teacher_id) {
                            res.json({ success: false, msg: "missing query" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.teacherService.getTeacherInfoAndComment(+teacher_id)];
                    case 1:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getTeacherInfo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.user.id;
                        return [4 /*yield*/, this.teacherService.getTeacherInfo(user_id)];
                    case 1:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getRevenueData = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        return [4 /*yield*/, this.teacherService.getTeacherRevenueData(userId)];
                    case 1:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editTeacherInfo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, _a, introduction, newest_qualification, data, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        _a = req.body, introduction = _a.introduction, newest_qualification = _a.newest_qualification;
                        if (!introduction || !newest_qualification) {
                            res.json({
                                success: false,
                                msg: "missing info",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.teacherService.editTeacherInfo(userId, introduction, newest_qualification)];
                    case 1:
                        data = _b.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _b.sent();
                        console.log(error_8);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getTeachers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.teacherService.getTeachers()];
                    case 1:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getHighScoreComment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.teacherService.getHighScoreComment()];
                    case 1:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        console.log(error_10);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return TeacherController;
}());
exports.TeacherController = TeacherController;
//# sourceMappingURL=TeacherController.js.map