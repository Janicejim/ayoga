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
exports.CatalogController = void 0;
var permit_1 = require("permit");
var jwt_1 = __importDefault(require("../utils/jwt"));
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var CatalogController = /** @class */ (function () {
    function CatalogController(catalogService) {
        var _this = this;
        this.catalogService = catalogService;
        this.getClassMySearch = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, date, start_time, instructor, venue, title, type, yogaType, credit, language, permit, token, payload, user_id, classesData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query || "", date = _a.date, start_time = _a.start_time, instructor = _a.instructor, venue = _a.venue, title = _a.title, type = _a.type, yogaType = _a.yogaType, credit = _a.credit, language = _a.language;
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
                        return [4 /*yield*/, this.catalogService.getClassMySearch(date.toString(), start_time.toString(), instructor.toString(), venue.toString(), title.toString(), type.toString(), yogaType.toString(), +credit, language.toString(), +user_id)];
                    case 1:
                        classesData = _b.sent();
                        res.json({
                            data: classesData,
                            success: true,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
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
        this.getYogaType = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var yogaTypeData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.catalogService.getYogaType()];
                    case 1:
                        yogaTypeData = _a.sent();
                        res.json({
                            data: yogaTypeData,
                            success: true,
                        });
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
    }
    return CatalogController;
}());
exports.CatalogController = CatalogController;
//# sourceMappingURL=CatalogController.js.map