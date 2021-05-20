import { Container, makeStyles, Paper, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LeftCat from "../LeftCat/LeftCat";
import Searchbar from "./Searchbar";
import CardCourse from "../CardCourse/CardCourse";
import Pagination from "./Pagination";
import cn from "classnames";
import axios from "axios";
import * as env from "../../config/env.config";
import { Link, useParams } from "react-router-dom";
import { debounce } from "lodash";
const style = makeStyles((theme) => ({
  main_course_list_wrapper: {
    flexGrow: 1,
    marginTop: 100,
    marginBottom: 100,
  },

  paper: {
    padding: 32,
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
  left_cat: {
    position: "sticky",
    top: 32,
    padding: 16,
  },
}));

const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function CoursesList() {
  const classes = style();
  const [all_courses_finished, set_all_courses_finished] = useState([]);
  const [total_pagi_stuff, set_total_pagi_stuff] = useState([]);
  const [curr_page, set_curr_page] = useState([]);
  const [search_value, set_search_value] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      set_search_value("");
      debounce(() => {
        const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/byCat/${id}`;
        const config = {};
        axios.get(all_courses_by_subcat_url, config).then((ret) => {
          console.log(ret);
          set_all_courses_finished(ret.data.course_by_sub_cat);
          set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
          set_curr_page(ret.data.curr_pagi);
        });
      }, 200)();
    } else {
      debounce(() => {
        const all_course_finished_url = `${env.DEV_URL}/api/course/all-with-finished`;
        const config = {};
        axios.get(all_course_finished_url, config).then((ret) => {
          set_all_courses_finished(ret.data.all_courses_finished);
          set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
          set_curr_page(ret.data.curr_page);
        });
      }, 200)();
    }

    if (search_value) {
      debounce(() => {
        const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/by-full-text-search/${search_value}`;
        const config = {};
        axios.get(all_courses_by_subcat_url, config).then((ret) => {
          set_all_courses_finished(ret.data.all_courses);
          set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
          set_curr_page(ret.data.curr_pagi);
        });
      }, 500)();
    }
  }, [id, search_value]);

  const handlePagiChange = (event, value) => {
    set_curr_page(value);
    const config = {
      params: {
        pagi: value,
      },
    };

    if (search_value) {
      debounce(() => {
        const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/by-full-text-search/${search_value}`;

        axios.get(all_courses_by_subcat_url, config).then((ret) => {
          set_all_courses_finished(ret.data.all_courses);
          set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
          set_curr_page(ret.data.curr_pagi);
        });
      }, 500)();
    } else {
      if (id !== undefined) {
        set_search_value("");
        debounce(() => {
          const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/byCat/${id}`;

          axios.get(all_courses_by_subcat_url, config).then((ret) => {
            set_all_courses_finished(ret.data.course_by_sub_cat);
            set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
            set_curr_page(ret.data.curr_pagi);
          });
        }, 200)();
      } else {
        debounce(() => {
          const all_course_finished_url = `${env.DEV_URL}/api/course/all-with-finished`;

          axios.get(all_course_finished_url, config).then((ret) => {
            set_all_courses_finished(ret.data.all_courses_finished);
            set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
            set_curr_page(ret.data.curr_page);
          });
        }, 200)();
      }
    }
  };
  return (
    <React.Fragment>
      <Navbar />

      <main>
        <Container className={classes.main_course_list_wrapper} maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Paper className={cn(classes.paper, classes.left_cat)}>
                <LeftCat />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Paper className={classes.paper}>
                <Searchbar
                  set_search_value={set_search_value}
                  search_value={search_value}
                  all_courses={all_courses_finished}
                />

                <Grid container spacing={4} className={classes.course_list}>
                  {all_courses_finished !== undefined &&
                  all_courses_finished.length !== 0
                    ? all_courses_finished.map((ele, i) => {
                        return (
                          <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
                            <CardCourse {...ele} />
                          </Grid>
                        );
                      })
                    : "No course!"}
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
                    <Pagination
                      curr_page={curr_page}
                      handlePagiChange={handlePagiChange}
                      set_curr_page={set_curr_page}
                      total_pagi_stuff={total_pagi_stuff}
                    />
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
