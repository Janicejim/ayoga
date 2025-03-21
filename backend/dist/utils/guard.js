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
exports.isTeacherAPI = exports.isAdminAPI = exports.isLoggedInAPI = void 0;
var permit_1 = require("permit");
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var jwt_1 = __importDefault(require("./jwt"));
var AuthRoutes_1 = require("../routers/AuthRoutes");
var permit = new permit_1.Bearer({
    query: "access_token"
});
function isLoggedInAPI(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, payload, userId, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = permit.check(req);
                    if (!token) {
                        res.status(401).json({ message: "Permission denied" });
                        return [2 /*return*/];
                    }
                    payload = jwt_simple_1.default.decode(token, jwt_1.default.jwtSecret);
                    userId = payload.userId;
                    return [4 /*yield*/, AuthRoutes_1.authService.getUserById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        res
                            .status(401)
                            .json({ message: "Permission Denied:Can't find the user" });
                        return [2 /*return*/];
                    }
                    req.user = user;
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    res.status(401).json({ message: "system error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isLoggedInAPI = isLoggedInAPI;
function isAdminAPI(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, payload, userId, user, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = permit.check(req);
                    if (!token) {
                        res.status(401).json({ message: "Permission denied" });
                        return [2 /*return*/];
                    }
                    payload = jwt_simple_1.default.decode(token, jwt_1.default.jwtSecret);
                    userId = payload.userId;
                    return [4 /*yield*/, AuthRoutes_1.authService.getUserById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        res
                            .status(401)
                            .json({ success: false, msg: "Permission Denied:Can't find the user" });
                        return [2 /*return*/];
                    }
                    if (user.role !== "admin") {
                        res.status(401).json({ success: false, msg: "Admin only" });
                        return [2 /*return*/];
                    }
                    req.user = user;
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    res.status(401).json({ success: false, msg: "system error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isAdminAPI = isAdminAPI;
function isTeacherAPI(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, payload, userId, user, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = permit.check(req);
                    if (!token) {
                        res.status(401).json({ message: "Permission denied" });
                        return [2 /*return*/];
                    }
                    payload = jwt_simple_1.default.decode(token, jwt_1.default.jwtSecret);
                    userId = payload.userId;
                    return [4 /*yield*/, AuthRoutes_1.authService.getUserById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        res
                            .status(401)
                            .json({ success: false, msg: "Permission Denied:Can't find the user" });
                        return [2 /*return*/];
                    }
                    if (user.role !== "teacher") {
                        res.status(401).json({ success: false, msg: "Admin only" });
                        return [2 /*return*/];
                    }
                    req.user = user;
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3);
                    res.status(401).json({ success: false, msg: "system error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.isTeacherAPI = isTeacherAPI;
//# sourceMappingURL=guard.js.map