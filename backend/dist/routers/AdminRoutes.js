"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = exports.adminService = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../utils/db"));
var AdminService_1 = require("../services/AdminService");
var AdminController_1 = require("../controllers/AdminController");
exports.adminService = new AdminService_1.AdminService(db_1.default);
var adminController = new AdminController_1.AdminController(exports.adminService);
exports.adminRoutes = express_1.default.Router();
exports.adminRoutes.get("/users", adminController.getUser);
exports.adminRoutes.patch("/user/role", adminController.updateUserRole);
exports.adminRoutes.get("/teacher/request", adminController.getTeacherRequests);
exports.adminRoutes.post("/reply/request", adminController.replyTeacherRequests);
exports.adminRoutes.get("/transactions", adminController.getTransactions);
exports.adminRoutes.put("/transactions", adminController.refundCaseHandle);
//# sourceMappingURL=AdminRoutes.js.map