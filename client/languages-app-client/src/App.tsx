import React, { createContext, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Review } from "./pages/Review";
import { Container, makeStyles, ThemeProvider } from "@material-ui/core";
import "./App.css";
import { Test } from "./pages/Test";
import { theme } from "./theme";
import { NavBar } from "./components/NavBar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Login } from "./pages/Login";

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
// - make sure all word-related queries/mutations have the userId as an argument
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
    // then redirect to home page
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setAuthContext((currentContext) => ({
      ...currentContext,
      isAuthorised: false,
      userId: null,
    }));
    // then redirect to login page
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
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/review" exact component={Review} />
                    <Route path="/test" extact component={Test} />
                    <Route path="*" render={() => <h1>Page not found</h1>} />
                  </Switch>
                </Container>
              </>
            ) : (
              <Route path="*" component={Login} />
            )}
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
