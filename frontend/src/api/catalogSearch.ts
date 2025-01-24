const { REACT_APP_API_SERVER } = process.env;

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
