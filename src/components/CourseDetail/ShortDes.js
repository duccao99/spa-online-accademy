import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Box,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";

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

export default function ShortDes({ course_detail }) {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.des}>
        Short description
      </Typography>
      <Box
        dangerouslySetInnerHTML={{
          __html: course_detail.course_short_description,
        }}
      ></Box>
    </Paper>
  );
}
