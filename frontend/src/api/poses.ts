const { REACT_APP_API_SERVER } = process.env;

export async function fetchAllPoses() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/poses`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function insertPoseRecord(accuracy: number, pose_id: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/poses/record?accuracy=${accuracy}&pose_id=${pose_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
}

export async function fetchPoseRecord() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/poses/record`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}

export async function deletePoseRecordApi(id: number) {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/poses/record?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
}
