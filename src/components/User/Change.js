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
import * as env from "../../config/env.config";
import axios from "axios";
import { swal2Timing } from "../../config/swal2.config";

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

export default function Change({ setupdate, update }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [is_name_error, set_is_name_error] = useState(false);
  const [user_name, setuser_name] = useState("");
  const [maile, setmaile] = useState("");
  const [user_id, setuser_id] = useState(0);
  const [newpass, setnewpass] = useState("");
  const [oldpass, setoldpass] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleUpdateName = function (e) {
    const url_update_name = `${env.DEV_URL}/api/user/change-name`;
    const data = {
      user_name: user_name,
      user_id: user_id,
    };
    axios
      .patch(url_update_name, data, {})
      .then(function (ret) {
        setupdate(!update);
        const title = "Success!";
        const html = "Changed!";
        const timer = 2500;
        const icon = "success";
        swal2Timing(title, html, timer, icon);
      })
      .catch((er) => {
        const title = "error!";
        const html = "Something broke!";
        const timer = 2500;
        const icon = "error";
        swal2Timing(title, html, timer, icon);
      });
  };

  const handleUpdateMaile = function (e) {
    const url_update_maile = `${env.DEV_URL}/api/user/change-email`;
    const data = {
      email: maile,
      user_id: user_id,
    };
    axios
      .patch(url_update_maile, data, {})
      .then(function (ret) {
        setupdate(!update);
        const title = "Success!";
        const html = "Changed!";
        const timer = 2500;
        const icon = "success";
        swal2Timing(title, html, timer, icon);
      })
      .catch((er) => {
        const title = "error!";
        const html = "Something broke!";
        const timer = 2500;
        const icon = "error";
        swal2Timing(title, html, timer, icon);
      });
  };

  const handleUpdatePassword = function (e) {
    const url_update_pass = `${env.DEV_URL}/api/user/change-password`;
    const data = {
      user_id: user_id,
      old_pass: oldpass,
      new_pass: newpass,
    };
    axios
      .patch(url_update_pass, data, {})
      .then(function (ret) {
        setupdate(!update);
        const title = "Success!";
        const html = "Changed!";
        const timer = 2500;
        const icon = "success";
        swal2Timing(title, html, timer, icon);
      })
      .catch((er) => {
        console.log(er.response);
        const title = "error!";
        const html = "Something broke!";
        const timer = 2500;
        const icon = "error";
        swal2Timing(title, html, timer, icon);
      });
  };
  useEffect(() => {
    const curr_user_id = sessionStorage.getItem("user_login_id");
    setuser_id(+curr_user_id);
  }, []);

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
              value={user_name}
              onChange={(e) => setuser_name(e.target.value)}
              error={is_name_error}
              helperText={is_name_error === true ? "Cannot empty" : ""}
            />
            <Box my={2}>
              <Button
                color="primary"
                className={classes.btn}
                variant="contained"
                onClick={handleUpdateName}
              >
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
              type="email"
              fullWidth
              value={maile}
              onChange={(e) => setmaile(e.target.value)}
              error={is_name_error}
              helperText={is_name_error === true ? "Cannot empty?" : ""}
            />
            <Box my={2}>
              <Button
                onClick={handleUpdateMaile}
                className={classes.btn}
                color="primary"
                variant="contained"
              >
                Change
              </Button>
            </Box>
          </Link>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Link className={classes.link} to="/user/profile/change-password">
            <Box my={3}>
              <FormGroup>
                <TextField
                  label="Old password"
                  type="password"
                  fullWidth
                  value={oldpass}
                  onChange={(e) => setoldpass(e.target.value)}
                  error={is_name_error}
                  helperText={is_name_error === true ? "Error" : ""}
                />
              </FormGroup>
            </Box>
            <Box my={3}>
              <FormGroup>
                <TextField
                  label="New password"
                  type="password"
                  fullWidth
                  value={newpass}
                  onChange={(e) => setnewpass(e.target.value)}
                  error={is_name_error}
                  helperText={is_name_error === true ? "Cannot empty?" : ""}
                />
              </FormGroup>
            </Box>
            <Box mt={1}>
              <Button
                className={classes.btn}
                color="primary"
                variant="contained"
              >
                Change
              </Button>
            </Box>
          </Link>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
