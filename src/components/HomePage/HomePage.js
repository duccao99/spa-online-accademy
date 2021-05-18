import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import cn from "classnames";
import React from "react";
import CommonCarousel from "../Carousel/CommonCarousel";
import Navbar from "../Navbar/Navbar";
import CardCourse from "./../CardCourse/CardCourse";
import Footer from "./../Footer/Footer";
import { Link } from "react-router-dom";

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
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.primary}`,
    padding: "0 4px",
  },
}))(Badge);

const outstanding_courses = [1, 2, 3];
// ten_most_viewed_courses
const ten_most_viewed_courses_first_4 = [1, 2, 3, 4];
const ten_most_viewed_courses_second_4 = [5, 6, 7, 8];
const ten_most_viewed_courses_third_2 = [9, 0];

//const ten_most_newest_courses
const ten_most_newest_courses_first_4 = [1, 2, 3, 4];
const ten_most_newest_courses_second_4 = [5, 6, 7, 8];
const ten_most_newest_courses_third_2 = [9, 10];

export default function HomePage() {
  const classes = useStyles();
  const [is_logged_in, set_is_logged_in] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  return (
    <React.Fragment>
      <Navbar />
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
            {outstanding_courses.map((card) => {
              return (
                <Grid item key={card} xs={12} sm={6} md={3} lg={3}>
                  <CardCourse />
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
              {ten_most_newest_courses_first_4.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={3} lg={3}>
                  <CardCourse />
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={4}>
              {/* second 4 newest courses */}

              {ten_most_newest_courses_second_4.map((card) => (
                <Grid
                  item
                  key={card}
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  className={classes.card_wrapper}
                >
                  <CardCourse />
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={4}>
              {/* third 2 newest courses */}

              {ten_most_newest_courses_third_2.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={3} lg={3}>
                  <CardCourse />
                </Grid>
              ))}
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
              {ten_most_viewed_courses_first_4.map((card) => {
                return (
                  <Grid
                    className={classes.card_wrapper}
                    item
                    key={card}
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                  >
                    <CardCourse />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_second_4 */}
              {ten_most_viewed_courses_second_4.map((card) => {
                return (
                  <Grid item key={card} xs={12} sm={6} md={3} lg={3}>
                    <CardCourse />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_third_2 */}
              {ten_most_viewed_courses_third_2.map((card) => {
                return (
                  <Grid item key={card} xs={12} sm={6} md={3} lg={3}>
                    <CardCourse />
                  </Grid>
                );
              })}
            </Grid>
          </CommonCarousel>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
