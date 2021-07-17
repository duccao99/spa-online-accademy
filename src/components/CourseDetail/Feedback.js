import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as env from "../../config/env.config";
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
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
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

export default function Feedback({ match, curr_user_id }) {
  const classes = styles();
  const [feedback, set_feedback] = useState([]);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const {
    params: { course_id },
  } = match;

  function getFeedback() {
    if (course_id !== undefined) {
      const feedback_url = `${env.DEV_URL}/api/course/detail/feedback/${course_id}`;
      const config = {};
      axios.get(feedback_url, config).then((ret) => {
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
            Reviews about this course
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {feedback && feedback.length === 0
          ? "There is no feedback yet"
          : feedback.map((ele, i) => {
              console.log(ele);
              return (
                <Grid key={i} item xs={12}>
                  <CardFeedback key={i} {...ele} />
                </Grid>
              );
            })}
      </Grid>
      {curr_user_id &&
        feedback.filter((ele) => ele.user_id === curr_user_id).length === 0 && (
          <Grid container spacing={3}>
            <Typography variant="h5">
              Share your review about this course...
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="Standard" />
              <Button>Submit</Button>
            </form>
          </Grid>
        )}
    </Paper>
  );
}
