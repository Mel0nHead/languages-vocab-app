import React from "react";
import { makeStyles, AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navLink: {
    marginRight: "20px",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  navBar: {
    padding: "20px",
  },
});

const linkConfig = [
  { name: "Home", href: "/home" },
  { name: "Review", href: "/review" },
  { name: "Test", href: "/test" },
];

export function NavBar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.navBar}>
      <nav>
        {linkConfig.map((link) => (
          <Link to={link.href} className={classes.navLink} key={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>
    </AppBar>
  );
}
