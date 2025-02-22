// definition of the data
export interface IAuthState {
  isAuthenticate: boolean;
  isTeacherMode: boolean;
  user: JWTPayload;
  name: string;
  icon: string;
}
// define the state
export interface JWTPayload {
  userId: number | undefined;
  email: string | undefined;
  role: string | undefined;
}
