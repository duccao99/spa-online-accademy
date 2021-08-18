import {
  Button,
  makeStyles,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Paper,
  Box,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import cn from 'classnames';
import React from 'react';
import Moment from 'react-moment';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as env from '../../../config/env.config';

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
    }
  },
  my12: {
    marginTop: 12,
    marginBottom: 12
  },
  cell_info: {
    fontWeight: '550 !important',
    fontSize: '16px !important'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
export default function InstructorDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const config = [];
  const [ins_detail, set_ins_detail] = React.useState({});

  function getInstructorDetail() {
    const sub_detail_url = `${env.DEV_URL}/api/instructor/${id}`;
    axios
      .get(sub_detail_url, config)
      .then((ret) => {
        set_ins_detail(ret.data.instructor_detail);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  React.useEffect(() => {
    getInstructorDetail();
  }, []);

  return (
    <React.Fragment>
      <Box mb={3} className={classes.header}>
        <Box mb={3}>
          <Typography variant='h6'>Instructor detail</Typography>
        </Box>
        <Link
          to='/admin/instructor-management'
          className={cn(classes.link, classes.my12)}
        >
          <Button
            className={cn(classes.link, classes.my12)}
            variant='contained'
          >
            Back
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableRow>
            <TableCell variant='head'>Instructor id</TableCell>
            <TableCell className={classes.cell_info}>
              {ins_detail.user_id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Instructor name</TableCell>
            <TableCell className={classes.cell_info}>
              {ins_detail.user_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Email</TableCell>
            <TableCell className={classes.cell_info}>
              {ins_detail.email}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Date of birth</TableCell>
            <TableCell className={classes.cell_info}>
              <Moment format='MM/DD/YYYY'>{ins_detail.date_of_birth}</Moment>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Is verified</TableCell>
            <TableCell className={classes.cell_info}>
              {ins_detail.is_verified}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
