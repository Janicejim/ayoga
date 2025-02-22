import express from "express";
import { UserInfoController } from "../controllers/UserInfoController";
import knex from "../utils/db";
import { UserInfoService } from "../services/UserInfoService";
export const userInfoService = new UserInfoService(knex);
const userInfoController = new UserInfoController(userInfoService);

export const userInfoRoutes = express.Router();
userInfoRoutes.get("/profile", userInfoController.getUserInfoBox);
userInfoRoutes.get("/booked", userInfoController.getBookedInfo);
userInfoRoutes.get("/bookmark", userInfoController.getBookmarkInfo);
userInfoRoutes.get("/host", userInfoController.getClassByTeacher);
userInfoRoutes.get("/credit", userInfoController.getCreditForWithdrawal);
userInfoRoutes.post("/withdrawal", userInfoController.WithdrawalCredit);
userInfoRoutes.patch("/profile/pic", userInfoController.changeProfilePic);
userInfoRoutes.patch("/profile", userInfoController.editUser);
userInfoRoutes.patch("/password", userInfoController.changePassword);
userInfoRoutes.get("/poses", userInfoController.getPosesItem);