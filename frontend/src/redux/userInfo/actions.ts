import { IUserInfoBoxState } from "./state";

export function gotUserInfo(data: IUserInfoBoxState) {
  return {
    type: "@@UserInfo/GOT_USER_INFO" as const,
    data,
  };
}
export function updateCredit(credit: number) {
  return {
    type: "@@UserInfo/UPDATE_CREDIT" as const,
    credit,
  };
}

export type IUserInfoAction =
  | ReturnType<typeof gotUserInfo>
  | ReturnType<typeof updateCredit>;
