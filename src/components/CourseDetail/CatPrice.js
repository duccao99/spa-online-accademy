import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as env from "../../config/env.config";
import axios from "axios";

import cn from "classnames";
import { debounce } from "lodash";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_COURSE_TO_CART } from "../../actionTypes/cart.type";
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

function CatPrice({ course_detail, dispatchAddToCart }) {
  const classes = styles();
  const [course_fee, setcourse_fee] = useState("");
  const [subject_name, setsubject_name] = useState("");
  const [sale_percent, setsale_percent] = useState("");
  const [avg_rate, setavg_rate] = useState("");
  const [num_stu_rate, setnum_stu_rate] = useState("");
  const [num_stu_enrolls, setnum_stu_enrolls] = useState("");
  const { course_id } = useParams();
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [user_role, setUser_role] = useState(0);

  const handleAddToCart = (e) => {
    const curr_user_id = sessionStorage.getItem("user_login_id");

    dispatchAddToCart(
      course_detail.course_id,
      +curr_user_id,
      course_detail.course_fee,
      course_detail.course_avatar_url,
      course_detail.course_name,
      course_detail.course_title
    );
    setIsAddToCart(true);
  };

  useEffect(() => {
    // role
    const user_role = sessionStorage.getItem("user_role");
    setUser_role(+user_role);
    const config = {};
    const cat_price_num_url = `${env.DEV_URL}/api/course/detail/cat-price-num/${course_id}`;
    axios
      .get(cat_price_num_url, config)
      .then((ret) => {
        setnum_stu_enrolls(ret.data.cat_price_num.num_stu_enrolls);
        setsubject_name(ret.data.cat_price_num.subject_name);
        setcourse_fee(ret.data.cat_price_num.course_fee);
        setsale_percent(ret.data.cat_price_num.sale_percent);
        setavg_rate(ret.data.cat_price_num.avg_rate);
        setnum_stu_rate(ret.data.cat_price_num.num_stu_rate);
        setnum_stu_enrolls(ret.data.cat_price_num.num_stu_enrolls);
      })
      .catch((er) => {
        setnum_stu_enrolls(undefined);

        setsubject_name(undefined);
        setcourse_fee(undefined);
        setsale_percent(undefined);
        setavg_rate(undefined);
        setnum_stu_rate(undefined);
        setnum_stu_enrolls(undefined);
      });
  }, [isAddToCart, course_id]);

  return (
    <Paper className={classes.paper}>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Number student enroll: </strong>{" "}
          {num_stu_enrolls === undefined || num_stu_enrolls === null
            ? 0
            : num_stu_enrolls}
        </Typography>
      </Box>

      <Box className={classes.box_cat}>
        <Typography>
          <strong>Number student rating: </strong>{" "}
          {num_stu_rate === undefined || num_stu_rate === null
            ? 0
            : num_stu_rate}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Average rating: </strong>
          {avg_rate === undefined || avg_rate === null ? 0 : avg_rate}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Category: </strong> {course_detail.subject_name}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Price: </strong>
          {course_fee === undefined || course_fee === null ? 0 : course_fee}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          {sale_percent === undefined || sale_percent === null ? (
            <div>
              <strong>Sale: </strong>0
            </div>
          ) : (
            <React.Fragment>
              <strong>Sale: </strong>
              {sale_percent}
            </React.Fragment>
          )}
        </Typography>
      </Box>

      <Box className={classes.box_cat}>
        {user_role === 2 || user_role === 4 ? (
          <Button
            onClick={handleAddToCart}
            disabled={isAddToCart}
            fullWidth
            variant="contained"
          >
            Add to cart
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Paper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddToCart: (
      course_id,
      user_id,
      course_price,
      course_ava,
      course_name,
      course_title
    ) => {
      dispatch({
        type: ADD_COURSE_TO_CART,
        payload: {
          course_id: course_id,
          course_price: course_price,
          course_ava: course_ava,
          course_name: course_name,
          course_title: course_title,
          user_id: user_id,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(CatPrice);
