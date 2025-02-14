import { Request, Response } from "express";
import { TransactionInfoService } from "../services/TransactionService";

export class TransactionInfoController {
  constructor(private transactionInfoService: TransactionInfoService) { }
  getTransactionInfo = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let transactionInfoResult =
        await this.transactionInfoService.getTransactionInfo(user_id);
      res.json({ success: true, data: transactionInfoResult });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };
  getBanks = async (req: Request, res: Response) => {
    try {
      let data = await this.transactionInfoService.getBanks()

      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };
}
