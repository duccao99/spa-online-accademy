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
export default function CourseDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const config = [];
  const [course_detail, set_course_detail] = React.useState({});

  function getInstructorDetail() {
    const url = `${env.DEV_URL}/api/course/${id}`;
    axios
      .get(url, config)
      .then((ret) => {
        set_course_detail(ret.data.course_detail);
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
          <Typography variant='h6'>Course detail</Typography>
        </Box>
        <Link
          to='/admin/course-management'
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
            <TableCell variant='head'>Course id</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.course_id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Course name</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.course_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Course title</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.course_title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Sub category</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.subject_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Last update</TableCell>
            <TableCell className={classes.cell_info}>
              <Moment format='MM/DD/YYYY'>
                {course_detail.course_last_updated}
              </Moment>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Course fee</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.course_fee}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Course sales</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.sale_percent ? course_detail.sale_percent : 0}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Average rate</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.avg_rate
                ? Math.round(course_detail.avg_rate * 10) / 10
                : 0}{' '}
              out of{' '}
              {course_detail.total_review ? course_detail.total_review : 0}{' '}
              reviews
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Is finished</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.is_finished}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Total views</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.views ? course_detail.views : 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Students enroll</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.num_stu_enroll ? course_detail.num_stu_enroll : 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Instructor name</TableCell>
            <TableCell className={classes.cell_info}>
              {course_detail.user_name}
            </TableCell>
          </TableRow>
          <TableRow></TableRow>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
