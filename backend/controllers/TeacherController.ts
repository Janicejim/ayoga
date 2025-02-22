import { TeacherService } from "../services/TeacherService";
import { Request, Response } from "express";
import { createFormidableS3Form } from "../utils/formidable";
export class TeacherController {
  constructor(private teacherService: TeacherService) { }

  applyTeacherRole = async (req: Request, res: Response) => {
    const form = createFormidableS3Form()
    form.parse(req, async (err, fields, files) => {
      try {
        let user_id = req.user.id;
        let { sex, introduction, newest_qualification } = fields;




        let photo = Array.isArray(files.photo) ? files.photo[0].newFilename : files.photo.newFilename;


        let id_photo = Array.isArray(files.id_photo) ? files.id_photo[0].newFilename : files.id_photo.newFilename;


        let cert = Array.isArray(files.cert) ? files.cert[0].newFilename : files.cert.newFilename;

        if (
          !sex ||
          !introduction ||
          !newest_qualification ||
          !photo ||
          !id_photo ||
          !cert
        ) {
          res.json({ success: false, msg: "missing info" });
          return;
        }
        await this.teacherService.applyTeacherRole(
          user_id,
          sex.toString(),
          introduction.toString(),
          newest_qualification.toString(),
          photo,
          id_photo,
          cert
        );
        res.json({
          success: true,
          msg: "Your request is sent,our admin will handle your request as soon as possible. Result will send by email!",
        });
      } catch (error) {
        console.log(error);
        res.status(401).json({
          msg: "system error",
          success: false,
        });
      }
    });
  };

  createClass = async (req: Request, res: Response) => {
    const form = createFormidableS3Form()
    form.parse(req, async (err, fields, files) => {
      try {
        let teacher_id = req.user.id;

        const {
          name,
          capacity,
          language,
          credit,
          date,
          start_time,
          end_time,
          type,
          yoga_type,
          introduction,
        } = fields;

        const file = Array.isArray(files.image) ? files.image[0].newFilename : files.image.newFilename;

        if (+capacity < 0 && +capacity > 20) {
          res.json({
            success: false,
            msg: "Class size has to be under 20 students",
          });
          return;
        }
        if (
          !name ||
          !date ||
          !capacity ||
          !language ||
          !credit ||
          !start_time ||
          !end_time
        ) {
          res.json({
            success: false,
            msg: "Please fill in missing column",
          });
          return;
        }
        let venue = "";
        let venue_point_lat = "";
        let venue_point_lng = "";
        if (type == "offline") {
          venue = fields.venue.toString();
          venue_point_lat = fields.venue_point_lat.toString();
          venue_point_lng = fields.venue_point_lng.toString();
          if (!venue || !venue_point_lat || !venue_point_lng) {
            res.json({
              success: false,
              msg: "Please fill in missing column",
            });
            return;
          }
        }

        await this.teacherService.createClass(
          name.toString(),
          venue.toString(),
          +capacity,
          language.toString(),
          +credit,
          date.toString(),
          start_time.toString(),
          end_time.toString(),
          +teacher_id,
          file.toString(),
          venue_point_lat,
          venue_point_lng,
          type.toString(),
          +yoga_type,
          introduction.toString()
        );

        res.json({
          success: true,
          msg: "class created",
          // token: token,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          msg: "system error",
          success: false,
        });
      }
    });
  };

  getStudentList = async (req: Request, res: Response) => {
    try {
      let { class_id } = req.query;
      let userId = req.user.id
      if (!class_id) {
        res.json({ success: false, msg: "missing query" });
        return;
      }

      //check is creator of this class:
      let isCreatorResult = await this.teacherService.checkIsCreatorOfClass(+class_id, userId)
      if (isCreatorResult.length < 1) {
        res.json({ success: false, msg: "Only class creator can see the student list" });
      } else {
        let data = await this.teacherService.getStudentList(+class_id);
        res.json({ success: true, data });
      }


    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };


  getTeacherSchedule = async (req: Request, res: Response) => {
    try {
      let teacher_id = req.user.id;
      let data = await this.teacherService.getTeacherSchedule(teacher_id);
      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };




  editClassInfo = (req: Request, res: Response) => {
    const form = createFormidableS3Form()
    form.parse(req, async (err, fields, files) => {
      try {
        let { class_id } = req.query;
        if (!class_id) {
          res.json({ success: false, msg: "missing query" });
          return;
        }
        let result =
          await this.teacherService.checkWhetherTheClassHaveStudentJoin(
            +class_id
          );
        if (result.length > 0) {
          res.json({ success: false, msg: "Have Student Attend, can't edit" });
          return;
        }
        const {
          name,
          capacity,
          language,
          credit,
          date,
          start_time,
          end_time,
          type,
          yoga_type,
          introduction,
        } = fields;

        let image = "";

        if (files.hasOwnProperty("image")) {
          image = Array.isArray(files.image) ? files.image[0].newFilename : files.image.newFilename;
        }

        if (
          !name ||
          !date ||
          !capacity ||
          !language ||
          !credit ||
          !start_time ||
          !end_time ||
          !yoga_type ||
          !introduction
        ) {
          res.json({
            success: false,
            msg: "Please fill in missing column",
          });
          return;
        }
        let venue = "";
        let venue_point_lat = "";
        let venue_point_lng = "";
        if (type == "offline") {
          venue = fields.venue.toString();
          venue_point_lat = fields.venue_point_lat.toString();
          venue_point_lng = fields.venue_point_lng.toString();
          if (!venue || !venue_point_lat || !venue_point_lng) {
            res.json({
              success: false,
              msg: "Please fill in missing column",
            });
            return;
          }
        }
        await this.teacherService.editClassInfo(
          +class_id,
          name.toString(),
          venue.toString(),
          +capacity,
          language.toString(),
          +credit,
          date.toString(),
          start_time.toString(),
          end_time.toString(),
          image.toString(),
          venue_point_lat,
          venue_point_lng,
          type.toString(),
          +yoga_type,
          introduction.toString()
        );
        res.json({ success: true, msg: "edit class success" });
      } catch (error) {
        console.log(error);
        res.status(401).json({
          msg: "system error",
          success: false,
        });
      }
    });
  };

  getTeacherInfoAndComment = async (req: Request, res: Response) => {
    try {
      let { teacher_id } = req.query;
      if (!teacher_id) {
        res.json({ success: false, msg: "missing query" });
        return;
      }
      let data = await this.teacherService.getTeacherInfoAndComment(
        +teacher_id
      );
      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getTeacherInfo = async (req: Request, res: Response) => {
    try {
      let user_id = req.user.id
      let data = await this.teacherService.getTeacherInfo(
        user_id
      );
      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getRevenueData = async (req: Request, res: Response) => {
    try {
      let userId = req.user.id
      let data = await this.teacherService.getTeacherRevenueData(userId)
      res.json({ success: true, data })
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  editTeacherInfo = async (req: Request, res: Response) => {
    try {
      let userId = req.user.id
      let { introduction, newest_qualification } = req.body
      if (!introduction || !newest_qualification) {
        res.json({
          success: false,
          msg: "missing info",
        });
        return;
      }
      let data = await this.teacherService.editTeacherInfo(userId, introduction, newest_qualification)
      res.json({ success: true, data })
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };


  getTeachers = async (req: Request, res: Response) => {
    try {

      let data = await this.teacherService.getTeachers(
      );
      res.json({ success: true, data });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  getHighScoreComment = async (req: Request, res: Response) => {
    try {

      let data = await this.teacherService.getHighScoreComment(
      );
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
