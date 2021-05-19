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
import Subcat from "./Subcat";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";

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

export default function Cat({ cat_name, cat_id, all_subcat }) {
  const classes = style();
  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem
        className={classes.left_cat_wrapper}
        button
        onClick={handleClick}
      >
        <ListItemIcon className={classes.cat_icon}>
          {cat_id === 1 ? <LanguageIcon /> : <PhoneIphoneIcon />}
        </ListItemIcon>
        <ListItemText primary={cat_name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {cat_id === 1 ? (
        <Subcat
          all_subcat={all_subcat.filter((ele) => ele.cat_id === 1)}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <Subcat
          all_subcat={all_subcat.filter((ele) => ele.cat_id === 2)}
          open={open}
          setOpen={setOpen}
        />
      )}
    </React.Fragment>
  );
}
