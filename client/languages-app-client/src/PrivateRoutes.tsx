import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { Home } from "./pages/Home";
import { Review } from "./pages/Review";
import { Test } from "./pages/Test";

export const PrivateRoutes = withRouter(() => {
  return (
    <Switch>
      <AuthRoute path="/" exact component={Home} />
      <AuthRoute path="/home" exact component={Home} />
      <AuthRoute path="/review" exact component={Review} />
      <AuthRoute path="/test" exact component={Test} />
      <AuthRoute path="*" render={() => <h1>Page not found</h1>} />
    </Switch>
  );
});
