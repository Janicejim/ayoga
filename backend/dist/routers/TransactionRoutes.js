"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionInfoRoutes = exports.transactionInfoService = void 0;
var express_1 = __importDefault(require("express"));
var TransactionController_1 = require("../controllers/TransactionController");
var db_1 = __importDefault(require("../utils/db"));
var TransactionService_1 = require("../services/TransactionService");
exports.transactionInfoService = new TransactionService_1.TransactionInfoService(db_1.default);
var transactionInfoController = new TransactionController_1.TransactionInfoController(exports.transactionInfoService);
exports.transactionInfoRoutes = express_1.default.Router();
exports.transactionInfoRoutes.get("/", transactionInfoController.getTransactionInfo);
//# sourceMappingURL=TransactionRoutes.js.map