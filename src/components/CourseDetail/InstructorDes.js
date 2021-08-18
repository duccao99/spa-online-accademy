import { makeStyles, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as env from '../../config/env.config';

const common_fontsize = 18;
const styles = makeStyles((theme) => ({
  course_detail_wrapper: {},
  ava_course: {},
  section_header: {
    minHeight: 100,
    marginTop: 100
  },
  course_name: {
    fontWeight: 'bold'
  },
  course_header_title: {
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 12,
    color: 'white'
  },
  section_short_des: {
    minHeight: 100,
    fontSize: common_fontsize
  },
  des: {
    fontWeight: 'bold'
  },
  section_description: {
    minHeight: 100,
    fontSize: common_fontsize
  },
  section_syllabus: {
    minHeight: 100,
    fontSize: common_fontsize
  },
  section_rating: {},
  section_feedback: {
    marginBottom: 16
  },
  paper: {
    padding: 32,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: 16
  },
  box_cat: {
    padding: 12,
    '& .MuiTypography-root': {
      fontSize: common_fontsize
    }
  },
  ins_title: {
    paddingTop: 12,
    paddingBottom: 12
  },
  title: {
    paddingTop: 12,
    paddingBottom: 12,
    color: 'black',
    fontWeight: 500
  }
}));

export default function InstructorDes({}) {
  const classes = styles();
  const [instructor, set_instructor] = useState({});
  const [ownCourseQuantity, setOwnCourseQuantity] = useState(1);

  const { course_id } = useParams();

  function getInstructor() {
    const ins_url = `${env.DEV_URL}/api/course/detail/instructor/${course_id}`;
    const ins_config = ``;
    axios
      .get(ins_url, ins_config)
      .then((ret) => {
        set_instructor(ret.data);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  const getOwnCourseQuantity = (instructor_id) => {
    if (instructor_id) {
      const ins_url = `${env.DEV_URL}/api/instructor/ownCourseQuantity`;
      axios
        .post(ins_url, { instructor_id: +instructor_id })
        .then((ret) => {
          setOwnCourseQuantity(ret.data.own_course_quantity);
        })
        .catch((er) => {
          console.log(er.response);
        });
    }
  };

  useEffect(() => {
    getInstructor();
  }, [course_id]);

  useEffect(() => {
    if (instructor && instructor.user_id) {
      getOwnCourseQuantity(instructor.user_id);
    }
  }, [instructor]);

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h6'>
        <strong>Instructor information</strong>
      </Typography>
      <Typography className={classes.ins_title} variant='h6'>
        {instructor && (
          <React.Fragment>
            <strong>Name: </strong>
            {instructor.user_name}
          </React.Fragment>
        )}
      </Typography>

      <Typography className={classes.ins_title} variant='h6'>
        {instructor && (
          <React.Fragment>
            <strong>Email: </strong> {instructor.email}
          </React.Fragment>
        )}
      </Typography>

      <Typography className={classes.ins_title} variant='h6'>
        {instructor && (
          <React.Fragment>
            <strong>Courses: </strong> {ownCourseQuantity}
          </React.Fragment>
        )}
      </Typography>
    </Paper>
  );
}
