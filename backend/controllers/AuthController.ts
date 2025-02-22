import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { checkPassword } from "../utils/hash";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";
import dotenv from "dotenv";
import { createFormidableS3Form } from "../utils/formidable";
dotenv.config();

export class AuthController {
  constructor(private authService: AuthService) { }

  register = async (req: Request, res: Response) => {
    const form = createFormidableS3Form()
    form.parse(req, async (err, fields, files) => {
      try {
        const { name, email, password, confirmPw, phone } = fields;
        let icon = "";
        if (files.hasOwnProperty("icon")) {
          const iconFile = files.icon;
          if (Array.isArray(iconFile)) {
            icon = iconFile[0].newFilename;
          } else {
            icon = iconFile.newFilename;
          }
        }

        if (!name) {
          res.json({ success: false, msg: "Please fill in name" });
          return;
        }
        if (!email) {
          res.json({ success: false, msg: "Please fill in email" });
          return;
        }
        if (!password) {
          res.json({ success: false, msg: "Please fill in password" });
          return;
        }
        if (!phone) {
          res.json({ success: false, msg: "Please fill in phone" });
          return;
        }
        if (confirmPw != password) {
          res.json({ success: false, msg: "Please confirm password" });
          return;
        }
        let foundEmail = await this.authService.getUserByEmail(
          email.toString()
        );

        if (foundEmail) {
          res.json({ success: false, msg: "Email already registered" });
          return;
        }
        let foundPhone = await this.authService.getUserByPhone(
          phone.toString()
        );
        if (foundPhone) {
          res.json({ success: false, msg: "Phone number already registered" });
          return;
        }

        const userId = await this.authService.register(
          name.toString(),
          email.toString(),
          password.toString(),
          icon,
          phone.toString()
        );

        const payload = { userId, email, role: "user" };
        const token = jwtSimple.encode(payload, jwt.jwtSecret!);
        res.json({
          success: true,
          msg: "register success",
          token: token,
          name,
          icon,
        });
      } catch (e) {
        console.log(e);
        res.json({ success: false, msg: "system error" });
      }
    });
  };

  public login = async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        res.json({ success: false, msg: "please fill in data" });
        return;
      }
      let user = await this.authService.getUserByEmail(email);

      if (!user) {
        res.json({ success: false, msg: "No such user" });
        return;
      }

      let validPassword = await checkPassword(password, user.password);
      if (!validPassword) {
        res.json({ success: false, msg: "Incorrect password or email" });
        return;
      }
      let payload = { userId: user.id, email: user.email, role: user.role };
      let token = jwtSimple.encode(payload, jwt.jwtSecret!);
      res.json({
        success: true,
        msg: "Login success",
        token,
        name: user.name,
        icon: user.icon,
      });
      return;
    } catch (e) {
      console.log(e);
      res.status(500).json("System error");
    }
  };


}
