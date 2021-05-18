import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

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
    paddingTop: 12,
    paddingBottom: 12,
    "& .MuiTypography-root": {
      fontSize: common_fontsize,
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },

  btn_add_to_cart: {
    width: "100%",
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
}));

export default function CatPrice({ course_detail }) {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Number student enroll: </strong> 10
        </Typography>
      </Box>

      <Box className={classes.box_cat}>
        <Typography>
          <strong>Number student rating: </strong> 10
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Average rating: </strong> 10
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Category: </strong> {course_detail.subject_name}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Price: </strong> {course_detail.course_fee}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Sale: </strong> {course_detail.course_fee}
        </Typography>
      </Box>

      <Box className={classes.box_cat}>
        <Link
          to={`/add-to-cart/course/${1}`}
          className={classes.btn_add_to_cart}
        >
          <Button fullWidth variant="contained">
            Add to cart
          </Button>
        </Link>
      </Box>
    </Paper>
  );
}
