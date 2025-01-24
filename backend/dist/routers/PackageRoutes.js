"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageRoutes = exports.packageService = void 0;
var express_1 = __importDefault(require("express"));
var PackageController_1 = require("../controllers/PackageController");
var db_1 = __importDefault(require("../utils/db"));
var PackageService_1 = require("../services/PackageService");
var guard_1 = require("../utils/guard");
exports.packageService = new PackageService_1.PackageService(db_1.default);
var packageController = new PackageController_1.PackageController(exports.packageService);
exports.packageRoutes = express_1.default.Router();
exports.packageRoutes.get("/package", packageController.getPackagesInfo);
exports.packageRoutes.post("/stripe", guard_1.isLoggedInAPI, packageController.stripeSession);
exports.packageRoutes.post("/record", guard_1.isLoggedInAPI, packageController.addCreditRecord);
//# sourceMappingURL=PackageRoutes.js.map