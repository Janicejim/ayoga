// import { useGoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { loginGoogleThunk } from "../redux/auth/thunks";
import loginStyles from "../css/Login.module.css";
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginHooks() {
  const dispatch = useDispatch();

  const onSuccess = (res: any) => {
    console.log(`res on Hooks`);
    const googleAccessToken = res.tokenId;
    // console.log(`googleAccessToken`, googleAccessToken)
    if (googleAccessToken) {
      dispatch(loginGoogleThunk(googleAccessToken));
    }
  };

  const onFailure = (res: any) => {
    // console.log('Login failed: res:', res);
    alert(`Failed to login.`);
  };

  function signIn() {
    console.log("google signIn");
  }

  return (
    <button
      onClick={() => signIn}
      className={`btn ${loginStyles.btnGoogleLogin}`}
    >
      <span className={loginStyles.btnGoogleLogin}>Login with Google</span>
    </button>
  );
}

export default LoginHooks;
