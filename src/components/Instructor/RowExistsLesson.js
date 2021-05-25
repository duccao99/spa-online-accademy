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

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { withStyles, FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {},
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function RowExistsLesson({ row }) {
  const classes = useStyles();

  const [checked, setChecked] = useState(row.flag_reviewable);

  const handleChangeCheck = (e) => {
    setChecked(e.target.checked);

    const url = `${env.DEV_URL}/api/instructor/toggle-preview`;
    const data = {
      flag_reviewable: e.target.checked,
      lesson_id: +row.lesson_id,
    };

    axios
      .patch(url, data, {})
      .then((ret) => {})
      .catch((er) => {});
  };
  useEffect(() => {}, []);

  return (
    <TableRow hover>
      <TableCell align="left" component="th" scope="row">
        {row.lesson_id}
      </TableCell>
      <TableCell align="left">{row.lesson_name}</TableCell>

      <TableCell align="left">
        <FormControlLabel
          className={classes.checkbox}
          control={
            <GreenCheckbox
              checked={checked}
              onChange={handleChangeCheck}
              name="checkedG"
            />
          }
        />
      </TableCell>
      <TableCell align="left">{row.chap_id}</TableCell>

      <TableCell align="left">{row.chap_name}</TableCell>
    </TableRow>
  );
}
