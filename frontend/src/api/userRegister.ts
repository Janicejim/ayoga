const { REACT_APP_API_SERVER } = process.env;

export async function fetchRegisterAccount(
  name: string,
  email: string,
  password: string,
  confirmPw: string,
  icon: string,
  phone: string
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirmPw", confirmPw);
  formData.append("phone", phone);
  formData.append("icon", icon);

  const res = await fetch(`${REACT_APP_API_SERVER}/api/auth/register`, {
    method: "POST",

    body: formData,
  });
  return res;
}
