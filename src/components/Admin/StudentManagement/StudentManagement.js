import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import React from "react";
import * as env from "../../../config/env.config";
import { swal2Timing } from "../../../config/swal2.config";
import AddSubCatModal from "../../CommonModal/AddSubCatModal";
import StudentRow from "./StudentRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function StudentManagement() {
  const classes = useStyles();
  const config = {};
  const [students, setStudents] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isDel, setIsDel] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [reLoad, setReLoad] = React.useState(false);

  const openModal = (e) => {
    setOpen(true);
  };

  const raiseReLoad = () => {
    setReLoad(!reLoad);
  };

  function getStudent() {
    const stu_url = `${env.DEV_URL}/api/student`;
    axios.get(stu_url, config).then((ret) => {
      setStudents(ret.data.all_students);
    });
  }
  const handleDelStudent = (id) => {
    const del_url = `${env.DEV_URL}/api/student/${id}`;
    axios
      .delete(del_url, config)
      .then((ret) => {
        const title = "Success!";
        const html = "Student was deleted !";
        const timer = 2500;
        const icon = "success";
        swal2Timing(title, html, timer, icon);
        setIsDel(!isDel);
        return;
      })
      .catch((er) => {
        const title = "error!";
        const html = "Something broke!";
        const timer = 2500;
        const icon = "error";
        swal2Timing(title, html, timer, icon);
        setIsDel(!isDel);
      });
  };

  React.useEffect(() => {
    getStudent();
  }, [isDel, isEdit, reLoad]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Student name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Is verified</TableCell>
            <TableCell align="left">Date of birth</TableCell>
            <TableCell align="right">Features</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row) => {
            return (
              <StudentRow
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                handleDelStudent={handleDelStudent}
                key={row.user_id}
                raiseReLoad={() => raiseReLoad()}
                row={row}
              />
            );
          })}
        </TableBody>
        <AddSubCatModal open={open} setOpen={setOpen} />
      </Table>
    </TableContainer>
  );
}
