const { REACT_APP_API_SERVER } = process.env;

export async function fetchGetUserInfo() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function fetchGetBookingInfo() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/user/booking`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function fetchGetBookmarkInfo() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/user/bookmark`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function fetchGetHostInfo() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/user/host`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function fetchUserCredit() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/user/credit`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result = await res.json();
  return result;
}

export async function requestWithdrawal(data: any) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/user/withdrawal`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  return result;
}

export async function editUserInfo(data: any) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/user/profile`,
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

export async function changePassword(data: any) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/user/password`,
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