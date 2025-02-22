import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";
import sendEmail from "../utils/nodemailer";

export class AdminController {
  constructor(private adminService: AdminService) { }

  getUser = async (req: Request, res: Response) => {
    try {
      let data;

      if (req.query.hasOwnProperty("keyword")) {
        data = await this.adminService.getUserByKeyword(
          req.query.keyword!.toString()
        );
      } else {
        data = await this.adminService.getAllUsers();
      }

      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getTeacherRequests = async (req: Request, res: Response) => {
    try {
      let data = await this.adminService.getTeacherRequests();
      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  replyTeacherRequests = async (req: Request, res: Response) => {
    try {
      let { requestId } = req.query;
      let { status, remark } = req.body;
      if (!requestId) {
        res.json({ success: false, msg: "missing query" });
        return;
      }
      if (!status) {
        res.json({ success: false, msg: "missing status in body" });
        return;
      }
      let user = await this.adminService.getUserEmailById(+requestId);
      if (status == "accept") {
        await this.adminService.acceptTeacherRequests(+requestId);
        await this.adminService.updateUserRole(+requestId, "teacher");
        await sendEmail(
          user[0].email,
          "Ayoga: Apply Teacher Role Success",
          `You request for apply teacher role is success. Please logout and login again to reload the new role setting: ${process.env.FRONTEND_URL}. Thanks!`
        );
        res.json({
          success: true,
          msg: "Accept teacher request success and email has been send to user",
        });
      } else {
        if (!remark) {
          res.json({ success: false, msg: "missing remark in body" });
          return;
        }
        await this.adminService.rejectTeacherRequests(+requestId, remark);

        await sendEmail(
          user[0].email,
          "Reject Teacher Role Request",
          `Sorry that your request is reject by admin because of below reason:${remark}`
        );
        res.json({
          success: true,
          msg: "Reject teacher request success and reject email has been send to user",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  updateUserRole = async (req: Request, res: Response) => {
    try {
      let { user_id, role } = req.query;
      if (!user_id || !role) {
        res.json({ success: false, msg: "missing query" });
        return;
      }
      await this.adminService.updateUserRole(+user_id, role.toString());
      res.json({ success: true, msg: "update role success" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getTransactions = async (req: Request, res: Response) => {
    try {
      let data;

      if (req.query.hasOwnProperty("keyword")) {
        data = await this.adminService.getTransactionByKeyword(
          req.query.keyword!.toString()
        );
      } else {
        data = await this.adminService.getTransactions();
      }
      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };
  //To do:
  refundCaseHandle = async (req: Request, res: Response) => {
    try {
      const { user_id, class_id } = req.body
      const creditRecordsRelated = await this.adminService.checkCreditRecords(
        class_id,
        user_id
      );
      await this.adminService.refundCaseHandle(
        [creditRecordsRelated.useCreditRecord, creditRecordsRelated.earnCreditRecord],
        class_id, user_id
      );
      res.status(200).json({
        matchesGlob: `Refund success`,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

}
