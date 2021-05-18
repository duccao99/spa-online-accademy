import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CardCourse from "../CardCourse/CardCourse";
import CommonCarousel from "../Carousel/CommonCarousel";

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
}));

export default function FiveRelativeCourse(props) {
  const classes = styles();
  //   const { five_relative_course } = props;
  const five_relative_course = [1, 2, 3, 4, 5];
  const [first_4_courses, set_first_3_courses] = useState([1, 2, 3, 4]);
  const [second_1_courses, set_second_2_courses] = useState([1]);

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.pb16} variant="h4">
        <strong>Five courses relative category</strong>{" "}
      </Typography>

      <CommonCarousel>
        <Grid container spacing={4}>
          {first_4_courses.map((ele, i) => {
            return (
              <Grid key={i} item xs={12} sm={12} md={3}>
                <CardCourse {...ele} />
              </Grid>
            );
          })}
        </Grid>

        <Grid container spacing={4}>
          {second_1_courses.map((ele, i) => {
            return (
              <Grid key={i} item xs={12} sm={12} md={3}>
                <CardCourse {...ele} />
              </Grid>
            );
          })}
        </Grid>
      </CommonCarousel>
    </Paper>
  );
}
