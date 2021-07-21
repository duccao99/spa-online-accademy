import {
  Button,
  FormControl,
  makeStyles,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import * as env from "../../../config/env.config";
import { swal2Timing } from "../../../config/swal2.config";

const styles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  btn: {
    marginLeft: 12,
    fontSize: "initial",
    textTransform: "initial",
    width: 100,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
  TextField: {
    height: "100%",
  },
  group_btn: {
    display: "flex",
  },
}));

export default function InsRow({
  row,
  handleDelIns,
  setisComponentUpdate,
  isComponentUpdate,
}) {
  const classes = styles();
  const [openEdit, setopenEdit] = React.useState(false);
  const [username, setusername] = React.useState(row.user_name);
  const [maile, setmaile] = React.useState(row.email);
  const [verify, setVerify] = React.useState(row.is_verified);
  const config = {};

  const handleMaileChange = (e) => {
    setmaile(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setusername(e.target.value);
  };

  const handleEditIns = (id) => {
    const edit_ins_url = `${env.DEV_URL}/api/instructor/${id}`;
    const data = {
      user_name: username,
      email: maile,
      is_verified: verify,
    };
    axios
      .patch(edit_ins_url, data, config)
      .then((ret) => {
        setopenEdit(false);
        setisComponentUpdate(!isComponentUpdate);
        const title = "Success!";
        const html = "Edited!";
        const timer = 2500;
        const icon = "success";
        swal2Timing(title, html, timer, icon);

        return;
      })
      .catch((er) => {
        setopenEdit(false);
        setisComponentUpdate(!isComponentUpdate);

        const title = "error!";
        const html = "Something broke!";
        const timer = 2500;
        const icon = "error";
        swal2Timing(title, html, timer, icon);
      });
  };

  return openEdit === true ? (
    <TableRow>
      <TableCell align="left">{row.user_id}</TableCell>
      <TableCell align="left">
        <FormControl fullWidth>
          <TextField
            className={classes.TextField}
            fullWidth
            id="username"
            onChange={handleUsernameChange}
            value={username}
            label="Username"
            name="username"
          />
        </FormControl>
      </TableCell>
      <TableCell align="left">
        {" "}
        <FormControl fullWidth>
          <TextField
            className={classes.TextField}
            fullWidth
            id="catValue"
            type="email"
            onChange={handleMaileChange}
            value={maile}
            label="Email"
            name="catValue"
          />
        </FormControl>
      </TableCell>
      <TableCell align="left">
        <Moment format="MM/DD/YYYY">{row.date_of_birth}</Moment>
      </TableCell>
      <TableCell align="left">
        <FormControl fullWidth>
          <TextField
            className={classes.TextField}
            fullWidth
            id="username"
            onChange={(e) => {
              setVerify(e.target.value);
            }}
            value={verify}
            label="Username"
            name="username"
          />
        </FormControl>
      </TableCell>
      <TableCell align="right">
        <Button
          onClick={() => {
            handleEditIns(row.user_id);
          }}
          variant="contained"
          color="secondary"
          className={classes.btn}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setopenEdit(false);
          }}
          variant="contained"
          color="default"
          className={classes.btn}
        >
          Back
        </Button>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell align="left">{row.user_id}</TableCell>
      <TableCell align="left">
        <Link
          className={classes.link}
          to={`/admin/instructor-management/instructor/${row.user_id}`}
        >
          {row.user_name}
        </Link>
      </TableCell>
      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">
        <Moment format="MM/DD/YYYY">{row.date_of_birth}</Moment>
      </TableCell>
      <TableCell align="left">{row.is_verified}</TableCell>
      <TableCell align="right" className={classes.group_btn}>
        <Button
          onClick={() => {
            setopenEdit(true);
          }}
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDelIns(row.user_id);
          }}
          variant="contained"
          color="secondary"
          className={classes.btn}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
