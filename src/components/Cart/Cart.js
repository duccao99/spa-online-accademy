import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
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

function Cart(props) {
  const classes = styles();
  const { cart_global } = props;

  const [cart, set_cart] = useState([]);

  useEffect(() => {
    set_cart(cart_global);
  }, []);

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
              <UserPay cart={cart} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cart_global: state.cartReducer.cart,
  };
};

export default connect(mapStateToProps, null)(Cart);
