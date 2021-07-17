import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ADD_COURSE_TO_CART } from "../../actionTypes/cart.type";
import * as env from "../../config/env.config";
import { SET_ALL_COURSES_PURCHASED } from "./../../actionTypes/purchase.type";

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
  button_wrapper: {
    display: "flex",
    alignItems: "center",
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
  sale: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
    justifyContent: "flex-start",
  },
  price: {
    fontWeight: "500",
    marginRight: "10px",
  },
  del_free: {
    textDecoration: "line-through;",
    fontSize: "12px",
  },
  subject_name: {
    width: "fit-content",
    fontSize: "14px",
    fontWeight: "550",
    color: "grey",
    margin: "5px 0",
    paddingTop: "3px",

    "&:hover": {
      color: "darkGrey",
    },
  },
}));

function CatPrice({
  course_detail,
  is_in_cart,
  dispatchAddToCart,
  setPurchasedListId,
  cart_global_state,
  purchased_id_list,
}) {
  const classes = styles();
  const [course_fee, setcourse_fee] = useState("");
  const [subject_name, setsubject_name] = useState("");
  const [sale_percent, setsale_percent] = useState("");
  const [avg_rate, setavg_rate] = useState("");
  const [num_stu_rate, setnum_stu_rate] = useState("");
  const [num_stu_enrolls, setnum_stu_enrolls] = useState("");
  const { course_id } = useParams();
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [is_in_cart2, set_is_in_cart2] = useState(is_in_cart);
  const [toggle_buy_click, set_toggle_buy_click] = useState(false);
  const [user_role, setUser_role] = useState(0);
  const [is_favorite, set_is_favorite] = useState(false);

  const { course_avatar_url, course_name, course_title } = course_detail;

  const handleAddToCart = (e) => {
    const curr_user_id = sessionStorage.getItem("user_login_id");

    dispatchAddToCart(
      course_id,
      +curr_user_id,
      course_fee,
      course_avatar_url,
      course_name,
      course_title
    );
    setIsAddToCart(true);
  };

  useEffect(() => {
    if (purchased_id_list.length < 1) {
      const curr_user_id = sessionStorage.getItem("user_login_id");
      const url_pruchased_course_id = `${env.DEV_URL}/api/student/purchases-course-id/${curr_user_id}`;
      axios.get(url_pruchased_course_id, {}).then((ret) => {
        setPurchasedListId(ret.data.purchased_courses_id_list);
      });
    }

    if (cart_global_state !== undefined) {
      for (let i = 0; i < cart_global_state.length; ++i) {
        if (cart_global_state[i].course_id === course_id) {
          set_is_in_cart2(true);

          set_toggle_buy_click(!toggle_buy_click);
          break;
        }
      }
    }
  });

  function getIsFavorite(user_id, course_id) {
    let url_is_favo = `${env.DEV_URL}/api/student/is-favorite?course_id=${course_id}&user_id=${user_id}`;

    axios
      .get(url_is_favo, {})
      .then((ret) => {
        set_is_favorite(ret.data.is_favorite);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  const handleFavoriteClick = (e) => {
    const toggle_favorite_url = `${env.DEV_URL}/api/student/toggle-favorite`;
    const data = {
      user_id: +sessionStorage.getItem("user_login_id"),
      course_id: course_id,
      is_favorite: is_favorite,
    };

    axios.patch(toggle_favorite_url, data, {}).then((ret) => {
      getIsFavorite(data.user_id, data.course_id);
    });
  };

  useEffect(() => {
    getIsFavorite(+sessionStorage.getItem("user_login_id"), course_id);
  }, [course_id]);

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

  const handleEnroll = (e) => {
    const url = `${env.DEV_URL}/api/student/enroll`;
    const data = {
      user_id: sessionStorage.getItem("user_login_id"),
      course_id: course_id,
    };
    axios.post(url, data, {}).then((ret) => {});
  };

  return (
    <Paper className={classes.paper}>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Student enroll: </strong>{" "}
          {num_stu_enrolls === undefined || num_stu_enrolls === null
            ? 0
            : num_stu_enrolls}
        </Typography>
      </Box>

      <Box className={classes.box_cat}>
        <Typography>
          <strong>Total review: </strong>{" "}
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
        <Link to={`/courses-list/${subject_name}`}>
          <strong>Category: </strong>
          <Typography className={classes.subject_name} component="a">
            {subject_name}
          </Typography>
        </Link>
      </Box>
      <Box className={classes.box_cat}>
        {sale_percent ? (
          // <React.Fragment>
          <Typography className={(classes.typo, classes.sale)}>
            <Typography className={(classes.typo, classes.price)}>
              Price: $
              {course_fee - Math.floor((course_fee * sale_percent) / 100)}
            </Typography>
            <Typography className={(classes.typo, classes.del_free)}>
              ${course_fee}
            </Typography>
          </Typography>
        ) : (
          <Typography className={(classes.typo, classes.price)}>
            Price: ${course_fee}
          </Typography>
        )}
      </Box>
      <Box className={(classes.box_cat, classes.button_wrapper)}>
        <Box className={classes.box_cat} style={{ marginRight: "25px" }}>
          {user_role === 2 || user_role === 4 ? (
            purchased_id_list && purchased_id_list.indexOf(+course_id) > -1 ? (
              <Link to={`/student/enroll/course/${course_id}`}>
                <Button
                  className={classes.btn}
                  disabled={is_in_cart2 === true}
                  onClick={handleEnroll}
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  Enroll
                </Button>
              </Link>
            ) : (
              <Button
                variant="contained"
                size="small"
                color="primary"
                disabled={is_in_cart2 === true}
                onClick={handleAddToCart}
              >
                {is_in_cart2 === true ? "Added to cart" : "Buy"}
              </Button>
            )
          ) : (
            ""
          )}
        </Box>
        {+user_role === 2 ? (
          <Box>
            {+is_favorite === 1 ? (
              <Button
                variant="contained"
                size="small"
                color="primary"
                disabled={is_in_cart2 === true}
                onClick={handleFavoriteClick}
              >
                Remove from watchlist
              </Button>
            ) : (
              <Link
                onClick={handleFavoriteClick}
                className={(classes.link, classes.favo)}
                // to={`/course/${course_id}`}
              >
                <Button variant="outlined" size="small" color="secondary">
                  Add to watchlist
                </Button>
              </Link>
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Paper>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CatPrice);
