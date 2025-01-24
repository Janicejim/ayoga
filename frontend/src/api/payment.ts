const { REACT_APP_API_SERVER } = process.env;

export async function fetchGetPackageInfo() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/payment/package`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function fetchAddTransaction(class_id: number, status: string) {
  if (status === "cancel") {
    return;
  }
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/payment/record?class_id=${class_id}`,
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

export async function fetchStripeForPayment(class_id: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/payment/stripe?class_id=${class_id}`,
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
