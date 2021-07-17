import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as env from "../../config/env.config";
import CardFeedback from "../CardFeedback/CardFeedback";
import Rating from "@material-ui/lab/Rating";

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
    display: "flex",
    flexDirection: "column",
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
    fontWeight: 550,
  },
  send_feedback_wrapper: {
    borderTop: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    padding: "15px",
  },
  input: {
    width: "100%",
    marginTop: "10px",
  },
  rating_wrapper: {
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
  },
}));

export default function Feedback({ match, curr_user_id }) {
  const classes = styles();
  const [feedback, set_feedback] = useState([]);
  const [input, setInput] = useState("");
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

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

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("submit!", input, " and ", value);
  };

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
              return (
                <Grid key={i} item xs={12}>
                  <CardFeedback key={i} {...ele} />
                </Grid>
              );
            })}
      </Grid>
      {curr_user_id &&
        feedback.filter((ele) => ele.user_id === curr_user_id).length === 0 && (
          <Grid container spacing={3} className={classes.send_feedback_wrapper}>
            <Box>
              <Typography className={classes.title} variant="h5">
                Share your review about this course
              </Typography>
            </Box>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmitReview}
            >
              <TextField
                id="standard-basic"
                label="Type some review"
                fullWidth
                multiline
                rows={4}
                value={input}
                variant="outlined"
                onChange={(e) => setInput(e.target.value)}
                className={classes.input}
              />
              <Box className={classes.rating_wrapper}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {value !== null && (
                  <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Review
              </Button>
            </form>
          </Grid>
        )}
    </Paper>
  );
}
