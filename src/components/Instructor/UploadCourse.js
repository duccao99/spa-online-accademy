import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import * as env from "../../config/env.config";
import axios from "axios";
import cn from "classnames";
import { debounce } from "lodash";
import { swal2Timing } from "../../config/swal2.config";
import Footer from "./../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as bi from "bootstrap-fileinput";

const common_spacing = 32;

const CdnFileInput = () => {
  return <div></div>;
};

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
}));

export default function UploadCourse({ match }) {
  const classes = styles();
  const [is_logged_in, set_is_logged_in] = React.useState(true);
  const [is_verified, set_is_verified] = useState(false);
  const [isLogout, setisLogout] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const [shortDes, setShortDes] = useState("true");
  const [fullDes, setFullDes] = useState("");

  const [course_state, set_course_state] = useState({
    course_name: "",
    course_title: "",
    course_avatar_url: "",
    course_fee: "",
  });
  const handleKeypress = (e) => {
    setIsUpdate(!isUpdate);
    if (e.which === 13) {
      handleSubmit(e);
    }
  };

  const handleCourseStateChange = (ev) => {
    const value = ev.target.value;
    set_course_state({
      ...course_state,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (ev) => {
    alert(
      `${course_state.course_name}\n${course_state.course_title}\n${course_state.course_fee}\n${fullDes}\n${shortDes}`
    );
  };
  const handleClick = (ev) => {
    handleSubmit(ev);
  };

  const CdnFileInput = () => {
    return (
      <Box className={classes.cdn}>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          crossorigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/css/fileinput.min.css"
          media="all"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          crossorigin="anonymous"
        />

        <script
          src="https://code.jquery.com/jquery-3.5.1.min.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/plugins/piexif.min.js"
          type="text/javascript"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/plugins/sortable.min.js"
          type="text/javascript"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/fileinput.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/themes/fas/theme.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/locales/LANG.js"></script>
      </Box>
    );
  };

  React.useEffect(() => {
    //
    // console.log("upload course match ", match);
    // check is verify account
    let email = sessionStorage.getItem("email");

    if (email !== null) {
      set_is_logged_in(true);
      email = email.substring(1, email.length - 1);
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

    const isLg = sessionStorage.getItem("isLogout", false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }
  }, [match.path, isUpdate]);

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Navbar setisLogout={setisLogout} />
        <Container maxWidth="sm">
          <Box my={12} p={3} component={Paper}>
            <form onSubmit={handleSubmit} onKeyPress={handleKeypress}>
              <Box my={3}>
                <Typography variant="h5" component="p">
                  Upload course
                </Typography>
              </Box>
              <Box my={3}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type="text"
                    label="Course name"
                    name="course_name"
                    id="course_name"
                    value={course_state.course_name}
                    onChange={handleCourseStateChange}
                  />
                </FormControl>
              </Box>
              <Box my={3}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type="text"
                    label="Title"
                    name="course_title"
                    id="course_title"
                    value={course_state.course_title}
                    onChange={handleCourseStateChange}
                  />
                </FormControl>
              </Box>

              <Box my={3}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type="number"
                    label="Fee"
                    name="course_fee"
                    id="course_fee"
                    value={course_state.course_fee}
                    onChange={handleCourseStateChange}
                  />
                </FormControl>
              </Box>

              <Box my={3}>
                <Box my={3}>
                  <Typography variant="h5" component="p">
                    Full description
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <ReactQuill
                    theme="snow"
                    value={fullDes}
                    onChange={setFullDes}
                  />
                </FormControl>
              </Box>

              <Box my={3}>
                <Box my={3}>
                  <Typography variant="h5" component="p">
                    Short description
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <ReactQuill
                    theme="snow"
                    value={shortDes}
                    onChange={setShortDes}
                  />
                </FormControl>
              </Box>

              <Box my={3}>
                <Box my={3}>
                  <Typography variant="h5" component="p">
                    Avatar
                  </Typography>
                </Box>

                <input
                  id="input-b1"
                  name="input-b1"
                  type="file"
                  className="file"
                  data-browse-on-zone-click="true"
                ></input>
              </Box>

              <Box my={3}>
                <Button
                  onClick={handleClick}
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                >
                  Upload
                </Button>
              </Box>
            </form>{" "}
          </Box>
          <Box className={classes.cdn}></Box>
        </Container>
        <Footer />
      </Box>
    </React.Fragment>
  );
}
