import {
  Box,
  Button,
  Grid,
  FormControl,
  TextField,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import * as env from "../../config/env.config";
import axios from "axios";
import cn from "classnames";
import { debounce, reject } from "lodash";
import { swal2Timing } from "../../config/swal2.config";
import { useParams } from "react-router-dom";

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
    padding: 12,
    "& .MuiTypography-root": {
      fontSize: common_fontsize,
    },
  },
  title: {
    color: "black",
    fontWeight: 500,
  },
}));

export default function ShortDes({
  setUpdateCourseDetail,
  updateCourseDetail,
}) {
  const classes = styles();
  const [user_role, setUserRole] = useState(0);
  const [insId, setInsId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [shortDes, setshortDes] = useState();
  const [loadDing, setLoadDing] = useState(false);

  const [course_detail, set_course_detail] = React.useState({});
  const [last_updated, set_last_updated] = useState("");
  const { course_id } = useParams();

  function getCourseDetail() {
    const url = `${env.DEV_URL}/api/course/${course_id}`;
    const config = {};
    axios
      .get(url, config)
      .then((ret) => {
        set_course_detail(ret.data.course_detail);
        const last_updated = new Date(
          `${ret.data.course_detail.course_last_updated}`
        );
        set_last_updated(last_updated);
      })
      .catch((er) => {
        console.log(er);
      });
  }

  const handleEditShortDes = (e) => {
    setIsEdit(false);
    setLoadDing(true);
    const url = `${env.DEV_URL}/api/instructor/edit-short-des`;
    const data = {
      user_id: insId,
      course_short_description: shortDes,
      course_id: course_detail.course_id,
    };

    axios
      .patch(url, data, {})
      .then((ret) => {
        setUpdateCourseDetail(!updateCourseDetail);
        setLoadDing(false);
        const title = "Success!";
        const html = "Edited!";
        const timer = 2500;
        const icon = "success";
        swal2Timing(title, html, timer, icon);
      })
      .catch((er) => {
        setUpdateCourseDetail(!updateCourseDetail);

        const title = "error!";
        const html = "Something broke!";
        const timer = 2500;
        const icon = "error";
        swal2Timing(title, html, timer, icon);
      });
  };

  useEffect(() => {
    const curr_user_role = sessionStorage.getItem("user_role");
    const user_login_id = sessionStorage.getItem("user_login_id");

    setUserRole(+curr_user_role);
    setInsId(+user_login_id);

    getCourseDetail();
  }, [isEdit]);

  return isEdit === true ? (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h5">
        Short description
      </Typography>
      <Box my={3}>
        <ReactQuill
          theme="snow"
          value={shortDes || ""}
          onChange={setshortDes}
        />
      </Box>

      <Box>
        {+user_role === 3 && +course_detail.user_id === +insId ? (
          <div>
            {loadDing === true ? (
              <Button
                className={classes.btn}
                variant="outlined"
                color="primary"
              >
                ... loading
              </Button>
            ) : (
              <Button
                onClick={handleEditShortDes}
                className={classes.btn}
                variant="contained"
                color="secondary"
              >
                Save
              </Button>
            )}
          </div>
        ) : (
          ""
        )}
      </Box>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h5">
        Short description
      </Typography>
      <Box
        my={3}
        dangerouslySetInnerHTML={{
          __html: course_detail.course_short_description,
        }}
      ></Box>

      <Box>
        {+user_role === 3 && +course_detail.user_id === +insId ? (
          <Button
            onClick={() => setIsEdit(true)}
            className={classes.btn}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Paper>
  );
}
