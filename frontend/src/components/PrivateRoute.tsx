import { useSelector } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { IRootState } from "../redux/store";

export default function PrivateRoute({ component, ...rest }: RouteProps) {
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticate
  );
  const Component = component;
  if (Component == null) {
    return null;
  }

  let render: (props: RouteComponentProps) => JSX.Element;

  // Main Logic
  if (isAuthenticated) {
    render = (props: RouteComponentProps) => <Component {...props}></Component>;
  } else {
    render = (props: RouteComponentProps) => (
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

  );
}
