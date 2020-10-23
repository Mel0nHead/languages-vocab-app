import React, { createContext, useState } from "react";
import { Switch, BrowserRouter, Redirect } from "react-router-dom";
import { Container, makeStyles, ThemeProvider } from "@material-ui/core";
import "./App.css";
import { theme } from "./theme";
import { NavBar } from "./components/NavBar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Login } from "./pages/Login/Login";
import { AuthRoute } from "./AuthRoute";
import { PrivateRoutes } from "./PrivateRoutes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const useStyles = makeStyles({
  container: {
    paddingTop: "100px",
  },
});

interface AuthContext {
  isAuthorised: boolean;
  userId: string | null;
}

export const AuthContext = createContext<AuthContext>({
  isAuthorised: false,
  userId: null,
});

// TODO:
// - update all the query/mutation calls in the UI code
// - finish the app routes and login/logout functionality

export default function App() {
  const classes = useStyles();
  const [authContext, setAuthContext] = useState<AuthContext>({
    isAuthorised: !!localStorage.getItem("token"), // obviously dodgy, but will leave it for now
    userId: null,
  });

  function handleLogin(userId: string) {
    localStorage.setItem("token", "abc123");
    setAuthContext((currentContext) => ({
      ...currentContext,
      isAuthorised: true,
      userId,
    }));
    return <Redirect to="/home" />;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setAuthContext((currentContext) => ({
      ...currentContext,
      isAuthorised: false,
      userId: null,
    }));
    return <Redirect to="/login" />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            {authContext.isAuthorised ? (
              <>
                <NavBar />
                <Container maxWidth="sm" className={classes.container}>
                  <PrivateRoutes />
                </Container>
              </>
            ) : (
              <Switch>
                <AuthRoute
                  exact
                  path="/"
                  render={() => <Redirect to="/login" />}
                />
                <AuthRoute
                  exact
                  path="/login"
                  render={() => <Login handleLogin={handleLogin} />}
                />
                <AuthRoute path="*" render={() => <Redirect to="/login" />} />
              </Switch>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
