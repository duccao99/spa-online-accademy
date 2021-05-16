import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import validator from "validator";
import * as env_config from "../../config/env.config";
import axios from "axios";
import { swal2Timing } from "../../config/swal2.config";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={`${env_config.BASE_URL}`}>
        Online Academy DT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    ".MuiFormHelperText-root": {
      color: "red",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  helperText: {
    color: "red",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [is_email_error, set_is_email_error] = useState(false);
  const [is_pass_error, set_is_pass_error] = useState(false);
  const [user_name, set_user_name] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  const handleEmailChange = (e) => {
    set_email(e.target.value);
    if (validator.isEmail(email) === false) {
      set_is_email_error(true);
    } else {
      set_is_email_error(false);
    }
  };

  const handleUsernameChange = (e) => {
    set_user_name(e.target.value);
  };
  const handlePasswordChange = (e) => {
    set_password(e.target.value);

    if (e.target.value.length < 6) {
      set_is_pass_error(true);
    } else {
      set_is_pass_error(false);
    }
  };
  const handleSignUp = (e) => {
    handleFormSubmit(e);
  };
  const createStudentAccount = (e) => {
    const url = `${env_config.DEV_URL}/api/user/sign-up`;
    const data = {
      user_name: user_name,
      email: email,
      password: password,
    };
    const config = {};
    axios
      .post(url, data, config)
      .then((ret) => {
        console.log(ret);

        // auth
        const auth_url = `${env_config.DEV_URL}/api/auth`;
        const auth_data = {
          ...data,
        };

        axios
          .post(auth_url, auth_data, config)
          .then((ret) => {
            console.log(ret);

            const title = "Account created!";
            const html = "";
            const timer = 2000;
            const icon = "success";
            swal2Timing(title, html, timer, icon);
          })
          .catch((er) => {
            console.log(er);
          });
      })
      .catch((er) => {
        const title = "Error!";
        const html = "";
        const timer = 2000;
        const icon = "error";
        console.log(er);

        swal2Timing(title, html, timer, icon);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (e.which === 13) {
      createStudentAccount();
    }
    createStudentAccount();
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleFormSubmit(e);
    }
  };

  useEffect(() => {}, []);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onKeyPress={handleKeyPress}
          onSubmit={handleFormSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="Username"
                variant="outlined"
                required
                fullWidth
                id="Username"
                label="Username"
                autoFocus
                onChange={handleUsernameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                className={classes.email}
                onChange={handleEmailChange}
                value={email}
                FormHelperTextProps={{ className: classes.helperText }}
                helperText={is_email_error === true ? "Email invalid!" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                helperText={
                  is_pass_error === true ? "At least 6 characters" : ""
                }
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/user/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
