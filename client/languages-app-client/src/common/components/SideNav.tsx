import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { Divider, makeStyles } from "@material-ui/core";
import { DRAWER_WIDTH } from "./NavBar";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import { useHistory } from "react-router-dom";

const linkConfig = [
  { name: "Home", href: "/home", icon: <HomeRoundedIcon /> },
  { name: "Saved words", href: "/review", icon: <FavoriteRoundedIcon /> },
  { name: "Test yourself", href: "/test", icon: <AssignmentIcon /> },
  { name: "Results", href: "/test-results", icon: <BarChartIcon /> },
  { name: "About", href: "/about", icon: <InfoRoundedIcon /> },
];

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  divider: {
    marginTop: 76,
  },
}));

export function SideNav() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <Divider className={classes.divider} />
      <List component="nav">
        {linkConfig.map((link) => {
          return (
            <ListItem
              key={link.href}
              button
              onClick={() => {
                history.push(link.href);
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
