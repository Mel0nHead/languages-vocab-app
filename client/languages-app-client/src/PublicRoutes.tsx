import React from "react";
import {
  Redirect,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { Login } from "./pages/Login/Login";

export interface PublicRoutesProps extends RouteComponentProps<{}> {
  handleLogin: (userId: string, token: string) => void;
}

export const PublicRoutes = withRouter((props: PublicRoutesProps) => {
  return (
    <Switch>
      <AuthRoute exact path="/" render={() => <Redirect to="/login" />} />
      <AuthRoute
        exact
        path="/login"
        render={() => <Login handleLogin={props.handleLogin} />}
      />
      <AuthRoute path="*" render={() => <Redirect to="/login" />} />
    </Switch>
  );
});
