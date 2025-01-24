const { REACT_APP_API_SERVER } = process.env;

export async function fetchGetTransactionInfo() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/transaction`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}
