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
  Row,
} from "@material-ui/core";
import cn from "classnames";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
  card_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ava_wrapper: {
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ava: {},
  full_hw: {
    height: "100%",
    width: "100%",
  },
  media: {
    height: 140,
  },

  course_name_wrap: {},
  course_name: {},
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
}));

export default function ItemCard({ name }) {
  const classes = styles();

  return (
    <TableRow hover key={name}>
      <TableCell component="th" scope="row">
        <Box className={classes.ava_wrapper}>
          <Box className={cn(classes.ava, classes.full_hw)}>
            <Card className={classes.full_hw}>
              <CardActionArea className={classes.full_hw}>
                <CardMedia
                  className={classes.media}
                  image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
          </Box>
          <Box className={cn(classes.course_name_wrap)} mx={6}>
            <Box mb={1} className={classes.course_name}>
              <Typography variant="h5" component="strong">
                name
              </Typography>
            </Box>
            <Box className={classes.course_title}>
              <Typography component="p">title</Typography>
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">10$</TableCell>
      <TableCell align="right">
        <Link className={classes.link} to="/">
          <Button variant="contained">Remove</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
