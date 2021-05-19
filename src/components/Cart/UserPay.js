import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Container,
  Button,
  Paper,
} from "@material-ui/core";
import cn from "classnames";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 300,
  },
  pay_title: {
    color: "black",
  },
}));

export default function UserPay() {
  const classes = styles();

  return (
    <Paper className={cn(classes.paper, classes.user_pay)}>
      <Box my={1}>
        <Typography className={classes.pay_title} variant="h5">
          Total: 11$
        </Typography>
      </Box>
      <Box my={1}>
        <Typography className={classes.pay_title} variant="h5">
          Discount: 11%
        </Typography>
      </Box>
      <Box my={1}>
        <Button variant="contained" fullWidth>
          Checkout
        </Button>
      </Box>
    </Paper>
  );
}
