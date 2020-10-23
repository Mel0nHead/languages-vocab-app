import React, { createContext, useState } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Container, makeStyles, ThemeProvider } from "@material-ui/core";
import "./App.css";
import { theme } from "./theme";
import { NavBar } from "./components/NavBar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

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
}

export const AuthContext = createContext<AuthContext>({
  isAuthorised: false,
});

export default function App() {
  const classes = useStyles();
  const [authContext, setAuthContext] = useState<AuthContext>({
    isAuthorised: !!localStorage.getItem("token"), // obviously dodgy, but will leave it for now
  });

  function handleLogin(userId: string) {
    localStorage.setItem("token", "abc123");
    localStorage.setItem("userId", userId);
    setAuthContext((currentContext) => ({
      ...currentContext,
      isAuthorised: true,
    }));
    return <Redirect to="/home" />;
  }

  function handleLogout() {
    localStorage.clear();
    setAuthContext((currentContext) => ({
      ...currentContext,
      isAuthorised: false,
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
                <NavBar handleLogout={handleLogout} />
                <Container maxWidth="sm" className={classes.container}>
                  <PrivateRoutes />
                </Container>
              </>
            ) : (
              <PublicRoutes handleLogin={handleLogin} />
            )}
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
