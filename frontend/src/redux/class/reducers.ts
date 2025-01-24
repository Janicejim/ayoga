import { IClassDetailsAction } from "./actions";
import {
  IClassOtherClassState,
  classDetailsState,
  classOtherClassState,
} from "./state";

const initialState: classDetailsState = {
  classImage: "Loading",
  className: "Loading",
  classDate: "Loading",
  classStartTime: "Loading",
  classEndTime: "Loading",
  instructorName: "Loading",
  instructorId: 0,
  totalCapacity: "Loading",
  credit: "Loading",
  availableSeat: "Loading",
  venue: "Loading",
  classNumber: "Loading",
  type: "Loading",
  introduction: "Loading",
  language: "Loading",
  classId: 0,
  venue_point: { x: "Loading", y: "Loading" }
};

export const classDetailsReducer = (
  state: classDetailsState = initialState,
  action: IClassDetailsAction
): classDetailsState => {
  switch (action.type) {
    case "@@CLASS_GET_DETAIL": {
      const newClassDetailsData: classDetailsState = {
        ...action.classDetails,
      };
      return newClassDetailsData;
    }
    default: {
      return state;
    }
  }
};

const otherInitialState: IClassOtherClassState = {
  otherClassItems: [],
};

export const classOtherClassReducers = (
  state: IClassOtherClassState = otherInitialState,
  action: IClassDetailsAction
): IClassOtherClassState => {
  switch (action.type) {
    case "@@CLASS_GET_OTHER_CLASS_INFO":
      const newOtherClass: classOtherClassState[] = [...action.data];
      return {
        ...state,
        otherClassItems: newOtherClass,
      };

    default:
      return state;
  }
};
