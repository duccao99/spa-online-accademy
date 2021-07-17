import { Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as env from "../../config/env.config";
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
import { SET_ALL_COURSES_PURCHASED } from "./../../actionTypes/purchase.type";
import { connect } from "react-redux";

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

const CourseDetail = ({
  match,
  setPurchasedListId,
  purchased_id_list,
  cart_global_state,
}) => {
  const classes = styles();
  const [course_detail, set_course_detail] = React.useState({});
  const [last_updated, set_last_updated] = useState("");
  const [instructor, set_instructor] = React.useState({});
  const [five_relative_course, set_five_relative_course] = React.useState([]);
  const [isLogout, setisLogout] = useState(true);
  const [is_in_cart, set_is_in_cart] = useState(false);
  const [toggle_buy_click, set_toggle_buy_click] = useState(false);
  const [updateCourseDetail, setUpdateCourseDetail] = useState(false);

  const {
    params: { course_id },
  } = match;

  const curr_user_id = sessionStorage.getItem("user_login_id");

  function getCourseDetail() {
    const url = `${env.DEV_URL}/api/course/${course_id}`;
    const config = {};
    axios
      .get(url, config)
      .then((ret) => {
        set_course_detail(ret.data.course_detail);
        const last_updated = new Date(
          `${ret.data.course_detail.course_last_updated}`
        );
        set_last_updated(last_updated);
      })
      .catch((er) => {
        console.log(er);
      });
  }

  useEffect(() => {
    // nav
    const isLg = sessionStorage.getItem("isLogout", false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }

    getCourseDetail();

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

  useEffect(() => {
    if (!purchased_id_list) {
      const url_pruchased_course_id = `${env.DEV_URL}/api/student/purchases-course-id/${curr_user_id}`;
      axios.get(url_pruchased_course_id, {}).then((ret) => {
        setPurchasedListId(ret.data.purchased_courses_id_list);
      });
    }

    if (cart_global_state !== undefined) {
      for (let i = 0; i < cart_global_state.length; ++i) {
        if (cart_global_state[i].course_id === course_id) {
          set_is_in_cart(true);

          set_toggle_buy_click(!toggle_buy_click);
          break;
        }
      }
    }
  });

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
              <CatPrice
                course_detail={course_detail}
                purchased_id_list={purchased_id_list}
                is_in_cart={is_in_cart}
              />
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
              <InstructorDes />
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
          <Grid item xs={12} sm={12}>
            <Feedback
              match={match}
              curr_user_id={curr_user_id}
              purchased_id_list={purchased_id_list}
            />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cart_global_state: state.cartReducer.cart,
    purchased_id_list: state.purchasedCourseReducer.purchased_id_list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPurchasedListId: (purchase_list_id) => {
      dispatch({
        type: SET_ALL_COURSES_PURCHASED,
        payload: purchase_list_id,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
