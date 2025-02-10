"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRoutes = exports.teacherService = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../utils/db"));
var TeacherController_1 = require("../controllers/TeacherController");
var TeacherService_1 = require("../services/TeacherService");
var guard_1 = require("../utils/guard");
exports.teacherService = new TeacherService_1.TeacherService(db_1.default);
var teacherController = new TeacherController_1.TeacherController(exports.teacherService);
exports.teacherRoutes = express_1.default.Router();
exports.teacherRoutes.post("/teacher/apply", guard_1.isLoggedInAPI, teacherController.applyTeacherRole);
exports.teacherRoutes.post("/teacher/class", guard_1.isTeacherAPI, teacherController.createClass);
exports.teacherRoutes.get("/teacher/info", teacherController.getTeacherInfoAndComment);
exports.teacherRoutes.get("/teacher/information", guard_1.isLoggedInAPI, teacherController.getTeacherInfo);
exports.teacherRoutes.get("/schedule", guard_1.isTeacherAPI, teacherController.getTeacherSchedule);
exports.teacherRoutes.get("/student/list", guard_1.isTeacherAPI, teacherController.getStudentList);
exports.teacherRoutes.get("/teacher/revenue", guard_1.isTeacherAPI, teacherController.getRevenueData);
exports.teacherRoutes.patch("/teacher/info", guard_1.isTeacherAPI, teacherController.editTeacherInfo);
exports.teacherRoutes.get("/teachers", teacherController.getTeachers);
exports.teacherRoutes.get("/comments", teacherController.getHighScoreComment);
//# sourceMappingURL=TeacherRoutes.js.map