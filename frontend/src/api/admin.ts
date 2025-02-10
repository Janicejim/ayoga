import { REACT_APP_API_SERVER } from "../utils/config";

export async function fetchUserList(keyword?: string) {
  let path;

  if (keyword) {
    path = `${REACT_APP_API_SERVER}/api/admin/users?keyword=${keyword}`;
  } else {
    path = `${REACT_APP_API_SERVER}/api/admin/users`;
  }
  const res = await fetch(path, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  let result = await res.json();
  return result;
}

export async function fetchEditUserRole(user_id: number, role: string) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/admin/user/role?user_id=${user_id}&role=${role}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let result = await res.json();
  return result;
}

export async function fetchTeacherRequest() {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/admin/teacher/request`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let result = await res.json();
  return result;
}

export async function ReplyTeacherRequestApi(
  id: number,
  status: string,
  remark: string
) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/admin/reply/request?requestId=${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status, remark }),
    }
  );
  let result = await res.json();
  return result;
}

export async function fetchUncommentRecord() {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/admin/uncomment`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let result = await res.json();
  return result;
}

export async function sendEmailToUncommentStudents() {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/admin/uncomment/email`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let result = await res.json();
  return result;
}
