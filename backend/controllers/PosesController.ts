import { Request, Response } from "express";
import { PosesService } from "../services/PosesService";

export class PosesController {
  constructor(private posesService: PosesService) {}

  getPosesItem = async (req: Request, res: Response) => {
    try {
      let poseResult = await this.posesService.getPosesItems();
      res.json({ success: true, data: poseResult });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  createPoseRecord = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let { accuracy, pose_id } = req.query;
      if (!user_id || !accuracy || !pose_id) {
        res.json({ success: false, msg: "missing info" });
        return;
      }
      await this.posesService.createPoseRecord(user_id, +accuracy, +pose_id);
      res.json({ success: true, msg: "Your pose record has been saved" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getPoseRecord = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let allRecordData = await this.posesService.getAllPoseRecord(user_id);

      let summaryData = await this.posesService.getPoseRecordSummary(user_id);
      res.json({ success: true, allRecordData, summaryData });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  deletePoseRecord = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let { id } = req.query;
      if (!user_id || !id) {
        res.json({ success: false, msg: "missing info" });
        return;
      }
      await this.posesService.deletePoseRecord(+id);
      res.json({ success: true, msg: "Delete record successfully" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };
}
