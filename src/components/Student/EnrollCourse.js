import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import CardFeedback from '../CardFeedback/CardFeedback';
import Footer from '../Footer/Footer';
import * as env from './../../config/env.config';
import { swal2Timing } from './../../config/swal2.config';
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
  course_video: {},
  btn: {
    textTransform: 'capitalize'
  },
  rating_wrapper: {
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center'
  },
  chapter: {
    // 'div.MuiPaper-root': {
    //   backgroundColor: 'red!important',
    //   transition: 'none!important;',
    //   transitionDuration: '0s!important;'
    // },
  }
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
  const [rating, setRating] = useState(3);
  const [userFeedback, setUserFeedback] = useState('');
  const [detail, setDetail] = useState({});
  const [yourFeedback, setYourFeedback] = useState({});
  const [user_name, set_user_name] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  // const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+'
  };

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

  function courseDetail() {
    const course_content_url = `${env.DEV_URL}/api/course/${course_id}`;
    axios.get(course_content_url, {}).then((ret) => {
      setDetail(ret.data.course_detail);
    });
  }

  const handleUploadFeedback = (e) => {
    const data = {
      user_id: +sessionStorage.getItem('user_login_id'),
      course_id: +course_id,
      review_content: userFeedback,
      star: +rating
    };
    const url = `${env.DEV_URL}/api/student/upload-feedback`;
    axios
      .post(url, data, {})
      .then((ret) => {
        const title = 'Success!';
        const html = ret.data.message || 'Uploaded!';
        const timer = 2500;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);
        setIsUpdate(!isUpdate);
      })
      .catch((er) => {
        const title = 'error!';
        const html = er.response.data.message || 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
      });
  };
  function getYourFeedback() {
    const url = `${
      env.DEV_URL
    }/api/student/your-feedback?user_id=${+sessionStorage.getItem(
      'user_login_id'
    )}&course_id=${course_id}`;

    axios
      .get(url, {})
      .then((ret) => {
        if (ret.data.your_feedback === undefined) {
          setYourFeedback(null);
        } else {
          setYourFeedback(ret.data.your_feedback);
        }
      })
      .catch((er) => {
        setYourFeedback(null);
      });
  }

  useEffect(() => {
    // nav
    const isLg = sessionStorage.getItem('isLogout', false);
    const user_id = sessionStorage.getItem('user_login_id');

    getSyllabus();
    courseDetail();
    getYourFeedback();
  }, [isUpdate]);

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />
      <Box my={12}>
        <Container>
          <Grid container spacing={4} className={classes.root}>
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <Typography variant='h6'>{detail.course_name} </Typography>
                <Box my={3}>
                  <Typography variant='h6'>{detail.course_title} </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper className={cn(classes.paper, classes.chapter)}>
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
                <Typography variant='h6'>Your feedback </Typography>
                <Box className={classes.course_video}>
                  {yourFeedback === null ? (
                    "You haven't feedback this course yet!"
                  ) : (
                    <CardFeedback
                      user_id={yourFeedback.user_id}
                      course_id={yourFeedback.course_id}
                      review_content={yourFeedback.review_content}
                      star={yourFeedback.star}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
            {yourFeedback === null && (
              <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                  <form
                    onKeyPress={(e) => {
                      if (e.which === 13) {
                        handleUploadFeedback(e);
                      }
                    }}
                  >
                    <Typography variant='h6'>Upload feedback </Typography>
                    <Box
                      my={3}
                      className={(classes.course_video, classes.rating_wrapper)}
                    >
                      <Rating
                        name='hover-feedback'
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      {rating !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rating]}
                        </Box>
                      )}
                    </Box>
                    <Box my={3} className={classes.course_video}>
                      <ReactQuill
                        value={userFeedback}
                        onChange={setUserFeedback}
                      />
                    </Box>

                    <Box my={3} className={classes.course_video}>
                      <Button
                        onClick={handleUploadFeedback}
                        className={classes.btn}
                        variant='contained'
                        color='primary'
                      >
                        Feedback
                      </Button>
                    </Box>
                  </form>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
