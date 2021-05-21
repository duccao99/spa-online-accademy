import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

import Copyright from "./../Copyright/Copyright";
import Footer from "./../Footer/Footer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import CommonCarousel from "../Carousel/CommonCarousel";
import CardActionArea from "@material-ui/core/CardActionArea";
import Badge from "@material-ui/core/Badge";

import MailIcon from "@material-ui/icons/Mail";
import cn from "classnames";
import axios from "axios";
import * as env from "../../config/env.config";
import { useParams, useLocation } from "react-router-dom";
import { debounce } from "lodash";
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

export default function CardCourse(props) {
  const {
    course_avatar_url,
    course_fee,
    course_name,
    course_title,
    course_id,
    subject_name,
    user_name,
    avg_rate,
    most_stu_enroll,
    most_view_courses,
    newest_courses,
  } = props;

  const [is_best_seller, set_is_best_seller] = useState(false);
  const [is_most_view, set_is_most_view] = useState(false);
  const [is_newest, set_is_newest] = useState(false);
  const [is_sales, set_is_sales] = useState(false);
  const [sale, set_sale] = useState(0);

  const [all_sales, set_all_sales] = useState([]);

  function allSales() {
    debounce(() => {
      const all_sales_url = `${env.DEV_URL}/api/course/all-sales`;
      const config = {};
      axios.get(all_sales_url, config).then((ret) => {
        set_all_sales(ret.data.all_sales);
      });
    }, 500)();
  }

  useEffect(() => {
    allSales();
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

    if (all_sales !== undefined) {
      for (let i = 0; i < all_sales.length; ++i) {
        if (course_id === all_sales[i].course_id) {
          set_is_sales(true);
          set_sale(+all_sales[i].sale_percent);
          break;
        }
      }
    }
  }, [most_stu_enroll, most_view_courses, newest_courses]);

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
        <CardActions className={classes.card_action}>
          <Button variant="contained" size="small" color="primary">
            Buy
          </Button>
          <Link className={classes.link} to={`/course/${course_id}`}>
            <Button variant="outlined" size="small" color="primary">
              Detail
            </Button>
          </Link>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
