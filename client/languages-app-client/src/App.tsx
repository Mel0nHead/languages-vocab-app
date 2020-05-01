import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Review } from "./pages/Review";
import { Container, makeStyles, ThemeProvider } from "@material-ui/core";
import "./App.css";
import { Test } from "./pages/Test";
import { theme } from "./theme";
import { NavBar } from "./components/NavBar";

const useStyles = makeStyles({
  container: {
    paddingTop: "100px",
  },
});

export default function App() {
  const classes = useStyles();

  return (
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
  );
}
