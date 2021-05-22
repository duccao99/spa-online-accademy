import { Box } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import cn from "classnames";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_SALES_INTO_GLOBAL_STATE } from "../../actionTypes/course.type";
import * as env from "../../config/env.config";
import CardCourseEnroll from "../CardCourse/CardCourseEnroll";
import CommonCarousel from "../Carousel/CommonCarousel";
import Navbar from "../Navbar/Navbar";
import CardCourse from "./../CardCourse/CardCourse";
import CardNewestCourse from "./../CardCourse/CardNewestCourse";
import Footer from "./../Footer/Footer";
import CardCat from "./CardCat";

const common_spacing = 32;

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "1em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: `#455a64`,
      outline: "1px solid slategrey",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12, 0, 12),
    boxShadow: "0 4px 8px rgb(0 1 1 / 10%)",
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
    display: "flex",
  },

  btn_sign_in: {
    color: "inherit",
    textDecoration: "none",
    textTransform: "capitalize",
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
  nav_typo: {
    margin: 12,
  },
  btn_si: {
    textTransform: "capitalize",
  },
  outstanding_course_wrapper: {
    marginTop: 100,
    marginBottom: 100,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  btn: {
    textTransform: "capitalize",
  },
  cart_css: {
    color: "white",
  },
  header: {
    marginTop: 100,
    marginBottom: 100,
  },
  list_cat_container: {
    display: "flex",
    justifyContent: "center",
  },
  table: {
    "&.MuiTableContainer-root": {
      width: "unset",
    },
  },
  box_cat: {
    display: "flex;",
    justifyContent: "center;",
    alignItems: "center;",
    width: "100%",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.primary}`,
    padding: "0 4px",
  },
}))(Badge);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function HomePage(props) {
  const { dispatchAddSales } = props;
  const classes = useStyles();
  const [is_logged_in, set_is_logged_in] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [outstanding_courses, set_outstanding_courses] = useState([]);
  const [newest_courses_1_4, set_newest_courses_1_4] = useState([]);
  const [newest_courses_2_4, set_newest_courses_2_4] = useState([]);
  const [newest_courses_3_2, set_newest_courses_3_2] = useState([]);

  const [most_viewed_courses_1_4, set_most_viewed_courses_1_4] = useState([]);
  const [most_viewed_courses_2_4, set_most_viewed_courses_2_4] = useState([]);
  const [most_viewed_courses_3_2, set_most_viewed_courses_3_2] = useState([]);
  const [top_sub_cat, set_top_sub_cat] = useState([]);
  const [isLogout, setisLogout] = useState(true);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    set_is_logged_in(event.target.checked);
  };

  useEffect(() => {
    const isLg = sessionStorage.getItem("isLogout", false);
    console.log("is logout: ", isLg);
    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      console.log(isLg);
      setisLogout(isLg);
    }

    // add sales dispatch
    debounce(() => {
      const all_sales_url = `${env.DEV_URL}/api/course/all-sales`;
      const config = {};
      axios.get(all_sales_url, config).then((ret) => {
        dispatchAddSales(ret.data.all_sales);
      });
    }, 500)();

    // outstanding
    const url = `${env.DEV_URL}/api/course/outstanding-courses`;
    const config = {};
    axios.get(url, config).then((ret) => {
      set_outstanding_courses(ret.data.outstanding_courses);
    });

    // newest

    const newest_url = `${env.DEV_URL}/api/course/ten-newest-courses`;

    axios.get(newest_url, config).then((ret) => {
      let first_4 = [];
      let second_4 = [];
      let third_2 = [];
      for (let i = 0; i < 4; ++i) {
        first_4.push(ret.data.ten_newest_courses[i]);
      }

      for (let i = 4; i < 8; ++i) {
        second_4.push(ret.data.ten_newest_courses[i]);
      }
      for (let i = 8; i < 10; ++i) {
        third_2.push(ret.data.ten_newest_courses[i]);
      }
      set_newest_courses_1_4(first_4);
      set_newest_courses_2_4(second_4);
      set_newest_courses_3_2(third_2);
    });

    // viewed

    const most_viewed_url = `${env.DEV_URL}/api/course/ten-most-viewed-courses`;

    axios.get(most_viewed_url, config).then((ret) => {
      let first_4 = [];
      let second_4 = [];
      let third_2 = [];
      for (let i = 0; i < 4; ++i) {
        first_4.push(ret.data.ten_most_viewed_courses[i]);
      }

      for (let i = 4; i < 8; ++i) {
        second_4.push(ret.data.ten_most_viewed_courses[i]);
      }
      for (let i = 8; i < 10; ++i) {
        third_2.push(ret.data.ten_most_viewed_courses[i]);
      }

      set_most_viewed_courses_1_4(first_4);
      set_most_viewed_courses_2_4(second_4);
      set_most_viewed_courses_3_2(third_2);
    });

    // top sub cat
    const top_sub_cat_url = `${env.DEV_URL}/api/course/top-sub-cat`;

    axios.get(top_sub_cat_url, config).then((ret) => {
      set_top_sub_cat(ret.data.top_sub_cat);
    });
  }, [isLogout]);

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />
      <main>
        {/* Hero unit */}
        <div className={cn(classes.heroContent, classes.header)}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Study in COVID 19 ?
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Go study online
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/join-with-ins" className={classes.link}>
                    <Button
                      className={classes.btn}
                      variant="contained"
                      color="primary"
                    >
                      If you are instructor
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/user/sign-in" className={classes.link}>
                    <Button
                      className={classes.btn}
                      variant="outlined"
                      color="primary"
                    >
                      If you are student
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container
          className={cn(classes.cardGrid, classes.outstanding_course_wrapper)}
          maxWith="lg"
        >
          {/* End hero unit */}
          <Typography className={classes.outstanding_courses} variant="h4">
            Outstanding courses
          </Typography>

          <Grid container spacing={4} justify={"center"}>
            {outstanding_courses.map((card, i) => {
              return (
                <Grid item key={card.course_id} xs={12} sm={6} md={3} lg={3}>
                  {/* <CardCourse {...card} /> */}
                  <CardCourseEnroll isLogout={isLogout} {...card} />
                </Grid>
              );
            })}
          </Grid>
        </Container>

        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Typography className={classes.ten_most_newest_courses} variant="h4">
            Newest courses
          </Typography>

          <CommonCarousel>
            {/* first 4 newest courses */}
            <Grid container spacing={4}>
              {newest_courses_1_4.length !== 0
                ? newest_courses_1_4.map((card, i) => (
                    <Grid
                      item
                      key={card.course_id}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                    >
                      <CardNewestCourse isLogout={isLogout} {...card} />
                    </Grid>
                  ))
                : ""}
            </Grid>
            <Grid container spacing={4}>
              {/* second 4 newest courses */}
              {newest_courses_2_4.length !== 0
                ? newest_courses_2_4.map((card, i) => (
                    <Grid
                      item
                      key={card.course_id}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                      className={classes.card_wrapper}
                    >
                      <CardNewestCourse isLogout={isLogout} {...card} />
                    </Grid>
                  ))
                : ""}
            </Grid>

            <Grid container spacing={4}>
              {/* third 2 newest courses */}
              {newest_courses_3_2.length !== 0
                ? newest_courses_3_2.map((card, i) => (
                    <Grid
                      item
                      key={card.course_id}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                    >
                      <CardNewestCourse isLogout={isLogout} {...card} />
                    </Grid>
                  ))
                : ""}
            </Grid>
          </CommonCarousel>
        </Container>

        <Container className={classes.cardGrid} maxWith="lg">
          {/* End hero unit */}
          <Typography className={classes.ten_most_newest_courses} variant="h4">
            Most viewed courses
          </Typography>

          <CommonCarousel>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_first_4 */}
              {most_viewed_courses_1_4.map((card, i) => {
                return (
                  <Grid
                    className={classes.card_wrapper}
                    item
                    key={card.course_id}
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                  >
                    <CardCourse isLogout={isLogout} {...card} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_second_4 */}
              {most_viewed_courses_2_4.map((card, i) => {
                return (
                  <Grid key={card.course_id} item xs={12} sm={6} md={3} lg={3}>
                    <CardCourse isLogout={isLogout} {...card} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_third_2 */}
              {most_viewed_courses_3_2.map((card, i) => {
                return (
                  <Grid key={card.course_id} item xs={12} sm={6} md={3} lg={3}>
                    <CardCourse isLogout={isLogout} {...card} />
                  </Grid>
                );
              })}
            </Grid>
          </CommonCarousel>
        </Container>

        <Container className={classes.cardGrid} maxWith="lg">
          {/* End hero unit */}
          <Typography className={classes.ten_most_newest_courses} variant="h4">
            Top categories
          </Typography>

          <Box className={classes.box_cat}>
            <TableContainer component={Paper} className={classes.table}>
              <TableContainer aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Sub category</TableCell>
                    <TableCell align="right">Number student enroll</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {top_sub_cat.map((cat, i) => {
                    return <CardCat key={cat.cat_id} cat={cat} />;
                  })}
                </TableBody>
              </TableContainer>
            </TableContainer>
          </Box>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cart_global_state: state.cartReducer.cart,
    all_courses_sale_global_state: state.courseReducer.all_courses_sale,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   dispatchAddToCart: bindActionCreators(CartActions, dispatch),
// });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddSales: (sales) => {
      dispatch({
        type: ADD_SALES_INTO_GLOBAL_STATE,
        payload: sales,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
