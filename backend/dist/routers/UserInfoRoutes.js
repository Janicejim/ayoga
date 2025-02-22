"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfoRoutes = exports.userInfoService = void 0;
var express_1 = __importDefault(require("express"));
var UserInfoController_1 = require("../controllers/UserInfoController");
var db_1 = __importDefault(require("../utils/db"));
var UserInfoService_1 = require("../services/UserInfoService");
exports.userInfoService = new UserInfoService_1.UserInfoService(db_1.default);
var userInfoController = new UserInfoController_1.UserInfoController(exports.userInfoService);
exports.userInfoRoutes = express_1.default.Router();
exports.userInfoRoutes.get("/profile", userInfoController.getUserInfoBox);
exports.userInfoRoutes.get("/booked", userInfoController.getBookedInfo);
exports.userInfoRoutes.get("/bookmark", userInfoController.getBookmarkInfo);
exports.userInfoRoutes.get("/host", userInfoController.getClassByTeacher);
exports.userInfoRoutes.get("/credit", userInfoController.getCreditForWithdrawal);
exports.userInfoRoutes.post("/withdrawal", userInfoController.WithdrawalCredit);
exports.userInfoRoutes.patch("/profile/pic", userInfoController.changeProfilePic);
exports.userInfoRoutes.patch("/profile", userInfoController.editUser);
exports.userInfoRoutes.patch("/password", userInfoController.changePassword);
exports.userInfoRoutes.get("/poses", userInfoController.getPosesItem);
//# sourceMappingURL=UserInfoRoutes.js.map