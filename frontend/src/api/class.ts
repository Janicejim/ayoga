const { REACT_APP_API_SERVER } = process.env;

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