import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as env from "../../config/env.config";
import axios from "axios";

import CardFeedback from "../CardFeedback/CardFeedback";

const common_fontsize = 18;
const styles = makeStyles((theme) => ({
  course_detail_wrapper: {},
  ava_course: {},
  section_header: {
    minHeight: 100,
    marginTop: 100,
  },
  course_name: {
    fontWeight: "bold",
  },
  course_header_title: {
    textAlign: "left",
    paddingTop: 12,
    paddingBottom: 12,
    color: "white",
  },
  section_short_des: {
    minHeight: 100,
    fontSize: common_fontsize,
  },
  des: {
    fontWeight: "bold",
  },
  section_description: {
    minHeight: 100,
    fontSize: common_fontsize,
  },
  section_syllabus: {
    minHeight: 100,
    fontSize: common_fontsize,
  },
  section_rating: {},
  section_feedback: {
    marginBottom: 16,
  },
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
    marginBottom: 16,
  },
  box_cat: {
    padding: 12,
    "& .MuiTypography-root": {
      fontSize: common_fontsize,
    },
  },
  pb16: {
    paddingBottom: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  title: {
    color: "black",
    fontWeight: 500,
  },
}));

export default function Feedback({ match }) {
  const classes = styles();
  const fb = [1, 2, 3, 4, 5];
  const [feedback, set_feedback] = useState([]);
  const [no_feedback, set_no_feedback] = useState(false);

  const {
    params: { course_id },
  } = match;

  function getFeedback() {
    if (course_id !== undefined) {
      const feedback_url = `${env.DEV_URL}/api/course/detail/feedback/${course_id}`;
      const config = {};
      axios.get(feedback_url, config).then((ret) => {
        if (ret.data.feedback.length === 0) {
          return set_no_feedback(true);
        }
        if (ret.data.feedback === undefined) {
          return set_no_feedback(true);
        }

        set_feedback(ret.data.feedback);
      });
    }
    return;
  }

  useEffect(() => {
    getFeedback();
  }, [course_id]);
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h5">
            Feedbacks
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {no_feedback
          ? "There is no feedback"
          : feedback.map((ele, i) => {
              return (
                <Grid key={i} item xs={12}>
                  <CardFeedback key={i} {...ele} />
                </Grid>
              );
            })}
      </Grid>
    </Paper>
  );
}
