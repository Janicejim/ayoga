import { IRegisterAction } from "./actions";
import { IRegisterState, RegisterState } from "./state";

const initialState: IRegisterState = {
  registerItem: [
    { name: "", email: "", password: "", confirmPw: "", icon: "" },
  ],
};

export const registerReducers = (
  state: IRegisterState = initialState,
  action: IRegisterAction
): any => {
  switch (action.type) {
    case "@@REGISTER/ACCOUNT":
      const newAccount: RegisterState[] = [...action.data];
      return {
        ...state,
        registerItem: newAccount,
      };
    default:
      return state;
  }
};
