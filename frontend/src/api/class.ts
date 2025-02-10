import { REACT_APP_API_SERVER } from "../utils/config";


export async function fetchClassDetails(classId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/details/${classId}`
  );
  return res;
}


export async function fetchClassStatusAndUserType(classId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/status/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
}


export async function fetchIsClassBookmarked(classId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/bookmark/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
}

export async function fetchChangeClassBookmark(
  classId: number,
  isClassBookmarked: Boolean
) {
  if (isClassBookmarked) {
    console.log("bookmarked, and to DELETE");
    const res = await fetch(
      `${REACT_APP_API_SERVER}/api/class/bookmark/${classId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }
  console.log("NOT bookmarked, and to ADD");
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/bookmark/${classId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}

export async function fetchToReserveSeat(classId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/reserve/${classId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res;
}

export async function fetchOtherLessons(teacherId: number, classId?: number) {
  let path;
  classId
    ? (path = `${REACT_APP_API_SERVER}/api/class/teacher/${teacherId}?classId=${classId}`)
    : (path = `${REACT_APP_API_SERVER}/api/class/teacher/${teacherId}`);
  const res = await fetch(path);

  return res;
}

export async function fetchClassAlreadyBookedByUser(classId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/booking/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res;
}

export async function fetchToCancel(classId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/booking/${classId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res;
}

export async function fetchToCreateComment(classId: number, star: number, comment: string) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/comment/${classId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ classId, star, comment })
    }
  );
  const result = await res.json()
  return result;
}


export async function fetchAllClasses(
  date?: string,
  start_time?: string,
  instructor?: string,
  venue?: string,
  title?: string,
  type?: string,
  yogaType?: string,
  credit?: number,
  language?: string
) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/catalog/classes?date=${date}&start_time=${start_time}&instructor=${instructor}&venue=${venue}&title=${title}&type=${type}&yogaType=${yogaType}&credit=${credit}&language=${language}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
}

export async function fetchYogaType() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/catalog/yoga/type`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}


export async function fetchCreateClass(
  name: string,
  date: string,
  start_time: string,
  end_time: string,
  capacity: number,
  credit: number,
  image: string,
  language: string,
  yoga_type: string,
  type: string,
  venue: string,
  venue_point_lat: number,
  venue_point_lng: number,
  introduction: string
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("venue", venue);
  formData.append("capacity", capacity.toString());
  formData.append("language", language);
  formData.append("credit", credit.toString());
  formData.append("date", date);
  formData.append("start_time", start_time);
  formData.append("end_time", end_time);
  formData.append("image", image);
  formData.append("yoga_type", yoga_type);
  formData.append("type", type);
  formData.append("venue_point_lat", venue_point_lat.toString());
  formData.append("venue_point_lng", venue_point_lng.toString());
  formData.append("introduction", introduction);
  const res = await fetch(`${REACT_APP_API_SERVER}/api/teacher/class`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  // console.log(res.status)
  return res;
}


export async function fetchGetOtherClassInfo(teacher_id: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/class/teacher/${teacher_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
}
