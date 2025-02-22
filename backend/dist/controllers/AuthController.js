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
exports.AuthController = void 0;
var hash_1 = require("../utils/hash");
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var dotenv_1 = __importDefault(require("dotenv"));
var formidable_1 = require("../utils/formidable");
dotenv_1.default.config();
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        var _this = this;
        this.authService = authService;
        this.register = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var form;
            var _this = this;
            return __generator(this, function (_a) {
                form = (0, formidable_1.createFormidableS3Form)();
                form.parse(req, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                    var name_1, email, password, confirmPw, phone, icon, iconFile, foundEmail, foundPhone, userId, payload, token, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, , 5]);
                                name_1 = fields.name, email = fields.email, password = fields.password, confirmPw = fields.confirmPw, phone = fields.phone;
                                icon = "";
                                if (files.hasOwnProperty("icon")) {
                                    iconFile = files.icon;
                                    if (Array.isArray(iconFile)) {
                                        icon = iconFile[0].newFilename;
                                    }
                                    else {
                                        icon = iconFile.newFilename;
                                    }
                                }
                                if (!name_1) {
                                    res.json({ success: false, msg: "Please fill in name" });
                                    return [2 /*return*/];
                                }
                                if (!email) {
                                    res.json({ success: false, msg: "Please fill in email" });
                                    return [2 /*return*/];
                                }
                                if (!password) {
                                    res.json({ success: false, msg: "Please fill in password" });
                                    return [2 /*return*/];
                                }
                                if (!phone) {
                                    res.json({ success: false, msg: "Please fill in phone" });
                                    return [2 /*return*/];
                                }
                                if (confirmPw != password) {
                                    res.json({ success: false, msg: "Please confirm password" });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.authService.getUserByEmail(email.toString())];
                            case 1:
                                foundEmail = _a.sent();
                                if (foundEmail) {
                                    res.json({ success: false, msg: "Email already registered" });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.authService.getUserByPhone(phone.toString())];
                            case 2:
                                foundPhone = _a.sent();
                                if (foundPhone) {
                                    res.json({ success: false, msg: "Phone number already registered" });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.authService.register(name_1.toString(), email.toString(), password.toString(), icon, phone.toString())];
                            case 3:
                                userId = _a.sent();
                                payload = { userId: userId, email: email, role: "user" };
                                token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                                res.json({
                                    success: true,
                                    msg: "register success",
                                    token: token,
                                    name: name_1,
                                    icon: icon,
                                });
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                console.log(e_1);
                                res.json({ success: false, msg: "system error" });
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, user, validPassword, payload, token, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email || !password) {
                            res.json({ success: false, msg: "please fill in data" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.authService.getUserByEmail(email)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.json({ success: false, msg: "No such user" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, hash_1.checkPassword)(password, user.password)];
                    case 2:
                        validPassword = _b.sent();
                        if (!validPassword) {
                            res.json({ success: false, msg: "Incorrect password or email" });
                            return [2 /*return*/];
                        }
                        payload = { userId: user.id, email: user.email, role: user.role };
                        token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                        res.json({
                            success: true,
                            msg: "Login success",
                            token: token,
                            name: user.name,
                            icon: user.icon,
                        });
                        return [2 /*return*/];
                    case 3:
                        e_2 = _b.sent();
                        console.log(e_2);
                        res.status(500).json("System error");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map