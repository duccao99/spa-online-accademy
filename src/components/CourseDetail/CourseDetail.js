import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Box,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import * as env from "../../config/env.config";
import { render } from "react-dom";

const styles = makeStyles((theme) => ({
  course_detail_wrapper: {},
  section_header: {
    minHeight: 100,
    marginTop: 100,
  },
  course_header_title: {
    textAlign: "left",
  },
  section_short_des: {
    minHeight: 100,
  },
  section_description: {
    minHeight: 100,
  },
  section_syllabus: {
    minHeight: 100,
  },
  section_rating: {},
  section_feedback: {
    marginBottom: 16,
  },
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

const course_detail = {};

export default function CourseDetail({ match }) {
  const classes = styles();
  const [course_detail, set_course_detail] = React.useState({});

  const {
    params: { course_id },
  } = match;

  useEffect(() => {
    const url = `${env.DEV_URL}/api/course/${course_id}`;
    const config = {};
    axios
      .get(url, config)
      .then((ret) => {
        console.log(ret);
        set_course_detail(ret.data.course_detail);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Container className={classes.section_header}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Paper className={classes.paper}>
                <Typography
                  variant="h2"
                  className={classes.course_header_title}
                >
                  {course_detail.course_name}
                </Typography>
                <Typography
                  variant="h4"
                  className={classes.course_header_title}
                >
                  {course_detail.course_title}
                </Typography>
                <Typography
                  variant="h4"
                  className={classes.course_header_title}
                >
                  {course_detail.course_last_updated}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.section_short_des}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <Typography variant="h4">Short description</Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: course_detail.course_short_description,
                  }}
                ></Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                Course cat & price & sales
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.section_description}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8}>
              <Paper className={classes.paper}>
                <Typography variant="h4">Full description</Typography>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: course_detail.course_full_description,
                  }}
                ></Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Paper className={classes.paper}>instructor des</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>

      <Container className={classes.section_syllabus}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>syllabus</Paper>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.section_five_course_relative}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>5 courses relative cat</Paper>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.section_rating}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Course rating & student num rate & stu num enroll{" "}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.section_feedback}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>feedback</Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </React.Fragment>
  );
}
