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
exports.PackageController = void 0;
var stripe_1 = __importDefault(require("stripe"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log("permit", permit);
var PackageController = /** @class */ (function () {
    function PackageController(packageService) {
        var _this = this;
        this.packageService = packageService;
        this.getPackagesInfo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var packagesResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.packageService.getPackages()];
                    case 1:
                        packagesResult = _a.sent();
                        res.json({ success: true, data: packagesResult });
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
        this.stripeSession = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var stripe, package_id, packageInfo, item, session, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        stripe = new stripe_1.default("sk_test_51OyVywIy2oxzbVAMLnbTXoH2GyOg1M4H9mUB2Tl8FAIwnJu6tMIuGgcsumIhp95olp44BOJq8hsfU8Gv76w12L3H00fJVRYKu6", {
                            apiVersion: "2020-08-27",
                        });
                        package_id = req.query.package_id;
                        if (!package_id) {
                            res.status(400).json({ success: false, msg: "missing package id" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.packageService.getPackageInfoById(+package_id)];
                    case 1:
                        packageInfo = _a.sent();
                        if (packageInfo.length == 0) {
                            res.status(400).json({ success: false, msg: "package not find" });
                            return [2 /*return*/];
                        }
                        item = packageInfo.map(function (packagePlan) { return ({
                            price_data: {
                                currency: "hkd",
                                product_data: {
                                    name: packagePlan.name,
                                },
                                unit_amount: packagePlan.credit * 100,
                            },
                            quantity: 1,
                        }); });
                        return [4 /*yield*/, stripe.checkout.sessions.create({
                                payment_method_types: ["card"],
                                line_items: item,
                                mode: "payment",
                                success_url: "".concat(process.env.FRONTEND_URL, "/payment/success/").concat(package_id),
                                cancel_url: "".concat(process.env.FRONTEND_URL, "/payment/cancel/").concat(package_id),
                            })];
                    case 2:
                        session = _a.sent();
                        res.json({ success: true, session_id: session.id });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addCreditRecord = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, package_id, packageInfo, credit, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user_id = req.user.id;
                        package_id = req.query.package_id;
                        if (!package_id) {
                            res.status(400).json({ success: false, msg: "missing package id" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.packageService.getPackageInfoById(+package_id)];
                    case 1:
                        packageInfo = _a.sent();
                        if (packageInfo.length == 0) {
                            res.status(400).json({ success: false, msg: "package not find" });
                            return [2 /*return*/];
                        }
                        credit = packageInfo[0].credit;
                        return [4 /*yield*/, this.packageService.addCreditRecord(user_id, +package_id, credit)];
                    case 2:
                        _a.sent();
                        res.status(200).json({ success: true, msg: "payment success" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(401).json({
                            msg: "system error",
                            success: false,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return PackageController;
}());
exports.PackageController = PackageController;
//# sourceMappingURL=PackageController.js.map