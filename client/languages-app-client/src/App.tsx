import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Review } from "./pages/Review";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/review">Review</Link>
      </nav>
      <div
        style={{
          width: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center"
        }}
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/review" exact component={Review} />
          <Route path="*" render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
