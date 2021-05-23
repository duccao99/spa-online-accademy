import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TableFooter,
  Box,
  TextField,
  FormControl,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import * as env from "../../../config/env.config";
import { swal2Timing } from "../../../config/swal2.config";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import AddSubCatModal from "../../CommonModal/AddSubCatModal";

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
});

export default function RowSubCat({ row, handleDelSubCat }) {
  const classes = useStyles();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [vl, setvl] = React.useState("");
  const config = {};

  const handleNewNameChange = (e) => {
    setvl(e.target.value);
  };
  React.useEffect(() => {}, [openEdit]);
  const handleEditSubCat = (id) => {
    const edit_url = `${env.DEV_URL}/api/sub-category/${id}`;
    const data = {
      subject_name: vl,
    };

    axios.patch(edit_url, data, config).then((ret) => {
      setOpenEdit(false);
      const title = "Success!";
      const html = "Updated!";
      const timer = 2000;
      const icon = "success";
      swal2Timing(title, html, timer, icon);

      return;
    });
  };

  return openEdit === true ? (
    <TableRow openEdit={openEdit} setOpenEdit={setOpenEdit} hover>
      <TableCell align="left" component="th" scope="row">
        {row.subject_id}
      </TableCell>

      <TableCell align="left">
        {" "}
        <FormControl fullWidth>
          <TextField
            fullWidth
            label="Name"
            onChange={handleNewNameChange}
            value={vl}
          />
        </FormControl>
      </TableCell>

      <TableCell align="right">
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={() => {
            handleEditSubCat(row.subject_id);
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setOpenEdit(false);
          }}
          className={classes.btn}
          variant="contained"
          color="default"
        >
          Back
        </Button>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow openEdit={openEdit} setOpenEdit={setOpenEdit} hover>
      <TableCell align="left" component="th" scope="row">
        {row.subject_id}
      </TableCell>

      <TableCell align="left">
        {" "}
        <Link
          className={classes.link}
          to={`/admin/cat-management/subcat/${row.subject_id}`}
        >
          {row.subject_name}{" "}
        </Link>
      </TableCell>

      <TableCell align="right">
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDelSubCat(row.subject_id);
          }}
          className={classes.btn}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
