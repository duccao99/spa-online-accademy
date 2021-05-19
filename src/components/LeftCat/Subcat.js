import React from "react";
import { makeStyles, Container, Grid, Box } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import CategoryIcon from "@material-ui/icons/Category";

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
}));

export default function Subcat({ open, setOpen, all_subcat }) {
  const classes = style();

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {all_subcat.map((ele, i) => {
          return (
            <ListItem key={i} button className={classes.nested}>
              <ListItemIcon className={classes.cat_icon}>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={`${ele.subject_name}`} />
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  );
}
