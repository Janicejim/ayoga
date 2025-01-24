import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { checkPassword } from "../utils/hash";
import { OAuth2Client } from "google-auth-library";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";
import { logger } from "../utils/logger";
import { form } from "../utils/formidable";
import dotenv from "dotenv";
dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const { name, email, password, confirmPw, phone } = fields;
        const icon = "";
        if (files.hasOwnProperty("icon")) {
          //@ts-ignore
          icon = files.icon.newFilename;
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
        const token = jwtSimple.encode(payload, jwt.jwtSecret);
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
      let token = jwtSimple.encode(payload, jwt.jwtSecret);
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

  public loginFacebook = async (req: Request, res: Response) => {
    try {
      let accessToken = req.body.accessToken;
      if (!accessToken) {
        res.status(401).json({ message: "Wrong Access Token!" });
        return;
      }
      let url = `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`;
      let fetchRes = await fetch(url);

      let fetchResult = await fetchRes.json();
      // console.log(`fetchResult`, fetchResult);

      let email = fetchResult.email;

      let user = await this.authService.getUserByEmail(email);
      // console.log(`found fb user`, user);

      let foundEmail = user ? user : "";
      if (!foundEmail) {
        await this.authService.register(
          fetchResult.name,
          email,
          "22334",
          fetchResult.picture.data.url,
          ""
        );

        user = await await this.authService.getUserByEmail(email!);
        // console.log(`found fb user`, user);
      }

      let payload = { userId: user.id, email: user.email };
      // console.log(`payload`, payload);
      let jwttoken = jwtSimple.encode(payload, jwt.jwtSecret);
      // console.log(`jwttoken`, jwttoken);

      res.json({
        message: "Facebook Login success",
        accessToken: accessToken,
        jwttoken: jwttoken,
      });
      return;
    } catch (e) {
      console.log(e);
      logger.error(`${e.message}`);
      res.status(500).json({ message: e });
      return;
    }
  };

  public loginGoogle = async (req: Request, res: Response) => {
    try {
      let { token } = req.body;
      // console.log(`token in controller`, token);

      let ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });

      let payloadResult = ticket.getPayload();
      // console.log(`payloadResult`, payloadResult);

      if (payloadResult) {
        let email = payloadResult ? payloadResult["email"] : "";
        let name = payloadResult ? payloadResult["name"] : "";
        let image = payloadResult ? payloadResult["picture"] : "";

        let user = await this.authService.getUserByEmail(email!);
        // console.log(`Found google user`, user);

        if (!user) {
          await this.authService.register(name!, email!, "1234", image!, "");
          user = await await this.authService.getUserByEmail(email!);
          // console.log(`Found google user`, user);
        }

        let payload = { userId: user.id, email: user.email };
        console.log(`payload`, payload);

        let jwttoken = jwtSimple.encode(payload, jwt.jwtSecret);
        // console.log(`jwttoken`, jwttoken);

        res.json({
          message: "Google Login success",
          jwttoken: jwttoken,
          token: token,
        });

        if (!token) {
          res.status(401).json({ message: "NO Google Access Token!" });
          return;
        }
      }
      return;
    } catch (e) {
      console.log(e);
      logger.error(`${e.message}`);
      res.status(500).json({ message: e });
      return;
    }
  };
}
