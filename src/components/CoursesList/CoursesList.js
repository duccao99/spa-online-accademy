import { Container, makeStyles, Paper, Grid } from "@material-ui/core";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LeftCat from "../LeftCat/LeftCat";
import Searchbar from "./Searchbar";
import CardCourse from "../CardCourse/CardCourse";
import Pagination from "./Pagination";
const style = makeStyles((theme) => ({
  main_course_list_wrapper: {
    flexGrow: 1,
    marginTop: 100,
    marginBottom: 100,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  course_list: {
    marginTop: 14,
    marginBottom: 14,
  },
  pagination: {
    "& ul.MuiPagination-ul": {
      justifyContent: "flex-end",
    },
  },
}));

const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function CoursesList() {
  const classes = style();
  return (
    <React.Fragment>
      <Navbar />

      <main>
        <Container className={classes.main_course_list_wrapper} maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Paper className={classes.paper}>
                <LeftCat />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Paper className={classes.paper}>
                <Searchbar />

                <Grid container spacing={4} className={classes.course_list}>
                  {courses.map((ele, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={3} lg={3}>
                        <CardCourse />
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid container spacing={4}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.pagination}
                  >
                    <Pagination />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>

      <Footer />
    </React.Fragment>
  );
}
