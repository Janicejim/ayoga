import { Request, Response } from "express";
import { CreditService } from "../services/CreditService";
import Stripe from "stripe";
import dotenv from "dotenv";
import { Package } from "../utils/models";
dotenv.config();

export class CreditController {
  constructor(private creditService: CreditService) { }

  getPackagesInfo = async (req: Request, res: Response) => {
    try {
      let packagesResult = await this.creditService.getPackages();
      res.json({ success: true, data: packagesResult });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  stripeSession = async (req: Request, res: Response) => {
    try {
      const stripe = new Stripe(
        `${process.env.STRIPE_SECRET_KEY!}`,
        {
          apiVersion: "2020-08-27",
        }
      );
      const { package_id } = req.query;

      if (!package_id) {
        res.status(400).json({ success: false, msg: "missing package id" });
        return;
      }
      const packageInfo: Package[] = await this.creditService.getPackageInfoById(
        +package_id
      );

      if (packageInfo.length == 0) {
        res.status(400).json({ success: false, msg: "package not find" });
        return;
      }

      let item = packageInfo.map((packagePlan: Package) => ({
        price_data: {
          currency: "hkd",
          product_data: {
            name: packagePlan.name,
          },
          unit_amount: packagePlan.credit * 100,
        },
        quantity: 1,
      }));

      let session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: item,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/payment/success/${package_id}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel/${package_id}`,
      });

      res.json({ success: true, session_id: session.id });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  addCreditRecord = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;

      const { package_id } = req.query;
      if (!package_id) {
        res.status(400).json({ success: false, msg: "missing package id" });
        return;
      }
      const packageInfo: Package[] = await this.creditService.getPackageInfoById(
        +package_id
      );

      if (packageInfo.length == 0) {
        res.status(400).json({ success: false, msg: "package not find" });
        return;
      }

      const credit = packageInfo[0].credit;
      await this.creditService.addCreditRecord(user_id, +package_id, credit);
      res.status(200).json({ success: true, msg: "payment success" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getTransactionInfo = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id;
      let transactionInfoResult =
        await this.creditService.getTransactionInfo(user_id);
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
      let data = await this.creditService.getBanks()

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
