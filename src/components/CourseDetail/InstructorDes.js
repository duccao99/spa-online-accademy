import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

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
  ins_title: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    paddingTop: 12,
    paddingBottom: 12,
    color: "black",
    fontWeight: 500,
  },
}));

export default function InstructorDes({ course_detail, instructor }) {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h6">
        <strong>Instructor information</strong>
      </Typography>
      <Typography className={classes.ins_title} variant="h6">
        <strong>Name: {instructor.user_name} </strong>
      </Typography>

      <Typography className={classes.ins_title} variant="h6">
        <strong>Email: </strong> {instructor.email}
      </Typography>
    </Paper>
  );
}
