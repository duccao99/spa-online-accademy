import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
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
  const [isLogout, setisLogout] = useState(true);

  useEffect(() => {
    let user_name = sessionStorage.getItem("user_name");
    let email = sessionStorage.getItem("email");

    const isLg = sessionStorage.getItem("isLogout", false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }

    if (user_name === "") {
      return set_user_name(undefined);
    } else if (user_name === undefined) {
      return set_user_name(undefined);
    } else if (user_name === null) {
      return set_user_name(undefined);
    }
    user_name = user_name.substring(1, user_name.length - 1);
    email = email.substring(1, email.length - 1);

    set_user_name(user_name);
    set_email(email);
  }, []);
  return user_name === undefined ? (
    <Redirect to="/" />
  ) : (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />

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
