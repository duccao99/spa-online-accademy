import React from "react";
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import cn from "classnames";
import Moment from "react-moment";
const styles = makeStyles((theme) => ({
  course_banner_info: {
    padding: "15px",
  },
  course_header_title: {
    color: "darkGrey",
  },
  course_header_date: {
    marginTop: "15px",
  },
}));

export default function Title({ last_updated, course_detail }) {
  const classes = styles();

  return (
    <Container className={classes.course_banner}>
      <Box className={classes.course_banner_info}>
        <Typography variant="h4" className={cn(classes.course_name)}>
          {course_detail.course_name}
        </Typography>
        <Typography variant="h5" className={classes.course_header_title}>
          {course_detail.course_title}
        </Typography>
        <Typography variant="p" className={classes.course_header_date}>
          Last updated - &nbsp;
          <Moment format="MM/DD/YYYY HH:MM:SS">{last_updated}</Moment>
        </Typography>
      </Box>
    </Container>
  );
}
