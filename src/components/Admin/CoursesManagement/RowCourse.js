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

export default function RowCourse({ course, handleDelCourse, raiseReLoad }) {
  const classes = useStyles();

  const [onEdit, setOnEdit] = React.useState(false);
  const [sales, setSales] = React.useState(course.sale_percent);
  const [fee, setFee] = React.useState(course.course_fee);
  const [isBanned, setIsBanned] = React.useState(course.is_banned);
  const config = {};

  const handleSalesChange = (e) => {
    setSales(e.target.value);
  };

  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };

  const handleIsBannedChange = (e) => {
    setIsBanned(e.target.value);
  };

  React.useEffect(() => {}, [onEdit]);

  //   React.useEffect(() => {
  //   }, []);

  const handleEditCourse = (type) => {
    if (course.sale_percent !== sales) {
      if (sales.length === 0) {
      }

      const edit_url = `${env.DEV_URL}/api/sales`;
      const data = {
        sale_percent: +sales,
        add_new: course.sale_percent ? false : true,
        course_id: +course.course_id
      };

      axios
        .patch(edit_url, data, config)
        .then((ret) => {})
        .catch((err) => {
          setOnEdit(false);
          const title = 'Failed!';
          const html = 'Cannot update course sales';
          const timer = 2000;
          const icon = 'fail';
          swal2Timing(title, html, timer, icon);
          return;
        });
    }

    if (course.course_fee !== fee || course.is_banned !== isBanned) {
      const edit_url = `${env.DEV_URL}/api/course`;
      const data = {
        course_fee: +fee,
        course_id: +course.course_id,
        is_banned: isBanned
      };

      axios
        .patch(edit_url, data, config)
        .then((ret) => {})
        .catch((err) => {
          setOnEdit(false);
          const title = 'Failed!';
          const html = 'Cannot update course fee';
          const timer = 2000;
          const icon = 'fail';
          swal2Timing(title, html, timer, icon);
          return;
        });
    }

    if (
      course.sale_percent !== sales ||
      course.course_fee !== fee ||
      course.is_banned !== isBanned
    ) {
      raiseReLoad();
    }

    setOnEdit(false);
    const title = 'Success!';
    const html = 'Updated!';
    const timer = 2000;
    const icon = 'success';
    swal2Timing(title, html, timer, icon);
    return;
  };

  const handleKeypress = (e, type) => {
    if (e.which === 13) {
      //   handleEditCourse(type);
    }
  };
  return (
    <TableRow key={course.course_id} hover>
      <TableCell align='left' component='th' scope='row'>
        {course.course_id}
      </TableCell>

      <TableCell align='left' component='th' scope='row'>
        <Link
          className={classes.link}
          to={`/admin/course-management/course/${course.course_id}`}
        >
          {course.course_name}
        </Link>
      </TableCell>

      {onEdit ? (
        <TableCell
          align='left'
          component='th'
          scope='row'
          style={{ width: '150px' }}
        >
          <FormControl
            onKeyPress={(e) => {
              handleKeypress(e, 'fee');
            }}
          >
            <TextField
              label='Name'
              onChange={handleFeeChange}
              value={fee}
              type='number'
            />
          </FormControl>
        </TableCell>
      ) : (
        <TableCell align='left' component='th' scope='row'>
          {course.course_fee}
        </TableCell>
      )}

      {onEdit ? (
        <TableCell
          align='left'
          component='th'
          scope='row'
          style={{ width: '150px' }}
        >
          <FormControl
            onKeyPress={(e) => {
              handleKeypress(e, 'sales');
            }}
          >
            <TextField
              type='number'
              label='Name'
              onChange={handleSalesChange}
              value={sales}
            />
          </FormControl>
        </TableCell>
      ) : (
        <TableCell align='left' component='th' scope='row'>
          {course.sale_percent ? course.sale_percent + '%' : 0}
        </TableCell>
      )}

      {onEdit ? (
        <TableCell
          align='left'
          component='th'
          scope='row'
          style={{ width: '150px' }}
        >
          <FormControl
            onKeyPress={(e) => {
              handleKeypress(e, 'is_banned');
            }}
          >
            <TextField
              type='number'
              label='Name'
              onChange={handleIsBannedChange}
              value={isBanned}
            />
          </FormControl>
        </TableCell>
      ) : (
        <TableCell align='left' component='th' scope='row'>
          {course.is_banned}
        </TableCell>
      )}

      <TableCell align='left' component='th' scope='row'>
        {course.views}
      </TableCell>
      {/* <TableCell align="left" component="th" scope="row">
      {row.is_finished}
    </TableCell> */}
      {/* <TableCell align="left" component="th" scope="row">
      <Moment format="MM/DD/YYYY HH:MM:SS">
        {row.course_last_updated}
      </Moment>
    </TableCell> */}
      {!onEdit ? (
        <TableCell align='right'>
          <Button
            onClick={() => setOnEdit(true)}
            className={classes.btn}
            variant='contained'
            color='primary'
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelCourse(course.course_id);
            }}
            className={classes.btn}
            variant='contained'
            color='secondary'
          >
            Delete
          </Button>
        </TableCell>
      ) : (
        <TableCell align='right'>
          <Button
            className={classes.btn}
            variant='contained'
            color='secondary'
            onClick={() => {
              handleEditCourse();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setOnEdit(false);
            }}
            className={classes.btn}
            variant='contained'
            color='default'
          >
            Back
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}
