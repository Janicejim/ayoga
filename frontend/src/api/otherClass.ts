const { REACT_APP_API_SERVER } = process.env;

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
