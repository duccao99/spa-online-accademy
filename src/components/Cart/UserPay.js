import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import cn from "classnames";
import React from "react";
import { connect } from "react-redux";
import { CLEAR_CART } from "../../actionTypes/cart.type";
import * as env from "../../config/env.config";
import { swal2Timing } from "../../config/swal2.config";

const styles = makeStyles((theme) => ({
  cart_wrapper: {},
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  user_cart: {
    minHeight: 200,
  },
  user_pay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 200,
  },
  pay_title: {
    color: "black",
  },
}));

function UserPay(props) {
  const classes = styles();
  const { cart_global, dispatchClearCart } = props;

  const handleCheckout = (e) => {
    const add_order_url = `${env.DEV_URL}/api/order/add`;
    const money = cart_global.reduce((prev, curr) => {
      return prev + curr.course_price;
    }, 0);
    let course_ids = [];

    for (let i = 0; i < cart_global.length; ++i) {
      course_ids.push(cart_global[i].course_id);
    }

    const data = {
      user_id: cart_global[0].user_id,
      course_ids,
      total_money: money,
    };
    const config = {};
    axios.post(add_order_url, data, config).then((ret) => {
      const title = "Checkout!";
      const html = "Checkout success!";
      const timer = 2500;
      const icon = "success";

      swal2Timing(title, html, timer, icon);

      dispatchClearCart();
    });
  };

  return (
    <Paper className={cn(classes.paper, classes.user_pay)}>
      <Box my={1}>
        <Typography className={classes.pay_title} variant="h5">
          Total:{" "}
          {cart_global.reduce((prev, curr) => {
            return prev + curr.course_price;
          }, 0)}{" "}
          $
        </Typography>
      </Box>
      {/* <Box my={1}>
        <Typography className={classes.pay_title} variant="h5">
          Discount: 11%
        </Typography>
      </Box> */}
      <Box my={1}>
        <Button variant="contained" fullWidth onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    cart_global: state.cartReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchClearCart: () => {
      dispatch({
        type: CLEAR_CART,
        payload: "",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPay);
