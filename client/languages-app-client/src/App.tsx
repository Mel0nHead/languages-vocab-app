import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Review } from "./pages/Review";
import { AppBar, Container, makeStyles } from "@material-ui/core";
import "./App.css";
import { Test } from "./pages/Test";

const useStyles = makeStyles({
  navLink: {
    marginRight: "10px",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  navBar: {
    padding: "20px",
  },
  container: {
    paddingTop: "100px",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <AppBar className={classes.navBar}>
        <nav>
          <Link to="/home" className={classes.navLink}>
            Home
          </Link>
          <Link to="/review" className={classes.navLink}>
            Review
          </Link>
          <Link to="/test" className={classes.navLink}>
            Test
          </Link>
        </nav>
      </AppBar>
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
  );
}
