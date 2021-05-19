import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Container,
  Paper,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Table,
} from "@material-ui/core";
import cn from "classnames";
import ItemCard from "./ItemCard";

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
  table: {
    minWidth: 650,
  },
  cell_title: {
    fontSize: 18,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function UserCart() {
  const classes = styles();

  return (
    <Paper className={cn(classes.paper, classes.user_cart)}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell_title}>Course</TableCell>
                  <TableCell className={classes.cell_title} align="center">
                    Price
                  </TableCell>
                  <TableCell
                    className={classes.cell_title}
                    align="right"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => {
                  return <ItemCard {...row} key={i} />;
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
