import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { Home } from "../../pages/Home/Home";
import { Review } from "../../pages/Review/Review";
import { Test } from "../../pages/Test/Test";
import { TestResults } from "../../pages/TestResults/TestResults";
import { About } from "../../pages/About/About";

export const PrivateRoutes = withRouter(() => {
  return (
    <Switch>
      <AuthRoute path="/" exact component={Home} />
      <AuthRoute path="/home" exact component={Home} />
      <AuthRoute path="/review" exact component={Review} />
      <AuthRoute path="/test" exact component={Test} />
      <AuthRoute path="/test-results" exact component={TestResults} />
      <AuthRoute path="/about" exact component={About} />
      <AuthRoute path="*" render={() => <h1>Page not found</h1>} />
    </Switch>
  );
});
