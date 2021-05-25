import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, Grid, TextField, Typography } from "@material-ui/core";
import * as env from "../../config/env.config";
import axios from "axios";
import cn from "classnames";
import { debounce } from "lodash";
import { useParams, useHistory, Link } from "react-router-dom";
import { swal2Timing } from "../../config/swal2.config";
import { Button } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {},
}));

export default function CaseUploadChapter({ email }) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [chap_name, setchap_name] = React.useState("");

  const [courses, setCourses] = useState([]);
  const [courseSelected, setcourseSelected] = useState("");
  const [user_id, setuser_id] = useState(0);
  const [isUpdate, setisUpdate] = useState(false);

  const [chap_exists, setchap_exists] = useState([1, 2, 3]);

  const config = {};
  function getUploadedCourse() {
    const url = `${env.DEV_URL}/api/instructor/uploaded-course/${email}`;
    axios.get(url, config).then((ret) => {
      setCourses(ret.data.uploaded_course);
    });
  }

  useEffect(() => {
    const user_id_ss = sessionStorage.getItem("user_login_id");
    setuser_id(+user_id_ss);
    getUploadedCourse();
  }, []);

  function getChapExists(course_id) {
    const url_chap_exists = `${
      env.DEV_URL
    }/api/instructor/chap-exists/${+course_id}`;

    axios
      .get(url_chap_exists, {})
      .then((ret) => {
        setchap_exists(ret.data.chap_exists);
      })
      .catch((er) => {
        setchap_exists([]);
      });
  }

  const handleChange = (e) => {
    setcourseSelected(e.target.value);
    getChapExists(e.target.value);
    setisUpdate(!isUpdate);
  };

  const handleUpload = (e) => {
    const data = {
      chap_name: chap_name,
      course_id: +courseSelected,
      user_id: user_id,
    };

    if (data.chap_name === "" || data.course_id === "" || data.user_id === "") {
      const title = "error!";
      const html = "Cannot empty!";
      const timer = 2500;
      const icon = "error";
      swal2Timing(title, html, timer, icon);
      return;
    }

    const upload_chap_url = `${env.DEV_URL}/api/instructor/upload-chapter`;
    axios
      .post(upload_chap_url, data, config)
      .then((ret) => {
        const title = "Success!";
        const html = "Chapter added!";
        const timer = 2500;
        const icon = "success";
        swal2Timing(title, html, timer, icon);
        setisUpdate(!isUpdate);
      })
      .catch((er) => {
        const title = "error!";
        const html = "Something broke!";
        const timer = 2500;
        const icon = "error";
        swal2Timing(title, html, timer, icon);
        setisUpdate(!isUpdate);
        return;
      });
  };

  useEffect(() => {
    getChapExists(courseSelected);
  }, [isUpdate]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-simple-select-error-label">
            Course uploaded
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value={courseSelected}
            onChange={handleChange}
          >
            {courses.map((ele) => {
              return (
                <MenuItem
                  key={ele.course_id}
                  name={ele.course_name}
                  value={ele.course_id}
                >
                  {ele.course_name}
                </MenuItem>
              );
            })}
          </Select>
          {/* <FormHelperText>Error</FormHelperText> */}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <Typography variant="h6">Chapter exists information</Typography>
        </Box>
        <Box my={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Chap id</TableCell>
                  <TableCell align="left">Chap name</TableCell>
                  <TableCell align="left">Course name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chap_exists.map((row) => (
                  <TableRow hover key={row.chap_id}>
                    <TableCell align="left" component="th" scope="row">
                      {row.chap_id}
                    </TableCell>
                    <TableCell align="left">{row.chap_name}</TableCell>
                    <TableCell align="left">{row.course_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              onKeyPress={(e) => {
                if (e.which === 13) {
                  handleUpload(e);
                }
              }}
              label="Chapter name"
              value={chap_name}
              onChange={(e) => setchap_name(e.target.value)}
            />
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={handleUpload}
          >
            Upload{" "}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
