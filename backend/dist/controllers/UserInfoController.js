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
exports.UserInfoController = void 0;
var formidable_1 = require("../utils/formidable");
var hash_1 = require("../utils/hash");
var UserInfoController = /** @class */ (function () {
    function UserInfoController(userInfoService) {
        var _this = this;
        this.userInfoService = userInfoService;
        this.getUserInfoBox = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, userInfoResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.user.id;
                        return [4 /*yield*/, this.userInfoService.getUserBoxInfo(user_id)];
                    case 1:
                        userInfoResult = (_a.sent())[0];
                        res.json({ success: true, data: userInfoResult });
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
        this.getBookingInfo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, bookingResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.user.id;
                        return [4 /*yield*/, this.userInfoService.getBooking(user_id)];
                    case 1:
                        bookingResult = _a.sent();
                        res.json({ success: true, data: bookingResult });
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
        this.getBookmarkInfo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, bookmarkResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.user.id;
                        return [4 /*yield*/, this.userInfoService.getBookmark(user_id)];
                    case 1:
                        bookmarkResult = _a.sent();
                        res.json({ success: true, data: bookmarkResult });
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
        this.getClassByTeacher = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, hostResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.user.id;
                        if (req.query.teacher_id) {
                            user_id = req.query.teacher_id;
                        }
                        return [4 /*yield*/, this.userInfoService.getClassByTeacher(user_id)];
                    case 1:
                        hostResult = _a.sent();
                        res.json({ success: true, data: hostResult });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
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
        this.getCreditForWithdrawal = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.user.id;
                        return [4 /*yield*/, this.userInfoService.getCreditForWithdrawal(user_id)];
                    case 1:
                        result = _a.sent();
                        res.json({ success: true, data: result });
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
        this.WithdrawalCredit = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, _a, withdrawalAmount, full_name, bank_id, fps_no, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        user_id = req.user.id;
                        _a = req.body, withdrawalAmount = _a.withdrawalAmount, full_name = _a.full_name, bank_id = _a.bank_id, fps_no = _a.fps_no;
                        if (!withdrawalAmount || !full_name || !bank_id || !fps_no) {
                            res.json({ success: false, mgs: "missing info" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userInfoService.withdrawalCredit(user_id, +withdrawalAmount, full_name, bank_id, fps_no)];
                    case 1:
                        _b.sent();
                        res.json({ success: true, msg: "withdrawal success" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
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
        this.changeProfilePic = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                formidable_1.form.parse(req, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                    var icon, user_id, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                icon = "";
                                if (files.hasOwnProperty("icon")) {
                                    //@ts-ignore
                                    icon = files.icon.newFilename;
                                }
                                else {
                                    res.json({ success: false, msg: "missing file" });
                                }
                                user_id = req.user.id;
                                return [4 /*yield*/, this.userInfoService.updateProfilePic(user_id, icon)];
                            case 1:
                                _a.sent();
                                res.json({
                                    success: true,
                                    msg: "update profile picture successfully"
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                console.log(e_1);
                                res.json({ success: false, msg: "system error" });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.editUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name_1, phone, user_id, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_1 = _a.name, phone = _a.phone;
                        if (!name_1 || !phone) {
                            res.json({ success: false, msg: "missing info" });
                            return [2 /*return*/];
                        }
                        user_id = req.user.id;
                        return [4 /*yield*/, this.userInfoService.editUser(user_id, name_1, phone)];
                    case 1:
                        _b.sent();
                        res.json({
                            success: true,
                            msg: "update success",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _b.sent();
                        console.log(e_2);
                        res.json({ success: false, msg: "system error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, new_password, confirm_password, old_password, user_id, passwordInDb, checkOldPasswordIsMatch, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, new_password = _a.new_password, confirm_password = _a.confirm_password, old_password = _a.old_password;
                        if (!new_password || !confirm_password || !old_password) {
                            res.json({ success: false, msg: "missing info" });
                            return [2 /*return*/];
                        }
                        user_id = req.user.id;
                        return [4 /*yield*/, this.userInfoService.getOldPassword(user_id)];
                    case 1:
                        passwordInDb = _b.sent();
                        return [4 /*yield*/, (0, hash_1.checkPassword)(old_password, passwordInDb)];
                    case 2:
                        checkOldPasswordIsMatch = _b.sent();
                        if (!checkOldPasswordIsMatch) {
                            res.json({ success: false, msg: "password wrong,can't change" });
                            return [2 /*return*/];
                        }
                        if (new_password !== confirm_password) {
                            res.json({ success: false, msg: "confirm password not match" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userInfoService.changePassword(user_id, new_password)];
                    case 3:
                        _b.sent();
                        res.json({
                            success: true,
                            msg: "update success",
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _b.sent();
                        console.log(e_3);
                        res.json({ success: false, msg: "system error" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserInfoController;
}());
exports.UserInfoController = UserInfoController;
//# sourceMappingURL=UserInfoController.js.map