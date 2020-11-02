import React, { createContext, useRef, useState } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import {
  Container,
  IconButton,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";
import { theme } from "./common/theme";
import { NavBar } from "./common/components/NavBar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { PrivateRoutes } from "./common/components/PrivateRoutes";
import { PublicRoutes } from "./common/components/PublicRoutes";
import { SnackbarKey, SnackbarProvider } from "notistack";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import apolloClient from "./common/apolloClient";

const useStyles = makeStyles({
  container: {
    paddingTop: "100px",
  },
  closeIcon: {
    color: "white",
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
  const notistackRef = useRef<SnackbarProvider>(null);

  function closeSnackbar(key: SnackbarKey) {
    return () => {
      if (notistackRef.current) {
        notistackRef.current.closeSnackbar(key);
      }
    };
  }

  function handleLogin(userId: string, token: string) {
    localStorage.setItem("token", token);
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
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            ref={notistackRef}
            action={(key) => (
              <IconButton
                onClick={closeSnackbar(key)}
                className={classes.closeIcon}
              >
                <CloseRoundedIcon />
              </IconButton>
            )}
          >
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
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
