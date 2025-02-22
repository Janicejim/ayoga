import express from "express";
import { authRoutes } from "./routers/AuthRoutes";
import { userInfoRoutes } from "./routers/UserInfoRoutes";
import { classRoutes } from "./routers/ClassRoutes";
import { isAdminAPI, isLoggedInAPI } from "./utils/guard";
import { creditRoutes } from "./routers/CreditRoutes";
import { teacherRoutes } from "./routers/TeacherRoutes";
import { adminRoutes } from "./routers/AdminRoutes";

export const routes = express.Router();
routes.use("/auth", authRoutes);
routes.use("/user", isLoggedInAPI, userInfoRoutes);
routes.use("/class", classRoutes);
routes.use("/credit", isLoggedInAPI, creditRoutes);
routes.use(teacherRoutes);
routes.use("/admin", isAdminAPI, adminRoutes);
