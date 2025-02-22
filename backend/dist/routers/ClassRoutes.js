"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRoutes = exports.classController = void 0;
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("../utils/db"));
var ClassController_1 = require("../controllers/ClassController");
var ClassService_1 = require("../services/ClassService");
var guard_1 = require("../utils/guard");
var classService = new ClassService_1.ClassService(db_1.default);
exports.classController = new ClassController_1.ClassController(classService);
exports.classRoutes = express_1.default.Router();
exports.classRoutes.get("/details/:classId", exports.classController.getClassDetailsById);
exports.classRoutes.get("/status/:classId", guard_1.isLoggedInAPI, exports.classController.getUserTypeOfClass);
exports.classRoutes.get("/bookmark/:classId", guard_1.isLoggedInAPI, exports.classController.checkBookmarked);
exports.classRoutes.get("/booking/:classId", guard_1.isLoggedInAPI, exports.classController.checkIsBooked);
exports.classRoutes.get("/teacher/:teacherId", exports.classController.getInstructorOtherClasses);
exports.classRoutes.post("/bookmark/:classId", guard_1.isLoggedInAPI, exports.classController.addBookmarked);
exports.classRoutes.delete("/bookmark/:classId", guard_1.isLoggedInAPI, exports.classController.deleteBookmarked);
exports.classRoutes.post("/reserve/:classId", guard_1.isLoggedInAPI, exports.classController.reserveSeat);
exports.classRoutes.put("/booking/:classId", guard_1.isLoggedInAPI, exports.classController.cancelReserveSeat);
exports.classRoutes.get("/comment/:classId", guard_1.isLoggedInAPI, exports.classController.getStudentCommentByClassId);
exports.classRoutes.post("/comment/:classId", guard_1.isLoggedInAPI, exports.classController.studentGiveCommentByClassId);
exports.classRoutes.put("/comment/:id", guard_1.isLoggedInAPI, exports.classController.studentEditCommentByCommentId);
exports.classRoutes.get("/", exports.classController.getClassMySearch);
exports.classRoutes.get("/yoga/type", exports.classController.getYogaType);
//# sourceMappingURL=ClassRoutes.js.map