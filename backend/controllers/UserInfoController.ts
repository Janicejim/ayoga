import { Request, Response } from "express";
import { UserInfoService } from "../services/UserInfoService";
import { form } from "../utils/formidable";
import { checkPassword } from "../utils/hash";

export class UserInfoController {
  constructor(private userInfoService: UserInfoService) { }

  getUserInfoBox = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let userInfoResult = (
        await this.userInfoService.getUserBoxInfo(user_id)
      )[0];
      res.json({ success: true, data: userInfoResult });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getBookingInfo = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let bookingResult = await this.userInfoService.getBooking(user_id);
      res.json({ success: true, data: bookingResult });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getBookmarkInfo = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let bookmarkResult = await this.userInfoService.getBookmark(user_id);
      res.json({ success: true, data: bookmarkResult });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getClassByTeacher = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      if (req.query.teacher_id) {
        user_id = req.query.teacher_id;
      }
      let hostResult = await this.userInfoService.getClassByTeacher(user_id);
      res.json({ success: true, data: hostResult });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getCreditForWithdrawal = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;

      let result = await this.userInfoService.getCreditForWithdrawal(user_id);

      res.json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  WithdrawalCredit = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let { withdrawalAmount, full_name, bank_id, fps_no } = req.body

      if (!withdrawalAmount || !full_name || !bank_id || !fps_no) {
        res.json({ success: false, mgs: "missing info" })
        return
      }
      await this.userInfoService.withdrawalCredit(user_id, +withdrawalAmount, full_name, bank_id, fps_no);

      res.json({ success: true, msg: "withdrawal success" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };


  changeProfilePic = async (req: Request, res: Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const icon = "";
        if (files.hasOwnProperty("icon")) {
          //@ts-ignore
          icon = files.icon.newFilename;
        } else {
          res.json({ success: false, msg: "missing file" })
        }
        let user_id = req.user.id
        await this.userInfoService.updateProfilePic(
          user_id, icon
        );


        res.json({
          success: true,
          msg: "update profile picture successfully"
        });
      } catch (e) {
        console.log(e);
        res.json({ success: false, msg: "system error" });
      }
    });
  };

  editUser = async (req: Request, res: Response) => {

    try {
      const { name, phone } = req.body

      if (!name || !phone) {
        res.json({ success: false, msg: "missing info" });
        return;
      }
      let user_id = req.user.id
      await this.userInfoService.editUser(
        user_id, name, phone
      );

      res.json({
        success: true,
        msg: "update success",

      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, msg: "system error" });
    }

  };

  changePassword = async (req: Request, res: Response) => {

    try {
      const { new_password, confirm_password, old_password } = req.body
      if (!new_password || !confirm_password || !old_password) {
        res.json({ success: false, msg: "missing info" });
        return;
      }

      let user_id = req.user.id
      let passwordInDb = await this.userInfoService.getOldPassword(user_id)

      let checkOldPasswordIsMatch = await checkPassword(old_password, passwordInDb)
      if (!checkOldPasswordIsMatch) {
        res.json({ success: false, msg: "password wrong,can't change" });
        return;
      }

      if (new_password !== confirm_password) {
        res.json({ success: false, msg: "confirm password not match" });
        return;
      }

      await this.userInfoService.changePassword(
        user_id, new_password
      );

      res.json({
        success: true,
        msg: "update success",

      });
    } catch (e) {
      console.log(e);
      res.json({ success: false, msg: "system error" });
    }

  };

}
