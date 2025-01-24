import express from "express";
import knex from "../utils/db";
import { AdminService } from "../services/AdminService";
import { AdminController } from "../controllers/AdminController";

export const adminService = new AdminService(knex);
const adminController = new AdminController(adminService);

export const adminRoutes = express.Router();

adminRoutes.get("/users", adminController.getUser);
adminRoutes.patch("/user/role", adminController.updateUserRole);

adminRoutes.get("/teacher/request", adminController.getTeacherRequests);
adminRoutes.post(
  "/reply/request",

  adminController.replyTeacherRequests
);

adminRoutes.get("/uncomment", adminController.getUnCommentStudentSummary);
adminRoutes.post(
  "/uncomment/email",
  adminController.sendEmailToUnCommentStudent
);
//to do:
adminRoutes.get("/company/financial", adminController.getCompanyFinancialData);
