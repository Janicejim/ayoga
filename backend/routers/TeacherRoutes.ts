import express from "express";
import knex from "../utils/db";
import { TeacherController } from "../controllers/TeacherController";
import { TeacherService } from "../services/TeacherService";
import { isLoggedInAPI, isTeacherAPI } from "../utils/guard";

export const teacherService = new TeacherService(knex);
const teacherController = new TeacherController(teacherService);

export const teacherRoutes = express.Router();
teacherRoutes.post("/teacher/apply", isLoggedInAPI, teacherController.applyTeacherRole);
teacherRoutes.post("/teacher/class", isTeacherAPI, teacherController.createClass);
teacherRoutes.get("/teacher/info", teacherController.getTeacherInfoAndComment);
teacherRoutes.get("/teacher/information", isLoggedInAPI, teacherController.getTeacherInfo);
teacherRoutes.get("/schedule", isTeacherAPI, teacherController.getTeacherSchedule);
teacherRoutes.get("/student/list", isTeacherAPI, teacherController.getStudentList);
teacherRoutes.get("/teacher/revenue", isTeacherAPI, teacherController.getRevenueData);
teacherRoutes.patch("/teacher/info", isTeacherAPI, teacherController.editTeacherInfo);
teacherRoutes.get("/teachers", teacherController.getTeachers);
teacherRoutes.get("/comments", teacherController.getHighScoreComment);