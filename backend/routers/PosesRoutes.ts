import express from "express";
import { PosesController } from "../controllers/PosesController";
import knex from "../utils/db";
import { PosesService } from "../services/PosesService";
import { isLoggedInAPI } from "../utils/guard";

export const poseService = new PosesService(knex);
const posesController = new PosesController(poseService);

export const posesRoutes = express.Router();
posesRoutes.get("/", posesController.getPosesItem);
posesRoutes.post("/record", isLoggedInAPI, posesController.createPoseRecord);
posesRoutes.get("/record", isLoggedInAPI, posesController.getPoseRecord);
posesRoutes.delete("/record", isLoggedInAPI, posesController.deletePoseRecord);
