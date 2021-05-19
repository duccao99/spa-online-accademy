import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import cn from "classnames";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserCart from "./UserCart";
import UserPay from "./UserPay";

const styles = makeStyles((theme) => ({
  cart_wrapper: {},
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  user_cart: {
    minHeight: 300,
  },
  user_pay: {
    minHeight: 300,
  },
}));

export default function Cart() {
  const classes = styles();
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Box my={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <UserCart />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <UserPay />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
