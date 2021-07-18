import { Button, TableFooter, Typography, Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import React from "react";
import * as env from "../../../config/env.config";
import { swal2Timing } from "../../../config/swal2.config";
import AddSubCatModal from "../../CommonModal/AddSubCatModal";
import RowSubCat from "./RowSubCat";

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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default function CatManagement() {
  const classes = useStyles();
  const [all_sub_cat, set_all_sub_cat] = React.useState([]);
  const [count_course, set_count_course] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const config = {};

  const openModal = (e) => {
    setOpen(true);
  };

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
        const timer = 3500;
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
  }, [all_sub_cat, open]);

  return (
    <React.Fragment>
      <Box mb={3} className={classes.header}>
        <Typography variant="h6">Category management</Typography>
        <Button onClick={openModal} variant="contained">
          Add sub category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Sub category name</TableCell>
              <TableCell align="left">Category name</TableCell>
              <TableCell align="right">Features</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {all_sub_cat.map((row) => {
              return (
                <RowSubCat
                  handleDelSubCat={handleDelSubCat}
                  key={row.subject_id}
                  row={row}
                />
              );
            })}
          </TableBody>
          <AddSubCatModal open={open} setOpen={setOpen} />
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
