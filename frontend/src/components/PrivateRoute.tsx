import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { IRootState } from "../redux/store";

export default function PrivateRoute({ component, ...rest }: RouteProps) {
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticate
  );
  const Component = component;
  if (Component == null) {
    return null;
  }

  let render: (props: any) => JSX.Element;

  // Main Logic
  if (isAuthenticated) {
    render = (props: any) => <Component {...props}></Component>;
  } else {
    render = (props: any) => (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  }
  //
  return (
    <Route {...rest} render={render} />
    // <div>
    //     PrivateRoute {String(isAuthenticated)}
    // </div>
  );
}
