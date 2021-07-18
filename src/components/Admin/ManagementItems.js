import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CategoryIcon from "@material-ui/icons/Category";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
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

function ManagementItems() {
  return (
    <List>
      {[
        ["Categories", "cat-management"],
        ["Courses", "delete-course"],
        ["Students", "student-management"],
        ["Instructors", "instructor-management"],
      ].map((text, index) => (
        <Link to={`/admin/${text[1]}`}>
          <ListItem button key={text[0]}>
            <ListItemIcon>
              {index === 0 && <CategoryIcon />}
              {index === 1 && <CallToActionIcon />}
              {index === 2 && <GroupIcon />}
              {index === 3 && <AssignmentIndIcon />}
            </ListItemIcon>
            <ListItemText primary={text[0]} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default ManagementItems;
