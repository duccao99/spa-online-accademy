import React from "react";
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
import Copyright from "./../Copyright/Copyright";
import Footer from "./../Footer/Footer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import CommonCarousel from "../Carousel/CommonCarousel";
import CardCourse from "./../CardCourse/CardCourse";

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
}));

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

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            DT Online Academy
          </Typography>
          <Link className={classes.btn_sign_in} to="/user/sign-in">
            <Button color="inherit">Sign in</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWith="lg">
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
            Ten most newest courses
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
            Ten most viewed courses
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
