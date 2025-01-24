const { REACT_APP_API_SERVER } = process.env;

export async function fetchCreateClass(
  name: string,
  date: string,
  start_time: string,
  end_time: string,
  capacity: number,
  credit: number,
  image: string,
  language: string,
  yoga_type: string,
  type: string,
  venue: string,
  venue_point_lat: number,
  venue_point_lng: number,
  introduction: string
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("venue", venue);
  formData.append("capacity", capacity.toString());
  formData.append("language", language);
  formData.append("credit", credit.toString());
  formData.append("date", date);
  formData.append("start_time", start_time);
  formData.append("end_time", end_time);
  formData.append("image", image);
  formData.append("yoga_type", yoga_type);
  formData.append("type", type);
  formData.append("venue_point_lat", venue_point_lat.toString());
  formData.append("venue_point_lng", venue_point_lng.toString());
  formData.append("introduction", introduction);
  const res = await fetch(`${REACT_APP_API_SERVER}/api/teacher/class`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  // console.log(res.status)
  return res;
}
