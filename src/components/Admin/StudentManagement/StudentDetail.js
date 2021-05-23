import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as env from "../../../config/env.config";
import { swal2Timing } from "../../../config/swal2.config";
import { Link, useHistory } from "react-router-dom";
import { Button, makeStyles, Box, Typography } from "@material-ui/core";
import cn from "classnames";
import Moment from "react-moment";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  btn: {
    marginLeft: 12,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  my12: {
    marginTop: 12,
    marginBottom: 12,
  },
});
export default function StudentDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const config = [];
  const [studentDetail, setStudentDetail] = React.useState({});

  const [prevPath, setprevPath] = React.useState("");

  const history = useHistory();

  function getStudentDetail() {
    const sub_detail_url = `${env.DEV_URL}/api/student/${id}`;
    axios.get(sub_detail_url, config).then((ret) => {
      setStudentDetail(ret.data.student_detail);
    });
  }

  React.useEffect(() => {
    getStudentDetail();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Student detail</Typography>

      <Box my={2}>
        <Typography variant="h6">
          Student id: {studentDetail.user_id}{" "}
        </Typography>

        <Typography variant="h6">
          Student name: {studentDetail.user_name}{" "}
        </Typography>

        <Typography variant="h6">Email: {studentDetail.email} </Typography>

        <Typography variant="h6">
          Password: {studentDetail.password}{" "}
        </Typography>
        <Typography variant="h6">
          Date of birth:
          <Moment format="MM/DD/YYYY">{studentDetail.date_of_birth}</Moment>
        </Typography>
        <Typography variant="h6">
          Is verified: {studentDetail.is_verified}{" "}
        </Typography>
        <Typography variant="h6">
          OTP verify URL: {studentDetail.otp_verify_url}{" "}
        </Typography>
        <Typography variant="h6">Role ID: {studentDetail.role_id} </Typography>
      </Box>
      <Link
        to="/admin/student-management"
        className={cn(classes.link, classes.my12)}
      >
        <Button className={cn(classes.link, classes.my12)} variant="contained">
          Back
        </Button>
      </Link>
    </Box>
  );
}
