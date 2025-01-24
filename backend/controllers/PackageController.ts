import { Request, Response } from "express";
import { PackageService } from "../services/PackageService";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
// console.log("permit", permit);

export class PackageController {
  constructor(private packageService: PackageService) { }

  getPackagesInfo = async (req: Request, res: Response) => {
    try {
      let packagesResult = await this.packageService.getPackages();
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
        "sk_test_51OyVywIy2oxzbVAMLnbTXoH2GyOg1M4H9mUB2Tl8FAIwnJu6tMIuGgcsumIhp95olp44BOJq8hsfU8Gv76w12L3H00fJVRYKu6",
        {
          apiVersion: "2020-08-27",
        }
      );
      const { package_id } = req.query;

      if (!package_id) {
        res.status(400).json({ success: false, msg: "missing package id" });
        return;
      }
      const packageInfo: any = await this.packageService.getPackageInfoById(
        +package_id
      );

      if (packageInfo.length == 0) {
        res.status(400).json({ success: false, msg: "package not find" });
        return;
      }

      let item = packageInfo.map((packagePlan: any) => ({
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
      const packageInfo: any = await this.packageService.getPackageInfoById(
        +package_id
      );

      if (packageInfo.length == 0) {
        res.status(400).json({ success: false, msg: "package not find" });
        return;
      }

      const credit = packageInfo[0].credit;
      await this.packageService.addCreditRecord(user_id, +package_id, credit);
      res.status(200).json({ success: true, msg: "payment success" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };
}
