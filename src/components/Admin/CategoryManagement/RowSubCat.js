import { Button, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React from 'react';
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

export default function RowSubCat({ row, handleDelSubCat }) {
  const classes = useStyles();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [vl, setvl] = React.useState(row.subject_name);
  const config = {};
  const [catValue, setCatValue] = React.useState(row.cat_id);

  const handleNewNameChange = (e) => {
    setvl(e.target.value);
  };

  const handleCatVlChange = (e) => {
    setCatValue(e.target.value);
  };

  React.useEffect(() => {}, [openEdit]);
  const handleEditSubCat = (id) => {
    if (vl.length === 0) {
      alert('error');
      return;
    }

    const edit_url = `${env.DEV_URL}/api/sub-category/${id}`;
    const data = {
      subject_name: vl,
      cat_id: catValue
    };

    axios
      .patch(edit_url, data, config)
      .then((ret) => {
        setOpenEdit(false);
        const title = 'Success!';
        const html = 'Updated!';
        const timer = 2000;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);

        return;
      })
      .catch((er) => {
        console.log(er.response);
      });
  };
  const handleKeypress = (e, id) => {
    if (e.which === 13) {
      handleEditSubCat(id);
    }
  };

  return openEdit === true ? (
    <TableRow openEdit={openEdit} setOpenEdit={setOpenEdit} hover>
      <TableCell align='left' component='th' scope='row'>
        {row.subject_id}
      </TableCell>

      <TableCell align='left'>
        {' '}
        <FormControl
          fullWidth
          onKeyPress={(e) => {
            handleKeypress(e, row.subject_id);
          }}
        >
          <TextField
            fullWidth
            label='Name'
            onChange={handleNewNameChange}
            value={vl}
          />
        </FormControl>
      </TableCell>

      <TableCell align='left'>
        {/* {row.subject_id === 1 ? "Web Development" : "Mobile Development"} */}
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor='uncontrolled-native'>Category</InputLabel>
          <NativeSelect
            defaultValue={catValue}
            onChange={handleCatVlChange}
            inputProps={{
              name: 'Category',
              id: 'uncontrolled-native'
            }}
          >
            <option value={1}>Web Development</option>
            <option value={2}>Mobile Development</option>
          </NativeSelect>
        </FormControl>
      </TableCell>

      <TableCell align='right'>
        <Button
          className={classes.btn}
          variant='contained'
          color='secondary'
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
        {row.subject_id}
      </TableCell>

      <TableCell align='left'>
        <Link
          className={classes.link}
          to={`/admin/cat-management/subcat/${row.subject_id}`}
        >
          {row.subject_name}
        </Link>
      </TableCell>

      <TableCell align='left'>
        {row.cat_id === 1 ? 'Web Development' : 'Mobile Development'}
      </TableCell>

      <TableCell align='right'>
        <Button
          className={classes.btn}
          variant='contained'
          color='primary'
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
          variant='contained'
          color='secondary'
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
