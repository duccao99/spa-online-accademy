import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TableFooter, Box } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import * as env from "../../config/env.config";
import { swal2Timing } from "../../config/swal2.config";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import AddSubCatModal from "../CommonModal/AddSubCatModal";
import RowSubCat from "./CategoryManagement/RowSubCat";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  btn: {
    marginLeft: 12,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DeleteCourse() {
  const classes = useStyles();
  const [courses, setcourses] = React.useState([]);
  const [isDel, setisDel] = React.useState(false);

  const config = {};

  function getAllCourse() {
    const all_course_url = `${env.DEV_URL}/api/course`;

    axios.get(all_course_url, config).then((ret) => {
      setcourses(ret.data.courses);
    });
    return;
  }
  const handleDelCourse = (id) => {
    const del_url = `${env.DEV_URL}/api/course/${id}`;

    axios.delete(del_url, config).then((ret) => {
      const title2 = "Success!";
      const html2 = "Course was deleted !";
      const timer2 = 2500;
      const icon2 = "success";
      swal2Timing(title2, html2, timer2, icon2);
      setisDel(!isDel);
    });
    return;
  };

  React.useEffect(() => {
    getAllCourse();
  }, [isDel]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Course name</TableCell>

            <TableCell align="left">Course fee</TableCell>
            <TableCell align="left">Course views</TableCell>
            <TableCell align="left">Is finished</TableCell>
            <TableCell align="left">Last updated</TableCell>
            <TableCell align="right">Features</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((row) => {
            return (
              <TableRow key={row.course_id} hover>
                <TableCell align="left" component="th" scope="row">
                  {row.course_id}
                </TableCell>

                <TableCell align="left" component="th" scope="row">
                  {row.course_name}
                </TableCell>

                <TableCell align="left" component="th" scope="row">
                  {row.course_fee}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row.views}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row.is_finished}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {row.course_last_updated}
                </TableCell>

                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleDelCourse(row.course_id);
                    }}
                    className={classes.btn}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
