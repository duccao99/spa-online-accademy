import { Box } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import cn from "classnames";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_COURSE_TO_CART } from "../../actionTypes/cart.type";
import * as env from "../../config/env.config";

const common_spacing = 32;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgb(0 1 1 / 10%)",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn_sign_in: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  ten_most_newest_courses: {
    textAlign: "center",
    marginTop: common_spacing,
    marginBottom: common_spacing,
  },
  outstanding_courses: {
    textAlign: "center",
    marginTop: common_spacing,
    marginBottom: common_spacing,
  },
  card_wrapper: {
    // marginBottom: common_spacing * 2,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  typo: {
    textAlign: "left",
  },
  card_action: {
    display: "flex",
    alignItems: "flex-end",
    height: "100%",
  },
  badge_bestSeller: {
    "& .MuiBadge-anchorOriginBottomLeftRectangle": {
      width: "100px",
    },
  },
  badge_mostView: {
    "& .MuiBadge-anchorOriginBottomLeftRectangle": {
      width: "100px",
      backgroundColor: "lightskyblue",
      color: "lightyellow",
      display: "none",
    },
  },
  badge_newest: {
    "& .MuiBadge-anchorOriginBottomLeftRectangle": {
      width: "100px",

      backgroundColor: "#e2e27a",
    },
  },
  sale: {
    textDecoration: "line-through;",
  },
}));

const defaultProps = {
  color: "secondary",
};

function CardCourse(props) {
  const {
    course_avatar_url,
    course_fee,
    course_name,
    course_title,
    course_id,
    subject_name,
    user_name,
    user_id,
    avg_rate,
    most_stu_enroll,
    most_view_courses,
    newest_courses,
    dispatchAddToCart,
    cart_global_state,
    isLogout,
  } = props;

  const [is_best_seller, set_is_best_seller] = useState(false);
  const [is_most_view, set_is_most_view] = useState(false);
  const [is_newest, set_is_newest] = useState(false);
  const [is_sales, set_is_sales] = useState(false);
  const [sale, set_sale] = useState(0);
  const [all_sales, set_all_sales] = useState([]);
  const [is_in_cart, set_is_in_cart] = useState(false);
  const [toggle_buy_click, set_toggle_buy_click] = useState(false);
  const [email, set_email] = useState("");
  const [show_btn, set_show_btn] = useState(false);

  const handleBuyClick = (e) => {
    const curr_user_id = sessionStorage.getItem("user_login_id");

    dispatchAddToCart(
      course_id,
      +curr_user_id,
      course_fee,
      course_avatar_url,
      course_name,
      course_title
    );
  };

  function allSales() {
    debounce(() => {
      const all_sales_url = `${env.DEV_URL}/api/course/all-sales`;
      const config = {};
      axios.get(all_sales_url, config).then((ret) => {
        set_all_sales(ret.data.all_sales);
        if (ret.data.all_sales !== undefined) {
          for (let i = 0; i < ret.data.all_sales.length; ++i) {
            if (course_id === ret.data.all_sales[i].course_id) {
              set_is_sales(true);
              set_sale(+ret.data.all_sales[i].sale_percent);
              break;
            }
          }
        }
      });
    }, 500)();
  }

  useEffect(() => {
    // This stuff make app broken !!!
    // allSales();
    const email = sessionStorage.getItem("email");

    if (isLogout === true) {
      set_show_btn(false);
    } else {
      set_show_btn(true);
    }

    if (email === null) {
      return set_email(undefined);
    } else if (email === undefined) {
      return set_email(undefined);
    } else if (email === "") {
      return set_email(undefined);
    }
    set_email(email);

    if (cart_global_state !== undefined) {
      for (let i = 0; i < cart_global_state.length; ++i) {
        if (cart_global_state[i].course_id === course_id) {
          set_is_in_cart(true);
          set_toggle_buy_click(!toggle_buy_click);
          break;
        }
      }
    }

    if (most_stu_enroll !== undefined) {
      for (let i = 0; i < most_stu_enroll.length; ++i) {
        if (course_id === most_stu_enroll[i].course_id) {
          set_is_best_seller(true);
          break;
        }
      }
    }

    if (most_view_courses !== undefined) {
      for (let i = 0; i < most_view_courses.length; ++i) {
        if (course_id === most_view_courses[i].course_id) {
          set_is_most_view(true);
          break;
        }
      }
    }

    if (newest_courses !== undefined) {
      for (let i = 0; i < newest_courses.length; ++i) {
        if (course_id === newest_courses[i].course_id) {
          set_is_newest(true);
          break;
        }
      }
    }

    // [most_stu_enroll, most_view_courses, newest_courses, all_sales]
  }, [
    most_stu_enroll,
    most_view_courses,
    newest_courses,
    // toggle_buy_click,
    cart_global_state,
    email,
    isLogout,
    show_btn,
  ]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Link className={classes.link} to={`/course/${course_id}`}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image={`${course_avatar_url}`}
              title="Image title"
            />

            {is_best_seller ? (
              <Box
                display="flex"
                px={8}
                justifyContent="flex-start"
                width="100%"
              >
                <Badge
                  className={classes.badge_bestSeller}
                  variant="standard"
                  badgeContent="Best seller"
                  {...defaultProps}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                />
              </Box>
            ) : is_most_view ? (
              <Box
                display="flex"
                px={8}
                justifyContent="flex-start"
                width="100%"
              >
                <Badge
                  className={classes.badge_mostView}
                  variant="standard"
                  badgeContent="Most view"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                />
              </Box>
            ) : is_newest ? (
              <Box
                display="flex"
                px={8}
                justifyContent="flex-start"
                width="100%"
              >
                <Badge
                  className={classes.badge_newest}
                  variant="standard"
                  badgeContent="New"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                />
              </Box>
            ) : (
              ""
            )}

            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.typo}
                gutterBottom
                variant="h6"
                component="p"
              >
                {course_name}
              </Typography>
              <Typography className={classes.typo}>{subject_name}</Typography>
              <Typography className={classes.typo}> {user_name}</Typography>
              <Typography className={classes.typo}>Rate: {avg_rate}</Typography>

              {is_sales ? (
                <React.Fragment>
                  <Typography className={cn(classes.typo, classes.sale)}>
                    {course_fee}$
                  </Typography>
                  <Typography className={classes.typo}>
                    {" "}
                    Sale: {course_fee -
                      Math.floor((course_fee * sale) / 100)}${" "}
                  </Typography>
                </React.Fragment>
              ) : (
                <Typography className={classes.typo}>{course_fee}$</Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Link>

        {email !== undefined ? (
          <CardActions className={classes.card_action}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              disabled={is_in_cart === true}
              onClick={handleBuyClick}
            >
              Buy
            </Button>
            <Link className={classes.link} to={`/course/${course_id}`}>
              <Button variant="outlined" size="small" color="primary">
                Detail
              </Button>
            </Link>{" "}
          </CardActions>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cart_global_state: state.cartReducer.cart,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(CardCourse);
