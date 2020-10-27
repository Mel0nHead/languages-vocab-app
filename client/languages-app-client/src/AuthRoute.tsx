import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { Location } from "history";
import { AuthContext } from "./App";

export function hasLoginInPath(location: Location | undefined): boolean {
  return location ? location.pathname === "/login" : false;
}

export function AuthRoute(props: RouteProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const { component, render, location, ...rest } = props;
  const isLoginPath = hasLoginInPath(location);

  function getRedirectTo(pathname: string) {
    return (
      <Redirect
        to={{
          pathname,
          state: { from: location },
        }}
      />
    );
  }

  function routeWithRender() {
    return <Route {...rest} render={render} />;
  }

  function routeWithComponent() {
    return (
      <Route
        {...rest}
        // eslint-disable-next-line
        render={(props) => React.createElement(component!, props)}
      />
    );
  }

  function renderOrComponent() {
    return render ? routeWithRender() : routeWithComponent();
  }

  function checkPathWhenAuthorised() {
    return isLoginPath ? getRedirectTo("/home") : renderOrComponent();
  }

  function checkPathWhenNotAuthorised() {
    return isLoginPath ? routeWithRender() : getRedirectTo("/login");
  }

  return authContext.isAuthorised
    ? checkPathWhenAuthorised()
    : checkPathWhenNotAuthorised();
}
