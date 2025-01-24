import { Request, Response } from "express";
import {
  ResultClassAvailability,
  ClassService,
} from "../services/ClassService";

export class ClassController {
  constructor(private classService: ClassService) { }

  public getClassDetailsById = async (req: Request, res: Response) => {
    try {
      let classId = req.params.classId;
      let classDetails = await this.classService.getClassDetails(+classId);
      res.json({
        details: classDetails,
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

  public getUserTypeOfClass = async (req: Request, res: Response) => {
    try {
      let classId = req.params.classId;
      let userId = req.user.id
      let checkIsCreator = await this.classService.checkIsCreatorOfClass(+classId, userId);
      let isEnd = await this.classService.checkTheClassIsEnd(+classId)

      if (checkIsCreator.length > 0) {
        res.json({
          isCreator: true,
          success: true, isEnd
        });
      } else {
        let result = await this.classService.checkIsJoinerOfClass(+classId, userId)
        res.json({
          isCreator: false,
          joinerData: result,
          isEnd,
          success: true,
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


  public checkBookmarked = async (req: Request, res: Response) => {
    try {
      let userId = req.user.id;
      const targetClassId = parseInt(req.params.classId);
      const bookmarkedRes = await this.classService.checkClassBookmarked(
        targetClassId,
        userId
      );
      if (bookmarkedRes.length === 0) {
        res.json({
          bookmarked: false,
          success: true,
        });
        return;
      }
      res.json({
        bookmarked: true,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: error,
        success: false,
      });
    }
  };

  public addBookmarked = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const targetClassId = parseInt(req.params.classId);
      const bookmarkedRes = await this.classService.checkClassBookmarked(
        targetClassId,
        userId
      );
      if (bookmarkedRes.length > 0) {
        res.json({
          msg: "The Class has already been bookmarked.",
          success: false,
          type: "add",
        });
        return;
      }
      await this.classService.addClassBookmark(targetClassId, userId);
      res.json({
        msg: "The Class is bookmarked.",
        success: true,
        type: "add",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "system error",
        success: false,
        type: "add",
      });
    }
  };

  public deleteBookmarked = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const targetClassId = parseInt(req.params.classId);
      const bookmarkedRes = await this.classService.checkClassBookmarked(
        targetClassId,
        userId
      );
      if (bookmarkedRes.length === 0) {
        res.json({
          msg: "Bookmark does not exist.",
          success: false,
          type: "delete",
        });
        return;
      }
      await this.classService.deleteClassBookmark(targetClassId, userId);
      res.json({
        msg: "Bookmark is deleted.",
        success: true,
        type: "delete",
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "system error",
        success: false,
      });
    }
  };

  public reserveSeat = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const targetClassId = parseInt(req.params.classId);

      // Check it is your own class or not
      const checkIsYoursClass = await this.classService.checkIsCreatorOfClass(
        targetClassId,
        userId
      );

      if (checkIsYoursClass.length > 0) {
        res.json({
          success: false,
          msg: "You can't enrol the class you created",
        });
        return;
      }

      // Check whether you have already reserved the class
      const checkReserved = await this.classService.checkClassSeatReserved(
        targetClassId,
        userId
      );

      if (checkReserved.length > 0) {
        res.json({
          success: false,
          msg: "You have already join this class",
        });
        return;
      }

      //Check if the user have enough credit to register
      const checkCreditLeft = await this.classService.checkUserAndClassCredits(
        targetClassId,
        userId
      );

      if (
        checkCreditLeft.classCreditRequired > checkCreditLeft.userCreditLeft
      ) {
        res.json({
          success: false,
          msg: "Not enough credit,please top up first",
        });
        return;
      }

      // Check there are seats open
      const checkClassAvailability: ResultClassAvailability =
        await this.classService.checkClassAvailability(targetClassId);
      if (
        !(
          checkClassAvailability.classCap > checkClassAvailability.classAttendee
        )
      ) {
        res.json({
          success: false,
          msg: "The class is full",
        });
        return;
      }
      // Reserve req passes all checks
      let reserveResult = await this.classService.toReserveClassSeat(
        checkCreditLeft.teacher_id,
        targetClassId,
        userId,
        parseInt(checkCreditLeft.classCreditRequired)
      );

      if (reserveResult.success) {

        res.status(200).json({
          message: `Your seat has been successfully reserved.`,
          success: true,
        });
      } else {
        res.status(200).json({
          message: `System problem, please try it again`,
          success: false,
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

  public cancelReserveSeat = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const targetClassId = parseInt(req.params.classId);

      const creditRecordsRelated = await this.classService.checkCreditRecords(
        targetClassId,
        userId
      );

      //check the cancel date is before 2 days of class start day or not:
      const periodResult = await this.classService.checkCancelDayClassDayPeriod(
        targetClassId
      );

      if (periodResult.length == 0) {
        res.json({
          success: false,
          msg: "Only can cancel the booking two day before class start date",
        });
        return;
      }

      // Cancel req passes all checks
      await this.classService.toCancelClassSeat(
        [creditRecordsRelated.useCreditRecord, creditRecordsRelated.earnCreditRecord],
        targetClassId, userId
      );
      res.status(200).json({
        message: `Your booking has successfully been canceled.`,
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

  public checkIsBooked = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const targetClassId = parseInt(req.params.classId);
      const bookedRes = await this.classService.checkClassBooked(
        targetClassId,
        userId
      );
      if (bookedRes.length === 0) {
        res.json({
          booked: false,
          success: true,
        });
        return;
      }
      res.json({
        booked: true,
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

  getInstructorOtherClasses = async (req: Request, res: Response) => {
    try {
      const teacher_id = parseInt(req.params.teacherId);
      const existingClass_id = req.query.classId;
      let checkingResult;
      if (existingClass_id) {
        checkingResult = await this.classService.checkInstructorOtherClasses(
          teacher_id,
          +existingClass_id
        );
      } else {
        checkingResult = await this.classService.checkInstructorOtherClasses(
          teacher_id
        );
      }

      res.json({ success: true, data: checkingResult });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "system error",
        success: false,
      });
    }
  };


  public getStudentCommentByClassId = async (req: Request, res: Response) => {
    try {
      let classId = req.params.classId;
      let comments = await this.classService.getStudentCommentByClassId(+classId);
      res.json({
        data: comments,
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


  public studentGiveCommentByClassId = async (req: Request, res: Response) => {
    try {
      let classId = req.params.classId;
      const userId = req.user.id;
      let { comment, star } = req.body

      if (!comment || !star) {
        res.json({ success: false, msg: "missing comment of star" })
        return
      }


      let comments = await this.classService.studentGiveCommentByClassId(+classId, comment, star, userId);
      res.json({
        data: comments,
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


  public studentEditCommentByCommentId = async (req: Request, res: Response) => {
    try {
      let commentId = req.params.id;
      let { comment, star } = req.body

      if (!comment || !star) {
        res.json({ success: false, msg: "missing comment of star" })
        return
      }


      let comments = await this.classService.studentEditCommentByCommentId(+commentId, comment, star);
      res.json({
        data: comments,
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
