import express from "express";
import { TransactionInfoController } from "../controllers/TransactionController";
import knex from "../utils/db";
import { TransactionInfoService } from "../services/TransactionService";
export const transactionInfoService = new TransactionInfoService(knex);
const transactionInfoController = new TransactionInfoController(
  transactionInfoService
);

export const transactionInfoRoutes = express.Router();
transactionInfoRoutes.get(
  "/",

  transactionInfoController.getTransactionInfo
);

transactionInfoRoutes.get(
  "/banks",

  transactionInfoController.getBanks
);

