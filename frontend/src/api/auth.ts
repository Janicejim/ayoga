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

export async function fetchFacebookLogin(accessToken: string) {
  // console.log(`accessToken`, accessToken)
  const res = await fetch(`${REACT_APP_API_SERVER}/api/auth/loginFacebook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
    }),
  });
  // console.log(`res of fb login`, res)
  return res;
}

export async function fetchGoogleLogin(token: string) {
  // console.log(`fetch google`, token)
  const result = await fetch(`${REACT_APP_API_SERVER}/api/auth/loginGoogle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  // console.log(`res of profileObj`, result)
  return result;
}
