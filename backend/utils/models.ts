export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface UserInExcel {
  id: number;
  email: string;
  name: string;
  role: string;
  icon: string;
  password: string;
  phone: string;
}

export interface ResultClassAvailability {
  classCap: number;
  classAttendee: number;
}

export interface ResultUserAndClassCredits {
  userCreditLeft: number;
  classCreditRequired: number;
  teacher_id: number;
}

export interface Package {
  credit: number,
  name: string
}

export interface UserRecord {
  id: number,
  transaction_id: string,
  credit: number,
  type: string,
  class_id: number,
  user_id: number
}