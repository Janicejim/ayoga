"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posesRoutes = exports.poseService = void 0;
var express_1 = __importDefault(require("express"));
var PosesController_1 = require("../controllers/PosesController");
var db_1 = __importDefault(require("../utils/db"));
var PosesService_1 = require("../services/PosesService");
var guard_1 = require("../utils/guard");
exports.poseService = new PosesService_1.PosesService(db_1.default);
var posesController = new PosesController_1.PosesController(exports.poseService);
exports.posesRoutes = express_1.default.Router();
exports.posesRoutes.get("/", posesController.getPosesItem);
exports.posesRoutes.post("/record", guard_1.isLoggedInAPI, posesController.createPoseRecord);
exports.posesRoutes.get("/record", guard_1.isLoggedInAPI, posesController.getPoseRecord);
exports.posesRoutes.delete("/record", guard_1.isLoggedInAPI, posesController.deletePoseRecord);
//# sourceMappingURL=PosesRoutes.js.map