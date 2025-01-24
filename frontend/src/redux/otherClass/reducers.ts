import { IOtherClassAction } from "./actions";
import { IOtherClassState, OtherClassState } from "./state";

const initialState: IOtherClassState = {
  otherClassItems: [],
};

export const otherClassReducers = (
  state: IOtherClassState = initialState,
  action: IOtherClassAction
): IOtherClassState => {
  switch (action.type) {
    case "@@OtherClass/GOT_OTHER_CLASS_INFO":
      const newOtherClass: OtherClassState[] = [...action.data];
      return {
        ...state,
        otherClassItems: newOtherClass,
      };

    default:
      return state;
  }
};
