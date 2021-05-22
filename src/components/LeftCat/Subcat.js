import { makeStyles } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryIcon from "@material-ui/icons/Category";
import React from "react";
import { Link, useParams } from "react-router-dom";

const style = makeStyles((theme) => ({
  left_cat_wrapper: {},
  nested: {
    paddingLeft: theme.spacing(4),
  },
  cat_icon: {
    "&.MuiListItemIcon-root": {
      minWidth: 40,
    },
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

export default function Subcat({ open, setOpen, all_subcat }) {
  const classes = style();
  const { id } = useParams();

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {all_subcat.map((ele, i) => {
          return (
            <ListItem key={i} button className={classes.nested}>
              <ListItemIcon className={classes.cat_icon}>
                <CategoryIcon />
              </ListItemIcon>
              <Link
                // onClick={() => {
                //   set_cat_close(true);
                // }}
                className={classes.link}
                to={`/courses-list/${ele.subject_name}`}
              >
                <ListItemText primary={`${ele.subject_name}`} />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  );
}
