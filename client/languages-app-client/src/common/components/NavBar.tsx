import React from "react";
import { makeStyles, AppBar, Button } from "@material-ui/core";

export const DRAWER_WIDTH = 270;

const useStyles = makeStyles({
  navBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

interface NavBarProps {
  handleLogout: () => void;
}

export function NavBar(props: NavBarProps) {
  const classes = useStyles();

  return (
    <AppBar className={classes.navBar}>
      <Button
        disableElevation
        onClick={props.handleLogout}
        variant="outlined"
        style={{ borderColor: "white", color: "white" }}
      >
        Logout
      </Button>
    </AppBar>
  );
}
