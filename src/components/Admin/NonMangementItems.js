import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: "80vh",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
}));

function NonManagementItems() {
  const history = useHistory();

  const handleSignOutClick = (e) => {
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("email");
    sessionStorage.clear();

    sessionStorage.setItem("isLogout", true);

    return history.push("/");
  };

  return (
    <List>
      {["Home", "Logout"].map((text, index) => {
        if (text === "Home") {
          return (
            <Link to={`/`}>
              <ListItem button key={text}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          );
        }
        return (
          <ListItem button key={text} onClick={handleSignOutClick}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default NonManagementItems;
