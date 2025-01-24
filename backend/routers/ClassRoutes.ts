import express from "express";
import knex from "../utils/db";
import { ClassController } from "../controllers/ClassController";
import { ClassService } from "../services/ClassService";
import { isLoggedInAPI } from "../utils/guard";
const classService = new ClassService(knex);
export const classController = new ClassController(classService);

export const classRoutes = express.Router();

classRoutes.get("/details/:classId", classController.getClassDetailsById);
classRoutes.get("/status/:classId", isLoggedInAPI, classController.getUserTypeOfClass)
classRoutes.get(
  "/bookmark/:classId",
  isLoggedInAPI,
  classController.checkBookmarked
);
classRoutes.get(
  "/booking/:classId",
  isLoggedInAPI,
  classController.checkIsBooked
);
classRoutes.get(
  "/teacher/:teacherId",
  classController.getInstructorOtherClasses
);
classRoutes.post(
  "/bookmark/:classId",
  isLoggedInAPI,
  classController.addBookmarked
);

classRoutes.delete(
  "/bookmark/:classId",
  isLoggedInAPI,
  classController.deleteBookmarked
);

classRoutes.post(
  "/reserve/:classId",
  isLoggedInAPI,
  classController.reserveSeat
);

classRoutes.put(
  "/booking/:classId",
  isLoggedInAPI,
  classController.cancelReserveSeat
);

classRoutes.get(
  "/comment/:classId",
  isLoggedInAPI,
  classController.getStudentCommentByClassId
);

classRoutes.post(
  "/comment/:classId",
  isLoggedInAPI,
  classController.studentGiveCommentByClassId
);

classRoutes.put(
  "/comment/:id",
  isLoggedInAPI,
  classController.studentEditCommentByCommentId
);
