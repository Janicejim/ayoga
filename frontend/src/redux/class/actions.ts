import { classDetailsState, classOtherClassState } from "./state";

export function getClassDetail(classDetails: classDetailsState) {
  return {
    type: "@@CLASS_GET_DETAIL" as const,
    classDetails,
  };
}

export function gotOtherClassInfo(data: classOtherClassState[]) {
  return {
    type: "@@CLASS_GET_OTHER_CLASS_INFO" as const,
    data,
  };
}

type FAIL_INTENT =
  | "@@CLASS_GET_DETAIL_FAILED"
  | "@@CLASS_GET_OTHER_CLASS_INFO_FAILED";

export function failed(type: FAIL_INTENT, msg: string) {
  return {
    type,
    msg,
  };
}

export type IClassDetailsAction =
  | ReturnType<typeof getClassDetail>
  | ReturnType<typeof failed>
  | ReturnType<typeof gotOtherClassInfo>;
