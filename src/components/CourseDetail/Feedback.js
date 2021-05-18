import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
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
}));

export default function Feedback(props) {
  const classes = styles();
  //   const { feedback } = props;
  const fb = [1, 2, 3, 4, 5];

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="strong" variant="h4">
            Feedbacks
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {fb.map((ele, i) => {
          return (
            <Grid item xs={12}>
              <CardFeedback key={i} />;
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
