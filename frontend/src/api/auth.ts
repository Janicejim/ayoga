const { REACT_APP_API_SERVER } = process.env;

export async function fetchLogin(email: string, password: string) {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return res;
}


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
