import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import validator from "validator";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import * as env_config from "../../config/env.config";
import { Link } from "react-router-dom";

import Copyright from "./../Copyright/Copyright";

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helperText: {
    color: "red",
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

export default function SignIn() {
  const classes = useStyles();
  const [is_error_email, set_is_error_email] = useState(false);
  const [is_error_password, set_is_error_password] = useState(false);
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    set_email(e.target.value);
    if (validator.isEmail(e.target.value) === false) {
      set_is_error_email(true);
    } else {
      set_is_error_email(false);
    }
  };

  const handlePasswordChange = (e) => {
    set_password(e.target.value);
    if (e.target.value.length < 6) {
      set_is_error_password(true);
    } else {
      set_is_error_password(false);
    }
  };
  const handleFormOnkeypress = (e) => {
    if (e.which === 13) {
      handleFormSubmit(e);
    }
  };
  const handleBtnSignInClick = (e) => {
    handleFormSubmit(e);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = `${env_config.DEV_URL}/api/user/sign-in`;
    const data = {
      email,
      password,
    };
    const config = {};

    axios
      .post(url, data, config)
      .then((ret) => {
        // auth
        const auth_url = `${env_config.DEV_URL}/api/auth`;
        const auth_data = {
          ...data,
        };

        console.log(ret);

        axios
          .post(auth_url, auth_data, config)
          .then((ret) => {
            console.log(ret);
            sessionStorage.setItem(
              "access_token",
              JSON.stringify(ret.data.accessToken)
            );

            history.push("/");
          })
          .catch((er) => {
            console.log(er);
          });
      })
      .catch((er) => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleFormSubmit}
          onKeyPress={handleFormOnkeypress}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            onChange={handleEmailChange}
            FormHelperTextProps={{
              className: classes.helperText,
            }}
            helperText={is_error_email === true ? "Email invalid!" : ""}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            FormHelperTextProps={{
              className: classes.helperText,
            }}
            helperText={
              is_error_password === true ? "At least 6 characters!" : ""
            }
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleBtnSignInClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                className={classes.link}
                to="/user/forgot-password"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/user/sign-up" variant="body2">
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
