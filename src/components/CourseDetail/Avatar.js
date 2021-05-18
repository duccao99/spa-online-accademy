import { makeStyles, Paper, Typography } from "@material-ui/core";
import cn from "classnames";
import React from "react";
import Moment from "react-moment";
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
}));

export default function Avatar({ course_detail, last_updated }) {
  const classes = styles();

  return (
    <Paper
      style={{
        backgroundImage: `url(${course_detail.course_avatar_url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className={cn(classes.paper, classes.ava_course)}
    >
      <Typography
        variant="h4"
        className={cn(classes.course_header_title, classes.course_name)}
      >
        {course_detail.course_name}
      </Typography>
      <Typography variant="h4" className={classes.course_header_title}>
        {course_detail.course_title}
      </Typography>
      <Typography variant="h6" className={classes.course_header_title}>
        Last updated - &nbsp;
        <Moment format="MM/DD/YYYY HH:MM:SS">{last_updated}</Moment>
      </Typography>
    </Paper>
  );
}
