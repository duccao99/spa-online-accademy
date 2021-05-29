import { Button, TableFooter } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React from 'react';
import * as env from '../../../config/env.config';
import { swal2Timing } from '../../../config/swal2.config';
import AddInsModal from '../../CommonModal/AddInstructorModal';
import InsRow from './InsRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function InstructorManagement() {
  const classes = useStyles();
  const [instructors, setInstructors] = React.useState([]);
  const [isComponentUpdate, setisComponentUpdate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const config = {};

  function getIns() {
    const ins_url = `${env.DEV_URL}/api/instructor`;
    axios.get(ins_url, config).then((ret) => {
      setInstructors(ret.data.instructors);
    });
  }

  const handleDelIns = (id) => {
    const del_ins_url = `${env.DEV_URL}/api/instructor/${id}`;
    axios
      .delete(del_ins_url, config)
      .then((ret) => {
        setisComponentUpdate(!isComponentUpdate);
        const title = 'Success!';
        const html = 'Instructor was deleted !';
        const timer = 2500;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);

        return;
      })
      .catch((er) => {
        setisComponentUpdate(!isComponentUpdate);

        const title = 'error!';
        const html = 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
      });
  };

  React.useEffect(() => {
    getIns();
  }, [isComponentUpdate]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Id</TableCell>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='left'>Email</TableCell>
            <TableCell align='left'>Date of birth</TableCell>
            <TableCell align='left'>Is verified</TableCell>
            <TableCell align='right'>Features</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructors.map((row) => (
            <InsRow
              setisComponentUpdate={setisComponentUpdate}
              isComponentUpdate={isComponentUpdate}
              handleDelIns={handleDelIns}
              row={row}
              key={row.user_id}
            />
          ))}
        </TableBody>
        <TableFooter>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            fullWidth
            variant='contained'
            color='default'
          >
            New account
          </Button>
        </TableFooter>
      </Table>
      <AddInsModal
        isComponentUpdate={isComponentUpdate}
        setisComponentUpdate={setisComponentUpdate}
        open={open}
        setOpen={setOpen}
      />
    </TableContainer>
  );
}
