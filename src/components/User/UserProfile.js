import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  makeStyles,
  Box,
  Grid,
  Container,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { Link, Redirect, useParams } from "react-router-dom";

import Change from "./Change";

const styles = makeStyles((theme) => ({
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  group_btn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  btn: {
    fontSize: 12,
    textTransform: "initial",
    justifyContent: "flex-end",
  },
}));

export default function UserProfile() {
  const classes = styles();
  let { id } = useParams();
  const [user_name, set_user_name] = useState("");
  const [email, set_email] = useState("");

  console.log(id);

  useEffect(() => {
    let user_name = sessionStorage.getItem("user_name");
    let email = sessionStorage.getItem("email");

    if (user_name === "") {
      return set_user_name(undefined);
    } else if (user_name === undefined) {
      return set_user_name(undefined);
    } else if (user_name === null) {
      return set_user_name(undefined);
    }
    user_name = user_name.substring(1, user_name.length - 1);
    email = email.substring(1, email.length - 1);

    console.log(user_name, email);

    set_user_name(user_name);
    set_email(email);
  }, []);
  return user_name === undefined ? (
    <Redirect to="/" />
  ) : (
    <React.Fragment>
      <Navbar />

      <Container>
        <Box my={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Box my={3}>
                  <Typography variant="h6" component="p">
                    Username: {user_name}
                  </Typography>
                </Box>
                <Box my={3}>
                  <Typography variant="h6" component="p">
                    Email: {email}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Change />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
