"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = exports.authService = void 0;
var express_1 = __importDefault(require("express"));
var AuthService_1 = require("../services/AuthService");
var AuthController_1 = require("../controllers/AuthController");
var db_1 = __importDefault(require("../utils/db"));
exports.authService = new AuthService_1.AuthService(db_1.default);
var authController = new AuthController_1.AuthController(exports.authService);
exports.authRoutes = express_1.default.Router();
exports.authRoutes.post("/register", authController.register);
exports.authRoutes.post("/login", authController.login);
//# sourceMappingURL=AuthRoutes.js.map