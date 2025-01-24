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
exports.AdminController = void 0;
var nodemailer_1 = __importDefault(require("../utils/nodemailer"));
var AdminController = /** @class */ (function () {
    function AdminController(adminService) {
        var _this = this;
        this.adminService = adminService;
        this.getUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        data = void 0;
                        if (!req.query.hasOwnProperty("keyword")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.adminService.getUserByKeyword(req.query.keyword.toString())];
                    case 1:
                        data = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.adminService.getAllUsers()];
                    case 3:
                        data = _a.sent();
                        _a.label = 4;
                    case 4:
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getTeacherRequests = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminService.getTeacherRequests()];
                    case 1:
                        data = _a.sent();
                        res.json({ success: true, data: data });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.replyTeacherRequests = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var requestId, _a, status_1, remark, user, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        requestId = req.query.requestId;
                        _a = req.body, status_1 = _a.status, remark = _a.remark;
                        if (!requestId) {
                            res.json({ success: false, msg: "missing query" });
                            return [2 /*return*/];
                        }
                        if (!status_1) {
                            res.json({ success: false, msg: "missing status in body" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.adminService.getUserEmailById(+requestId)];
                    case 1:
                        user = _b.sent();
                        if (!(status_1 == "accept")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.adminService.acceptTeacherRequests(+requestId)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.adminService.updateUserRole(+requestId, "teacher")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, (0, nodemailer_1.default)(user[0].email, "Apply Teacher Role Success", "You request for apply teacher role is success. Please logout and login again to reload the new role setting: ".concat(process.env.FRONTEND_URL, ". Thanks!"))];
                    case 4:
                        _b.sent();
                        res.json({
                            success: true,
                            msg: "Accept teacher request success and email has been send to user",
                        });
                        return [3 /*break*/, 8];
                    case 5:
                        if (!remark) {
                            res.json({ success: false, msg: "missing remark in body" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.adminService.rejectTeacherRequests(+requestId, remark)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, (0, nodemailer_1.default)(user[0].email, "Reject Teacher Role Request", "Sorry that your request is reject by admin because of below reason:".concat(remark))];
                    case 7:
                        _b.sent();
                        res.json({
                            success: true,
                            msg: "Reject teacher request success and reject email has been send to user",
                        });
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_3 = _b.sent();
                        console.log(error_3);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.updateUserRole = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, user_id, role, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, user_id = _a.user_id, role = _a.role;
                        if (!user_id || !role) {
                            res.json({ success: false, msg: "missing query" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.adminService.updateUserRole(+user_id, role.toString())];
                    case 1:
                        _b.sent();
                        res.json({ success: true, msg: "update role success" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUnCommentStudentSummary = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminService.getUnCommentStudentSummary()];
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
        this.sendEmailToUnCommentStudent = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, _i, data_1, record, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminService.getUnCommentStudentSummary()];
                    case 1:
                        data = _a.sent();
                        if (data.length > 0) {
                            for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                                record = data_1[_i];
                                (0, nodemailer_1.default)(record.email, "Give Comment", "Please give your teacher a comment and score.Link:".concat(process.env.FRONTEND_URL, "/class/detail/").concat(record.class_id));
                            }
                        }
                        res.json({ success: true, msg: "Send alert email successfully" });
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
        //to do:
        this.getCompanyFinancialData = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminService.getCompanyFinancialData()];
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
    }
    return AdminController;
}());
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map