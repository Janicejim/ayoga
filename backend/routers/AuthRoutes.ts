import express from "express";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";
import knex from "../utils/db";

export const authService = new AuthService(knex);
const authController = new AuthController(authService);

export const authRoutes = express.Router();
authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login); //localhost:8080/api/users/login [POST]
authRoutes.post("/loginFacebook", authController.loginFacebook); //localhost:8080/api/users/loginFacebook [POST]
authRoutes.post("/loginGoogle", authController.loginGoogle); //localhost:8080/api/users/loginGoogle [GET]
