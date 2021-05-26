import { Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import * as env from "../../config/env.config";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Avatar from "./Avatar";
import CatPrice from "./CatPrice";
import Feedback from "./Feedback";
import FiveRelativeCourse from "./FiveRelativeCourse";
import FullDes from "./FullDes";
import InstructorDes from "./InstructorDes";
import ShortDes from "./ShortDes";
import Syllabus from "./Syllabus";

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

export default function CourseDetail({ match }) {
  const classes = styles();
  const [course_detail, set_course_detail] = React.useState({});
  const [last_updated, set_last_updated] = useState("");
  const [instructor, set_instructor] = React.useState({});
  const [five_relative_course, set_five_relative_course] = React.useState([]);
  const [isLogout, setisLogout] = useState(true);
  const [updateCourseDetail, setUpdateCourseDetail] = useState(false);

  const {
    params: { course_id },
  } = match;

  useEffect(() => {
    // nav
    const isLg = sessionStorage.getItem("isLogout", false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }

    const ins_url = `${env.DEV_URL}/api/course/detail/instructor/${course_id}`;
    const ins_config = ``;
    axios
      .get(ins_url, ins_config)
      .then((ret) => {
        set_instructor(ret.data.course_instructor[0]);
      })
      .catch((er) => {
        console.log(er);
      });

    const relative_url = `${env.DEV_URL}/api/course/detail/five-relative/${course_id}`;
    const relative_url_config = ``;
    axios
      .get(relative_url, relative_url_config)
      .then((ret) => {
        set_five_relative_course(ret.data.five_relative_cat_course);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [updateCourseDetail]);

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />
      <main>
        <Container className={classes.section_header}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Avatar />
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.section_short_des}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ShortDes
                setUpdateCourseDetail={setUpdateCourseDetail}
                updateCourseDetail={updateCourseDetail}
                course_detail={course_detail}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CatPrice course_detail={course_detail} />
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.section_description}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
              <FullDes
                setUpdateCourseDetail={setUpdateCourseDetail}
                updateCourseDetail={updateCourseDetail}
                course_detail={course_detail}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <InstructorDes
                instructor={instructor}
                course_detail={course_detail}
              />
            </Grid>
          </Grid>
        </Container>
      </main>

      <Container className={classes.section_syllabus}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Syllabus course_detail={course_detail} />
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.section_five_course_relative}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FiveRelativeCourse
              setUpdateCourseDetail={setUpdateCourseDetail}
              updateCourseDetail={updateCourseDetail}
              match={match}
              course_detail={course_detail}
              five_relative_course={five_relative_course}
            />
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.section_feedback}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
            <Feedback match={match} />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </React.Fragment>
  );
}
