import React from "react";
import { makeStyles, AppBar, Button } from "@material-ui/core";
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const linkConfig = [
  { name: "Home", href: "/home" },
  { name: "Review", href: "/review" },
  { name: "Test", href: "/test" },
];

interface NavBarProps {
  handleLogout: () => void;
}

export function NavBar(props: NavBarProps) {
  const classes = useStyles();
  return (
    <AppBar className={classes.navBar}>
      <nav>
        {linkConfig.map((link) => (
          <Link
            to={link.href}
            className={classes.navLink}
            key={link.href}
            data-testid="nav-link"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <Button onClick={props.handleLogout}>Logout</Button>
    </AppBar>
  );
}
