import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import * as env from './../../config/env.config';
import Navbar from './../Navbar/Navbar';
import CourseChapter from './CourseChapter';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    minHeight: 200,
    padding: 32
  },
  course_video: {}
}));

export default function EnrollCourse() {
  const classes = styles();
  const [enrollCourses, setEnrollCourses] = useState([1, 2, 3]);
  const { course_id } = useParams();

  const [syllabus, setsyllabus] = useState([]);
  const [update, setupdate] = useState(false);
  const [chapters, setchapters] = useState([]);
  const [lessons, setlessons] = useState([]);
  const [isLogout, setisLogout] = useState(true);

  function getSyllabus() {
    const url = `${env.DEV_URL}/api/course/detail/syllabus/${+course_id}`;
    axios.get(url, {}).then((ret) => {
      setsyllabus(ret.data.course_syllabus);

      let array = ret.data.course_syllabus;
      var flags = [],
        unique_chapter = [],
        lesson_of_chap = [],
        l = ret.data.course_syllabus.length,
        i;

      for (i = 0; i < l; ++i) {
        if (
          array[i].lesson_id !== null &&
          array[i].lesson_name !== null &&
          array[i].lesson_video_url !== null &&
          array[i].flag_reviewable !== null &&
          array[i].lesson_content !== null &&
          array[i].chap_id !== null
        ) {
          lesson_of_chap.push({
            lesson_id: array[i].lesson_id,
            lesson_name: array[i].lesson_name,
            lesson_video_url: array[i].lesson_video_url,
            flag_reviewable: array[i].flag_reviewable,
            lesson_content: array[i].lesson_content,
            chap_id: array[i].chap_id
          });
        }

        if (flags[array[i].chap_id]) continue;

        flags[array[i].chap_id] = true;

        if (array[i].chap_id !== null && array[i].chap_name !== null) {
          unique_chapter.push({
            chap_id: array[i].chap_id,
            chap_name: array[i].chap_name
          });
        }
      }

      setchapters(unique_chapter);
      setlessons(lesson_of_chap);
    });
  }

  function getCourseContent(course_id, user_id) {
    const course_content_url = `${env.DEV_URL}/api/course/`;
  }

  function getFeedback(course_id) {}

  useEffect(() => {
    // nav
    const isLg = sessionStorage.getItem('isLogout', false);
    const user_id = sessionStorage.getItem('user_login_id');

    getSyllabus();
    getCourseContent(course_id, +user_id);
    getFeedback(course_id);
  }, []);

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />
      <Box my={12}>
        <Container>
          <Grid container spacing={4} className={classes.root}>
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <Typography variant='h6'>Chapter </Typography>
                <Box className={classes.course_video}>
                  {chapters.map((ele, i) => {
                    return <CourseChapter lessons={lessons} {...ele} key={i} />;
                  })}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <Typography variant='h6'>Upload feedback </Typography>
                <Box className={classes.course_video}> dasds </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
