export interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPw: string;
  icon: string;
}

export interface IRegisterState {
  registerItem: RegisterState[];
}
