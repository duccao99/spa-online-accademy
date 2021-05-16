import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Popover from "./../Popover/Popover";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function Category() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const categories = [
    "Web application development",
    "Mobile application development",
  ];
  return (
    <div>
      <Popover
        title="Categories"
        categories={categories}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      />
    </div>
  );
}
