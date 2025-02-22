import express from "express";
import { CreditController } from "../controllers/CreditController";
import knex from "../utils/db";
import { CreditService } from "../services/CreditService";
import { isLoggedInAPI } from "../utils/guard";
export const creditService = new CreditService(knex);
const creditController = new CreditController(creditService);

export const creditRoutes = express.Router();
creditRoutes.get("/package", creditController.getPackagesInfo);
creditRoutes.post("/stripe", isLoggedInAPI, creditController.stripeSession);
creditRoutes.post("/record", isLoggedInAPI, creditController.addCreditRecord);
creditRoutes.get("/transaction", creditController.getTransactionInfo);
creditRoutes.get("/banks", creditController.getBanks);

