import { REACT_APP_API_SERVER } from "../utils/config";


export async function fetchGetPackageInfo() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/payment/package`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function fetchAddCredit(package_id: number, status: string) {
  if (status === "cancel") {
    return { success: false };
  }
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/payment/record?package_id=${package_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
}

export async function fetchStripe(package_id: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/payment/stripe?package_id=${package_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
}
