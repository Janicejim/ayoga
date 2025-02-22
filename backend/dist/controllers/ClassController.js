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
exports.ClassController = void 0;
var permit_1 = require("permit");
var jwt_1 = __importDefault(require("../utils/jwt"));
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var ClassController = /** @class */ (function () {
    function ClassController(classService) {
        var _this = this;
        this.classService = classService;
        this.getClassDetailsById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var classId, classDetails, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        classId = req.params.classId;
                        return [4 /*yield*/, this.classService.getClassDetails(+classId)];
                    case 1:
                        classDetails = _a.sent();
                        res.json({
                            details: classDetails,
                            success: true,
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
        }); };
        this.getUserTypeOfClass = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var classId, userId, checkIsCreator, isEnd, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        classId = req.params.classId;
                        userId = req.user.id;
                        return [4 /*yield*/, this.classService.checkIsCreatorOfClass(+classId, userId)];
                    case 1:
                        checkIsCreator = _a.sent();
                        return [4 /*yield*/, this.classService.checkTheClassIsEnd(+classId)];
                    case 2:
                        isEnd = _a.sent();
                        if (!(checkIsCreator.length > 0)) return [3 /*break*/, 3];
                        res.json({
                            isCreator: true,
                            success: true,
                            isEnd: isEnd
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.classService.checkIsJoinerOfClass(+classId, userId)];
                    case 4:
                        result = _a.sent();
                        res.json({
                            isCreator: false,
                            joinerData: result,
                            isEnd: isEnd,
                            success: true,
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.checkBookmarked = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, targetClassId, bookmarkedRes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        targetClassId = parseInt(req.params.classId);
                        return [4 /*yield*/, this.classService.checkClassBookmarked(targetClassId, userId)];
                    case 1:
                        bookmarkedRes = _a.sent();
                        if (bookmarkedRes.length === 0) {
                            res.json({
                                bookmarked: false,
                                success: true,
                            });
                            return [2 /*return*/];
                        }
                        res.json({
                            bookmarked: true,
                            success: true,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(401).json({
                            msg: error_3,
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addBookmarked = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, targetClassId, bookmarkedRes, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        targetClassId = parseInt(req.params.classId);
                        return [4 /*yield*/, this.classService.checkClassBookmarked(targetClassId, userId)];
                    case 1:
                        bookmarkedRes = _a.sent();
                        if (bookmarkedRes.length > 0) {
                            res.json({
                                msg: "The Class has already been bookmarked.",
                                success: false,
                                type: "add",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.addClassBookmark(targetClassId, userId)];
                    case 2:
                        _a.sent();
                        res.json({
                            msg: "The Class is bookmarked.",
                            success: true,
                            type: "add",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(500).json({
                            msg: "system error",
                            success: false,
                            type: "add",
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteBookmarked = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, targetClassId, bookmarkedRes, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = req.user.id;
                        targetClassId = parseInt(req.params.classId);
                        return [4 /*yield*/, this.classService.checkClassBookmarked(targetClassId, userId)];
                    case 1:
                        bookmarkedRes = _a.sent();
                        if (bookmarkedRes.length === 0) {
                            res.json({
                                msg: "Bookmark does not exist.",
                                success: false,
                                type: "delete",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.deleteClassBookmark(targetClassId, userId)];
                    case 2:
                        _a.sent();
                        res.json({
                            msg: "Bookmark is deleted.",
                            success: true,
                            type: "delete",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.reserveSeat = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, targetClassId, checkIsYoursClass, checkReserved, checkCreditLeft, checkClassAvailability, reserveResult, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userId = req.user.id;
                        targetClassId = parseInt(req.params.classId);
                        return [4 /*yield*/, this.classService.checkIsCreatorOfClass(targetClassId, userId)];
                    case 1:
                        checkIsYoursClass = _a.sent();
                        if (checkIsYoursClass.length > 0) {
                            res.json({
                                success: false,
                                msg: "You can't enrol the class you created",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.checkClassSeatReserved(targetClassId, userId)];
                    case 2:
                        checkReserved = _a.sent();
                        if (checkReserved.length > 0) {
                            res.json({
                                success: false,
                                msg: "You have already join this class",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.checkUserAndClassCredits(targetClassId, userId)];
                    case 3:
                        checkCreditLeft = _a.sent();
                        if (checkCreditLeft.classCreditRequired > checkCreditLeft.userCreditLeft) {
                            res.json({
                                success: false,
                                msg: "Not enough credit,please top up first",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.checkClassAvailability(targetClassId)];
                    case 4:
                        checkClassAvailability = _a.sent();
                        if (!(checkClassAvailability.classCap > checkClassAvailability.classAttendee)) {
                            res.json({
                                success: false,
                                msg: "The class is full",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.toReserveClassSeat(checkCreditLeft.teacher_id, targetClassId, userId, +(checkCreditLeft.classCreditRequired))];
                    case 5:
                        reserveResult = _a.sent();
                        if (reserveResult.success) {
                            res.status(200).json({
                                message: "Your seat has been successfully reserved.",
                                success: true,
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "System problem, please try it again",
                                success: false,
                            });
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        console.log(error_6);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.cancelReserveSeat = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, targetClassId, creditRecordsRelated, periodResult, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        userId = req.user.id;
                        targetClassId = parseInt(req.params.classId);
                        return [4 /*yield*/, this.classService.checkCreditRecords(targetClassId, userId)];
                    case 1:
                        creditRecordsRelated = _a.sent();
                        return [4 /*yield*/, this.classService.checkCancelDayClassDayPeriod(targetClassId)];
                    case 2:
                        periodResult = _a.sent();
                        if (periodResult.length == 0) {
                            res.json({
                                success: false,
                                msg: "Only can cancel the booking two day before class start date",
                            });
                            return [2 /*return*/];
                        }
                        // cancel booking:
                        return [4 /*yield*/, this.classService.toCancelClassSeat([creditRecordsRelated.useCreditRecord, creditRecordsRelated.earnCreditRecord], targetClassId, userId)];
                    case 3:
                        // cancel booking:
                        _a.sent();
                        res.status(200).json({
                            message: "Your booking has successfully been canceled.",
                            success: true,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_7 = _a.sent();
                        console.log(error_7);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.checkIsBooked = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, targetClassId, bookedRes, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.id;
                        targetClassId = parseInt(req.params.classId);
                        return [4 /*yield*/, this.classService.checkClassBooked(targetClassId, userId)];
                    case 1:
                        bookedRes = _a.sent();
                        if (bookedRes.length === 0) {
                            res.json({
                                booked: false,
                                success: true,
                            });
                            return [2 /*return*/];
                        }
                        res.json({
                            booked: true,
                            success: true,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
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
        this.getInstructorOtherClasses = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var teacher_id, existingClass_id, checkingResult, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        teacher_id = parseInt(req.params.teacherId);
                        existingClass_id = req.query.classId;
                        checkingResult = void 0;
                        if (!existingClass_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.classService.checkInstructorOtherClasses(teacher_id, +existingClass_id)];
                    case 1:
                        checkingResult = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.classService.checkInstructorOtherClasses(teacher_id)];
                    case 3:
                        checkingResult = _a.sent();
                        _a.label = 4;
                    case 4:
                        res.json({ success: true, data: checkingResult });
                        return [3 /*break*/, 6];
                    case 5:
                        error_9 = _a.sent();
                        console.log(error_9);
                        res.status(500).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getStudentCommentByClassId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var classId, comments, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        classId = req.params.classId;
                        return [4 /*yield*/, this.classService.getStudentCommentByClassId(+classId)];
                    case 1:
                        comments = _a.sent();
                        res.json({
                            data: comments,
                            success: true,
                        });
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
        this.studentGiveCommentByClassId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var classId, userId, _a, comment, rating, comments, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        classId = req.params.classId;
                        userId = req.user.id;
                        _a = req.body, comment = _a.comment, rating = _a.rating;
                        if (!comment || !rating) {
                            res.json({ success: false, msg: "missing comment of star" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.studentGiveCommentByClassId(+classId, comment, rating, userId)];
                    case 1:
                        comments = _b.sent();
                        res.json({
                            data: comments,
                            msg: "Give feedback success",
                            success: true,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _b.sent();
                        console.log(error_11);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.studentEditCommentByCommentId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var commentId, _a, comment, star, comments, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        commentId = req.params.id;
                        _a = req.body, comment = _a.comment, star = _a.star;
                        if (!comment || !star) {
                            res.json({ success: false, msg: "missing comment of star" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.classService.studentEditCommentByCommentId(+commentId, comment, star)];
                    case 1:
                        comments = _b.sent();
                        res.json({
                            data: comments,
                            success: true,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _b.sent();
                        console.log(error_12);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClassMySearch = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, date, _c, start_time, _d, instructor, _e, venue, _f, title, _g, type, _h, yogaType, _j, credit, _k, language, permit, token, payload, user_id, classesData, error_13;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 2, , 3]);
                        _a = req.query || {}, _b = _a.date, date = _b === void 0 ? "" : _b, _c = _a.start_time, start_time = _c === void 0 ? "" : _c, _d = _a.instructor, instructor = _d === void 0 ? "" : _d, _e = _a.venue, venue = _e === void 0 ? "" : _e, _f = _a.title, title = _f === void 0 ? "" : _f, _g = _a.type, type = _g === void 0 ? "" : _g, _h = _a.yogaType, yogaType = _h === void 0 ? "" : _h, _j = _a.credit, credit = _j === void 0 ? "" : _j, _k = _a.language, language = _k === void 0 ? "" : _k;
                        ;
                        permit = new permit_1.Bearer({
                            query: "access_token",
                        });
                        token = permit.check(req);
                        payload = void 0;
                        user_id = void 0;
                        if (token !== "null") {
                            payload = jwt_simple_1.default.decode(token, jwt_1.default.jwtSecret);
                            user_id = payload.userId;
                        }
                        else {
                            user_id = 0;
                        }
                        return [4 /*yield*/, this.classService.getClassMySearch(date, start_time, instructor, venue, title, type, yogaType, +credit, language, +user_id)];
                    case 1:
                        classesData = _l.sent();
                        res.json({
                            data: classesData,
                            success: true,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _l.sent();
                        console.log(error_13);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getYogaType = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var yogaTypeData, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.classService.getYogaType()];
                    case 1:
                        yogaTypeData = _a.sent();
                        res.json({
                            data: yogaTypeData,
                            success: true,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _a.sent();
                        console.log(error_14);
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
    return ClassController;
}());
exports.ClassController = ClassController;
//# sourceMappingURL=ClassController.js.map