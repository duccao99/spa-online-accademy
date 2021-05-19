import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardCat({ cat }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {cat.cat_name}
      </TableCell>
      <TableCell align="right">{cat.subject_name}</TableCell>
      <TableCell align="right">{cat.num_student_enroll}</TableCell>
    </TableRow>
  );
}
