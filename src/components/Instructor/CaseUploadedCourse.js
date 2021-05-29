import { Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as env from '../../config/env.config';
import CardCourse from '../CardCourse/CardCourse';

const styles = makeStyles((theme) => ({}));

export default function CaseUploadedCourse({ email }) {
  const classes = styles();
  const [courses, setCourses] = useState([]);
  const config = {};
  function getUploadedCourse() {
    const url = `${env.DEV_URL}/api/instructor/uploaded-course/${email}`;
    axios.get(url, config).then((ret) => {
      setCourses(ret.data.uploaded_course);
    });
  }

  useEffect(() => {
    getUploadedCourse();
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='h6'>Uploaded course</Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={4}>
          {courses.length > 0
            ? courses.map((card) => {
                return (
                  <Grid key={card.course_id} item xs={12} md={4}>
                    <CardCourse {...card} />
                  </Grid>
                );
              })
            : 'There is no course'}
        </Grid>
      </Grid>
    </Grid>
  );
}
