import { Dispatch } from "redux";
import {
  getClassDetail,
  gotOtherClassInfo,
  IClassDetailsAction,
} from "./actions";
import { CallHistoryMethodAction } from "connected-react-router";
import { failed } from "./actions";
import { classDetailsState } from "./state";
import { fetchOtherLessons, fetchClassDetails } from "../../api/class";

type FetchedDetails = {
  image: string;
  venue: string;
  name: string;
  date: string;
  start_time: string;
  capacity: number;
  end_time: string;
  teacher_name: string;
  teacher_id: number;
  credit: number;
  class_number: string;
  type: string;
  introduction: string;
  language: string;
  available: number;
  class_id: number;
  venue_point: { x: string, y: string }
};

type DetailsDbRes = {
  details: Array<FetchedDetails>;
  success: boolean;
  msg: string;
};

export function getClassDetailThunk(lessonId: number) {
  return async (
    dispatch: Dispatch<IClassDetailsAction | CallHistoryMethodAction>
  ) => {
    try {
      const res = await fetchClassDetails(lessonId);
      const result: DetailsDbRes = await res.json();
      if (res.ok) {
        // assuming no class will be held in multiple days, and only take the first item
        const fetchedDetails: FetchedDetails = result.details[0];
        const classDetails: classDetailsState = {
          classImage: fetchedDetails.image,
          className: fetchedDetails.name,
          classDate: fetchedDetails.date,
          classStartTime: fetchedDetails.start_time,
          classEndTime: fetchedDetails.end_time,
          instructorName: fetchedDetails.teacher_name,
          instructorId: fetchedDetails.teacher_id,
          totalCapacity: fetchedDetails.capacity,
          availableSeat: fetchedDetails.available,
          credit: fetchedDetails.credit,
          venue: fetchedDetails.venue,
          classNumber: fetchedDetails.class_number,
          type: fetchedDetails.type,
          introduction: fetchedDetails.introduction,
          language: fetchedDetails.language,
          classId: fetchedDetails.class_id,
          venue_point: fetchedDetails.venue_point
        };
        dispatch(getClassDetail(classDetails));
      } else {
        dispatch(failed("@@CLASS_GET_DETAIL_FAILED", result.msg));
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export function classGetOtherClassInfo(teacher_id: number, class_id?: number) {
  return async (dispatch: Dispatch<IClassDetailsAction>) => {
    let res;
    class_id
      ? (res = await fetchOtherLessons(teacher_id, class_id))
      : (res = await fetchOtherLessons(teacher_id));
    // console.log(res);
    const result: any = await res.json();
    // console.log(result);
    if (result.success) {
      dispatch(gotOtherClassInfo(result.data));
    } else {
      dispatch(failed("@@CLASS_GET_OTHER_CLASS_INFO_FAILED", result.msg));
    }
  };
}
