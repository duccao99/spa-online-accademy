import { Box, Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as env from "../../config/env.config";
import axios from "axios";

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

  btn_add_to_cart: {
    width: "100%",
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
}));

export default function CatPrice({ course_detail }) {
  const classes = styles();
  const [course_fee, setcourse_fee] = useState("");
  const [subject_name, setsubject_name] = useState("");
  const [sale_percent, setsale_percent] = useState("");
  const [avg_rate, setavg_rate] = useState("");
  const [num_stu_rate, setnum_stu_rate] = useState("");
  const [num_stu_enrolls, setnum_stu_enrolls] = useState("");
  const { course_id } = useParams();

  useEffect(() => {
    const config = {};
    const cat_price_num_url = `${env.DEV_URL}/api/course/detail/cat-price-num/${course_id}`;
    axios
      .get(cat_price_num_url, config)
      .then((ret) => {
        console.log(ret);
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
  }, []);

  return (
    <Paper className={classes.paper}>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Number student enroll: </strong>{" "}
          {num_stu_enrolls === undefined ? 0 : num_stu_enrolls}
        </Typography>
      </Box>

      <Box className={classes.box_cat}>
        <Typography>
          <strong>Number student rating: </strong>{" "}
          {num_stu_rate === undefined ? 0 : num_stu_enrolls}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Average rating: </strong>
          {avg_rate === undefined ? 0 : num_stu_enrolls}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Category: </strong> {course_detail.subject_name}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          <strong>Price: </strong>
          {course_fee === undefined ? 0 : num_stu_enrolls}
        </Typography>
      </Box>
      <Box className={classes.box_cat}>
        <Typography>
          {sale_percent !== undefined && sale_percent !== "0" ? (
            <React.Fragment>
              <strong>Sale: </strong>
              {sale_percent}
            </React.Fragment>
          ) : (
            ""
          )}
        </Typography>
      </Box>

      <Box className={classes.box_cat}>
        <Link
          to={`/add-to-cart/course/${1}`}
          className={classes.btn_add_to_cart}
        >
          <Button fullWidth variant="contained">
            Add to cart
          </Button>
        </Link>
      </Box>
    </Paper>
  );
}
