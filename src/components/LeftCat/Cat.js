import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import React, { useState } from "react";
import Subcat from "./Subcat";

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
  const [selectedSubCat, setSelectedSubCat] = useState(null);
  const [open, setOpen] = useState(false);

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
