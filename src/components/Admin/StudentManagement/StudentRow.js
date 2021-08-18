import { Button, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import * as env from '../../../config/env.config';
import { swal2Timing } from '../../../config/swal2.config';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  btn: {
    marginLeft: 12
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

export default function StudentRow({
  row,
  handleDelStudent,
  setIsEdit,
  raiseReLoad,
  isEdit
}) {
  const classes = useStyles();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [username, setUsername] = React.useState(row.user_name);
  const [maile, setMaile] = React.useState(row.email);
  const [verify, setVerify] = React.useState(row.is_verified);

  const config = {};

  const handleNewNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleMaileChange = (e) => {
    setMaile(e.target.value);
  };

  const handleEditStudent = (id) => {
    setIsEdit(!isEdit);
    const edit_url = `${env.DEV_URL}/api/student/${id}`;

    if (username.length === 0 || maile.length === 0) {
      alert('error');
      return;
    }

    const data = {
      user_name: `${username}`,
      email: `${maile}`,
      is_verified: verify
    };

    axios
      .patch(edit_url, data, config)
      .then((ret) => {
        raiseReLoad();
        setOpenEdit(false);
        const title = 'Success!';
        const html = 'Edited!';
        const timer = 2000;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);

        return;
      })
      .catch((er) => {
        setOpenEdit(false);
        const title = 'Error!';
        const html = 'Something broke';
        const timer = 2000;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
      });
  };

  const handleKeypress = (e, id) => {
    if (e.which === 13) {
      handleEditStudent(id);
    }
  };
  React.useEffect(() => {}, [openEdit]);
  return openEdit === true ? (
    <TableRow openEdit={openEdit} setOpenEdit={setOpenEdit} hover>
      <TableCell align='left' component='th' scope='row'>
        {row.user_id}
      </TableCell>
      <TableCell align='left' component='th' scope='row'>
        <FormControl
          onKeyPress={(e) => {
            handleKeypress(e, row.user_id);
          }}
        >
          <TextField
            label='username'
            value={username}
            onChange={handleNewNameChange}
          />
        </FormControl>
      </TableCell>
      <TableCell align='left' component='th' scope='row'>
        <FormControl
          onKeyPress={(e) => {
            handleKeypress(e, row.user_id);
          }}
        >
          <TextField label='Email' value={maile} onChange={handleMaileChange} />
        </FormControl>
      </TableCell>{' '}
      <TableCell align='left' component='th' scope='row'>
        <FormControl fullWidth>
          <TextField
            className={classes.TextField}
            fullWidth
            id=''
            onChange={(e) => {
              setVerify(e.target.value);
            }}
            value={verify}
            label='is_verify'
            name=''
          />
        </FormControl>
      </TableCell>{' '}
      <TableCell align='left' component='th' scope='row'>
        <Moment format='MM/DD/YYYY'>{row.date_of_birth}</Moment>
      </TableCell>
      <TableCell align='right' component='th' scope='row'>
        <Button
          onClick={() => {
            handleEditStudent(row.user_id);
          }}
          className={classes.btn}
          variant='contained'
          color='secondary'
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setOpenEdit(false);
          }}
          className={classes.btn}
          variant='contained'
          color='default'
        >
          Back
        </Button>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow openEdit={openEdit} setOpenEdit={setOpenEdit} hover>
      <TableCell align='left' component='th' scope='row'>
        {row.user_id}
      </TableCell>
      <TableCell align='left' component='th' scope='row'>
        <Link
          className={classes.link}
          to={`/admin/student-management/student/${row.user_id}`}
        >
          {row.user_name}
        </Link>
      </TableCell>
      <TableCell align='left' component='th' scope='row'>
        {row.email}
      </TableCell>
      <TableCell align='left' component='th' scope='row'>
        {row.is_verified}
      </TableCell>
      <TableCell align='left' component='th' scope='row'>
        <Moment format='MM/DD/YYYY'>{row.date_of_birth}</Moment>
      </TableCell>
      <TableCell align='right' component='th' scope='row'>
        <Button
          onClick={() => {
            setOpenEdit(true);
          }}
          className={classes.btn}
          variant='contained'
          color='primary'
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDelStudent(row.user_id);
          }}
          className={classes.btn}
          variant='contained'
          color='secondary'
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
