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
import { Link, useParams } from "react-router-dom";

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
  console.log(id);
  return (
    <React.Fragment>
      <Navbar />

      <Container>
        <Box my={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Box my={3}>
                  <Typography variant="h6" component="p">
                    Username:
                  </Typography>
                </Box>
                <Box my={3}>
                  <Typography variant="h6" component="p">
                    Email:
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
