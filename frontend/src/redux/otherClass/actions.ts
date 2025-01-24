import { OtherClassState } from "./state";

export function gotOtherClassInfo(data: OtherClassState[]) {
  return {
    type: "@@OtherClass/GOT_OTHER_CLASS_INFO" as const,
    data,
  };
}

export type IOtherClassAction = ReturnType<typeof gotOtherClassInfo>;
