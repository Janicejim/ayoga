export function loadToken(token: string) {
  return {
    type: "@@Auth/LOAD_TOKEN" as const,
    token,
  };
}

export function loginSuccess(name: string, icon: string) {
  return {
    type: "@@Auth/LOGIN" as const,
    name,
    icon,
  };
}

export function logout() {
  return {
    type: "@@Auth/LOGOUT" as const,
  };
}

export function changeIsTeacherMode() {
  return {
    type: "@@Auth/SWITCH_ROLE_MODE" as const,
  };
}
export type IAuthAction =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loadToken>
  | ReturnType<typeof logout>
  | ReturnType<typeof changeIsTeacherMode>;
