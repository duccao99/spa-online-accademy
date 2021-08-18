import {
  Box,
  Button,
  makeStyles,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  Paper
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
export default function StudentDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const config = [];
  const [studentDetail, setStudentDetail] = React.useState({});

  const [prevPath, setprevPath] = React.useState('');

  const history = useHistory();

  function getStudentDetail() {
    const sub_detail_url = `${env.DEV_URL}/api/student/${id}`;
    axios
      .get(sub_detail_url, config)
      .then((ret) => {
        setStudentDetail(ret.data.student_detail);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  React.useEffect(() => {
    getStudentDetail();
  }, []);

  return (
    <React.Fragment>
      <Box mb={3} className={classes.header}>
        <Box mb={3}>
          <Typography variant='h6'>Student detail</Typography>
        </Box>
        <Link
          to='/admin/student-management'
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
            <TableCell variant='head'>Student id</TableCell>
            <TableCell className={classes.cell_info}>
              {studentDetail.user_id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Student name</TableCell>
            <TableCell className={classes.cell_info}>
              {studentDetail.user_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Email</TableCell>
            <TableCell className={classes.cell_info}>
              {studentDetail.email}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Date of birth</TableCell>
            <TableCell className={classes.cell_info}>
              <Moment format='MM/DD/YYYY'>{studentDetail.date_of_birth}</Moment>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Is verified</TableCell>
            <TableCell className={classes.cell_info}>
              {studentDetail.is_verified}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
