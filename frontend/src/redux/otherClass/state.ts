export interface OtherClassState {
  image: string;
  name: string;
  date: string;
  time: string;
  instructor: string;
  venue: string;
  max_capacity: number;
  capacity: number;
  class_id: number;
  credit: number;
  type: string;
  uuid: string;
  link: string;
  introduction: string;
  language: string;
}

export interface IOtherClassState {
  otherClassItems: OtherClassState[];
}
