import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import { Button, FormGroup, TextField } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    textTransform: "initial",
  },
  appbar: {
    width: "100%",
  },
  btn: {
    fontSize: 12,
    textTransform: "initial",
    justifyContent: "flex-end",
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

export default function Change() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [is_name_error, set_is_name_error] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            className={classes.tab}
            label="Change username"
            {...a11yProps(0)}
          />
          <Tab className={classes.tab} label="Change email" {...a11yProps(1)} />
          <Tab
            className={classes.tab}
            label="Change password"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Link className={classes.link} to="/user/profile/change-name">
            <TextField
              label="Username"
              fullWidth
              error={is_name_error}
              helperText={
                is_name_error === true ? "You don't have a name?" : ""
              }
            />
            <Box my={2}>
              <Button className={classes.btn} variant="contained">
                Change
              </Button>
            </Box>
          </Link>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Link className={classes.link} to="/user/profile/change-email">
            <TextField
              label="Email"
              type="email"
              fullWidth
              error={is_name_error}
              helperText={
                is_name_error === true ? "You don't have a name?" : ""
              }
            />
            <Box my={2}>
              <Button className={classes.btn} variant="contained">
                Change
              </Button>
            </Box>
          </Link>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Link className={classes.link} to="/user/profile/change-password">
            <Box my={2}>
              <FormGroup>
                <TextField
                  label="Old password"
                  type="password"
                  fullWidth
                  error={is_name_error}
                  helperText={is_name_error === true ? "Name is?" : ""}
                />
              </FormGroup>
            </Box>
            <Box my={2}>
              <FormGroup>
                <TextField
                  label="New password"
                  type="password"
                  fullWidth
                  error={is_name_error}
                  helperText={
                    is_name_error === true ? "You don't have a name?" : ""
                  }
                />
              </FormGroup>
            </Box>
            <Box mt={1}>
              <Button className={classes.btn} variant="contained">
                Change
              </Button>
            </Box>
          </Link>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
