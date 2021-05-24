import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  FormControl,
  TextField,
  Paper,
  Typography,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import * as env from "../../config/env.config";
import axios from "axios";
import cn from "classnames";
import { debounce } from "lodash";
import { useParams, useHistory, Link } from "react-router-dom";
import { swal2Timing } from "../../config/swal2.config";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import CaseUploadedCourse from "./CaseUploadedCourse";
import CaseUploadChapter from "./CaseUploadChapter";
import CaseUploadLesson from "./CaseUploadLesson";

const common_spacing = 32;
const styles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "1em",
      display: "initial",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: `#455a64`,
      outline: "1px solid slategrey",
    },
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    backgroundColor: "#fafafa",
  },
  cdn: {},
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
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: 200,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
}));

export default function UploadedCourse({ match }) {
  const classes = styles();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLogout, setisLogout] = useState(true);
  const [is_logged_in, set_is_logged_in] = React.useState(true);
  const [is_verified, set_is_verified] = useState(false);
  const [ins_email, set_ins_email] = useState("");

  const { id } = useParams();

  function checkPathToRender(path) {
    if (path === `/ins/case/uploaded/:id`) {
      return <CaseUploadedCourse email={id} />;
    } else if (path === `/ins/case/upload-chapter/:id`) {
      return <CaseUploadChapter />;
    } else if (path === `/ins/case/upload-chapter/:id`) {
      return <CaseUploadLesson />;
    } else {
      return <CaseUploadedCourse />;
    }
  }

  useEffect(() => {
    console.log(id);
    // check is verify account
    let email = sessionStorage.getItem("email");

    if (email !== null) {
      set_is_logged_in(true);
      email = email.substring(1, email.length - 1);
      set_ins_email(email);
      const config = {};
      const verified_url = `${env.DEV_URL}/api/user/check-verify-account/${email}`;
      axios.get(verified_url, config).then((ret) => {
        set_is_verified(ret.data.isVerified);
        if (ret.data.isVerified === false) {
          const icon = "warning";
          const title = "Verify!";
          const html = "Please verify your email account!";
          const timer = 3500;
          swal2Timing(title, html, timer, icon);
        }
      });
    }
    // nav
    const isLg = sessionStorage.getItem("isLogout", false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }
  }, [ins_email]);

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />
      <Container maxWidth="lg">
        <Box my={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Paper className={cn(classes.paper, classes.center)}>
                <Link to={`/ins/case/uploaded/${id}`}>
                  <Button className={classes.btn}>Uploaded course</Button>
                </Link>

                <Link to={`/ins/case/upload-chapter/${id}`}>
                  <Button className={classes.btn}>Upload chapter</Button>
                </Link>

                <Link to={`/ins/case/upload-lesson/${id}`}>
                  <Button className={classes.btn}>Upload lesson</Button>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper className={classes.paper}>
                {checkPathToRender(match.path)}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />
    </React.Fragment>
  );
}
