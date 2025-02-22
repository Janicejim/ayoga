import express from "express";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import jwt from "./jwt";
import { authService } from "../routers/AuthRoutes";
const permit = new Bearer({
  query: "access_token"
});

export async function isLoggedInAPI(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);

    if (!token) {
      res.status(401).json({ message: "Permission denied" });
      return;
    }

    const payload = jwtSimple.decode(token, jwt.jwtSecret!);

    const userId = payload.userId;

    const user = await authService.getUserById(userId);


    if (!user) {
      res
        .status(401)
        .json({ message: "Permission Denied:Can't find the user" });
      return;
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "system error" });
  }
}

export async function isAdminAPI(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);

    if (!token) {
      res.status(401).json({ message: "Permission denied" });
      return;
    }

    const payload = jwtSimple.decode(token, jwt.jwtSecret!);

    const userId = payload.userId;

    const user = await authService.getUserById(userId);

    if (!user) {
      res
        .status(401)
        .json({ success: false, msg: "Permission Denied:Can't find the user" });
      return;
    }
    if (user.role !== "admin") {
      res.status(401).json({ success: false, msg: "Admin only" });
      return;
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ success: false, msg: "system error" });
  }
}

export async function isTeacherAPI(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);

    if (!token) {
      res.status(401).json({ message: "Permission denied" });
      return;
    }

    const payload = jwtSimple.decode(token, jwt.jwtSecret!);

    const userId = payload.userId;

    const user = await authService.getUserById(userId);

    if (!user) {
      res
        .status(401)
        .json({ success: false, msg: "Permission Denied:Can't find the user" });
      return;
    }
    if (user.role !== "teacher") {
      res.status(401).json({ success: false, msg: "Admin only" });
      return;
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ success: false, msg: "system error" });
  }
}
