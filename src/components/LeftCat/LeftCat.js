import React from "react";
import { makeStyles, Container, Grid, Box } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Cat from "./Cat";

const style = makeStyles((theme) => ({
  left_cat_wrapper: {},
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const categories = [
  {
    cat_id: 1,
    cat_name: "Web development",
  },
  {
    cat_id: 2,
    cat_name: "Mobile development",
  },
];

export default function LeftCat() {
  const classes = style();

  return (
    <Box>
      {categories.map((ele, i) => {
        return <Cat key={i} {...ele} />;
      })}
    </Box>
  );
}
