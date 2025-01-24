import express from "express";
import { PackageController } from "../controllers/PackageController";
import knex from "../utils/db";
import { PackageService } from "../services/PackageService";
import { isLoggedInAPI } from "../utils/guard";
export const packageService = new PackageService(knex);
const packageController = new PackageController(packageService);

export const packageRoutes = express.Router();
packageRoutes.get("/package", packageController.getPackagesInfo);
packageRoutes.post("/stripe", isLoggedInAPI, packageController.stripeSession);
packageRoutes.post("/record", isLoggedInAPI, packageController.addCreditRecord);
