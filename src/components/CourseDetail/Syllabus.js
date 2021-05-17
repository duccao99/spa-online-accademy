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
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import * as env from "../../config/env.config";
import { render } from "react-dom";
import Moment from "react-moment";
import cn from "classnames";
import Avatar from "./Avatar";
import ShortDes from "./ShortDes";
import CatPrice from "./CatPrice";
import FullDes from "./FullDes";
import InstructorDes from "./InstructorDes";

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

export default function Syllabus({ course_detail }) {
  const classes = styles();

  return <Paper className={classes.paper}>syllabus</Paper>;
}
