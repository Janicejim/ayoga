import express from "express";
import { CatalogController } from "../controllers/CatalogController";
import knex from "../utils/db";
import { CatalogService } from "../services/CatalogService";

export const catalogService = new CatalogService(knex);
const catalogController = new CatalogController(catalogService);

export const catalogRoutes = express.Router();
catalogRoutes.get("/classes", catalogController.getClassMySearch);
catalogRoutes.get("/yoga/type", catalogController.getYogaType);
