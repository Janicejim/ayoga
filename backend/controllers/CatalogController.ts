import { Bearer } from "permit";
import { CatalogService } from "../services/CatalogService";
import { Request, Response } from "express";
import jwt from "../utils/jwt";
import jwtSimple from "jwt-simple";

export class CatalogController {
  constructor(private catalogService: CatalogService) { }

  public getClassMySearch = async (req: Request, res: Response) => {
    try {
      const {
        date,
        start_time,
        instructor,
        venue,
        title,
        type,
        yogaType,
        credit,
        language,
      } = req.query || "";

      const permit = new Bearer({
        query: "access_token",
      });
      const token = permit.check(req);

      let payload;
      let user_id;
      if (token !== "null") {
        payload = jwtSimple.decode(token, jwt.jwtSecret);
        user_id = payload.userId;
      } else {
        user_id = 0;
      }

      let classesData = await this.catalogService.getClassMySearch(
        date!.toString(),
        start_time!.toString(),
        instructor!.toString(),
        venue!.toString(),
        title!.toString(),
        type!.toString(),
        yogaType!.toString(),
        +credit!,
        language!.toString(),
        +user_id
      );
      res.json({
        data: classesData,
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

  public getYogaType = async (req: Request, res: Response) => {
    try {
      let yogaTypeData = await this.catalogService.getYogaType();
      res.json({
        data: yogaTypeData,
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
