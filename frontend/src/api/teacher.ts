export async function fetchApplyTeacherRole(
  sex: string,
  newest_qualification: string,
  photo: string,
  id_photo: string,
  cert: string,
  introduction: string
) {
  const formData = new FormData();
  formData.append("sex", sex);
  formData.append("newest_qualification", newest_qualification);
  formData.append("photo", photo);
  formData.append("id_photo", id_photo);
  formData.append("cert", cert);
  formData.append("introduction", introduction);

  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/teacher/apply`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }
  );
  let result = await res.json();
  return result;
}

export async function fetchTeacherInfoAndStudentComment(teacherId: number) {
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/teacher/info?teacher_id=${teacherId}`
  );
  let result = await res.json();
  return result;
}

export async function fetchTeacherInfo() {
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/teacher/information`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let result = await res.json();
  return result;
}

export async function fetchStudentList(classId: number) {
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/student/list?class_id=${classId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let result = await res.json();
  return result;
}

export async function fetchTeacherRevenue() {
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/teacher/revenue`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let result = await res.json();
  return result;
}

export async function editTeacherInfo(data: any) {
  const res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/teacher/info`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  const result = await res.json();
  return result;
}

export async function fetchHighScoreTeachers() {
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/teachers`,
  );
  let result = await res.json();
  return result;
}

export async function fetchNewestComments() {
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/comments`,
  );
  let result = await res.json();
  return result;
}