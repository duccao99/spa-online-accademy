import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import ItemCard from './ItemCard';

const styles = makeStyles((theme) => ({
  cart_wrapper: {},
  paper: {
    padding: 32,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  user_cart: {
    minHeight: 300
  },
  user_pay: {
    minHeight: 300
  },
  table: {
    minWidth: 650
  },
  cell_title: {
    fontSize: 18
  }
}));

function UserCart(props) {
  const classes = styles();
  const { user_cart, quantity } = props;

  return (
    <Paper className={cn(classes.paper, classes.user_cart)}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell_title}>Course</TableCell>
                  <TableCell className={classes.cell_title} align='center'>
                    Price
                  </TableCell>
                  <TableCell
                    className={classes.cell_title}
                    align='right'
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user_cart.length > 0
                  ? user_cart.map((row, i) => {
                      return <ItemCard {...row} key={i} />;
                    })
                  : 'There is no item in cart'}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    user_cart: state.cartReducer.cart,
    quantity: state.cartReducer.quantity
  };
};

export default connect(mapStateToProps, null)(UserCart);
