import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { Box } from "@material-ui/core";
import axios from "axios";
import * as env_config from "../../config/env.config";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
  btn_cat_name: {
    padding: 12,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Subcategory({
  cat_name,
  set_cat_close,
  sub_web_cat,
  sub_mobi_cat,
  classes,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        color="primary"
        className={classes.cat_name}
        onClick={handleClick}
      >
        <Box p={1}>{cat_name}</Box>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        className={classes.popover_cat}
        open={Boolean(anchorEl)}
        onClose={() => {
          set_cat_close(true);
        }}
      >
        {sub_web_cat.length !== 0
          ? sub_web_cat.map((ele, i) => {
              return (
                <StyledMenuItem>
                  <ListItemText key={i} primary={ele.subject_name} />
                </StyledMenuItem>
              );
            })
          : ""}
        {sub_mobi_cat.length !== 0
          ? sub_mobi_cat.map((ele, i) => {
              return (
                <StyledMenuItem>
                  <ListItemText key={i} primary={ele.subject_name} />
                </StyledMenuItem>
              );
            })
          : ""}
      </StyledMenu>
    </div>
  );
}
