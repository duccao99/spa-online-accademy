import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
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

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  btn: {
    marginLeft: 12,
  },
});

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

export default function CatManagement() {
  const classes = useStyles();
  const [all_sub_cat, set_all_sub_cat] = React.useState([]);
  const [count_course, set_count_course] = React.useState([]);

  const config = {};

  function getAllSubCat() {
    const all_sub_cat_url = `${env.DEV_URL}/api/sub-category`;

    axios.get(all_sub_cat_url, config).then((ret) => {
      set_all_sub_cat(ret.data.all_sub_cats);
    });
    return;
  }

  function getCountCourse() {
    const all_sub_cat_url = `${env.DEV_URL}/api/sub-category/count-course-in-sub-cat`;

    axios.get(all_sub_cat_url, config).then((ret) => {
      set_count_course(ret.data.count_course);
    });
    return;
  }

  const handleDelSubCat = (subject_id) => {
    for (let i = 0; i < count_course.length; ++i) {
      if (count_course[i].subject_id === subject_id) {
        const title = "Warning!";
        const html = "There is course exists in sub category!";
        const timer = 2500;
        const icon = "warning";
        swal2Timing(title, html, timer, icon);
        return;
      }
    }

    const all_sub_cat_url = `${env.DEV_URL}/api/sub-category/${subject_id}`;

    axios.delete(all_sub_cat_url, config).then((ret) => {
      const title2 = "Success!";
      const html2 = "Deleted sub category!";
      const timer2 = 2500;
      const icon2 = "success";
      swal2Timing(title2, html2, timer2, icon2);
      getAllSubCat();
    });
    return;
  };

  React.useEffect(() => {
    getAllSubCat();

    getCountCourse();
  }, [all_sub_cat]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="left">Sub category name</TableCell>
            <TableCell align="right">Features</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {all_sub_cat.map((row) => (
            <TableRow hover key={row.name}>
              <TableCell align="center" component="th" scope="row">
                {row.subject_id}
              </TableCell>
              <TableCell align="left">{row.subject_name}</TableCell>
              <TableCell align="right">
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    handleDelSubCat(row.subject_id);
                  }}
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
