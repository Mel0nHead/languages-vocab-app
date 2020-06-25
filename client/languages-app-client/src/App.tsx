import React from "react";
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

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const useStyles = makeStyles({
  container: {
    paddingTop: "100px",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
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
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}
