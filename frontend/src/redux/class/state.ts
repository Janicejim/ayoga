export interface classDetailsState {
  classImage: string;
  className: string;
  classDate: string;
  classStartTime: string;
  classEndTime: string;
  instructorName: string;
  instructorId: number;
  totalCapacity: number | string;
  availableSeat: number | string;
  credit: number | string;
  venue: string;
  classNumber: string;
  type: string;
  introduction: string;
  language: string;
  classId: number;
  venue_point: { x: string, y: string }
}

export interface classOtherClassState {
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
}

export interface IClassOtherClassState {
  otherClassItems: classOtherClassState[];
}
