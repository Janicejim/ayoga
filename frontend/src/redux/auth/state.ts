// 1. Definition of the Data
export interface IAuthState {
  isAuthenticate: boolean;
  isTeacherMode: boolean;
  user: JWTPayload;
  name: string;
  icon: string;
}
// 2. Define the State
export interface JWTPayload {
  userId: number | undefined;
  email: string | undefined;
  role: string | undefined;
}
