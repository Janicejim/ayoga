"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditRoutes = exports.creditService = void 0;
var express_1 = __importDefault(require("express"));
var CreditController_1 = require("../controllers/CreditController");
var db_1 = __importDefault(require("../utils/db"));
var CreditService_1 = require("../services/CreditService");
var guard_1 = require("../utils/guard");
exports.creditService = new CreditService_1.CreditService(db_1.default);
var creditController = new CreditController_1.CreditController(exports.creditService);
exports.creditRoutes = express_1.default.Router();
exports.creditRoutes.get("/package", creditController.getPackagesInfo);
exports.creditRoutes.post("/stripe", guard_1.isLoggedInAPI, creditController.stripeSession);
exports.creditRoutes.post("/record", guard_1.isLoggedInAPI, creditController.addCreditRecord);
exports.creditRoutes.get("/transaction", creditController.getTransactionInfo);
exports.creditRoutes.get("/banks", creditController.getBanks);
//# sourceMappingURL=CreditRoutes.js.map