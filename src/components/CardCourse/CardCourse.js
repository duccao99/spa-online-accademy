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
import CardActionArea from "@material-ui/core/CardActionArea";
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
}));

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
  } = props;

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
              <Typography className={classes.typo}>{course_fee}$</Typography>
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
