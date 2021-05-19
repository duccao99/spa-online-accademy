import { Paper, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Chapter from "./Chapter";

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

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const chapters = [
  {
    name: "chap 1",
    chap_id: 1,
  },
  {
    name: "chap 2",
    chap_id: 2,
  },
];

export default function Syllabus({ course_detail }) {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <Typography component="strong" variant="h4">
            Course syllabus
          </Typography>
        }
        className={classes.root}
      >
        {chapters.map((ele, i) => {
          return <Chapter key={i} {...ele} />;
        })}
      </List>
    </Paper>
  );
}
