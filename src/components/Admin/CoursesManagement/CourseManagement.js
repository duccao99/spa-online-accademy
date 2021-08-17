import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Box, Grid } from '@material-ui/core';

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
import RowCourse from './RowCourse';
import FilterByCat from './FilterByCat/FilterByCat';
import FilterByInstructor from './FilterByInstructor/FilterByInstructor';

const useStyles = makeStyles({
  table: {
    '& *::-webkit-scrollbar': {
      display: 'none',
      width: '1em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: `#455a64`,
      outline: '1px solid slategrey'
    },
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
  }
});

export default function CourseManagement() {
  const classes = useStyles();
  const [courses, setcourses] = React.useState([]);
  const [isDel, setisDel] = React.useState(false);
  const [reLoad, setReLoad] = React.useState(false);

  const config = {};

  function getAllCourse() {
    const all_course_url = `${env.DEV_URL}/api/course`;

    axios.get(all_course_url, config).then((ret) => {
      setcourses(ret.data.courses);
    });
    return;
  }
  const handleDelCourse = (id) => {
    const del_url = `${env.DEV_URL}/api/course/${id}`;

    axios.delete(del_url, config).then((ret) => {
      const title2 = 'Success!';
      const html2 = 'Course was deleted !';
      const timer2 = 2500;
      const icon2 = 'success';
      swal2Timing(title2, html2, timer2, icon2);
      setisDel(!isDel);
    });
    return;
  };

  const raiseReLoad = () => {
    setReLoad(!reLoad);
  };

  React.useEffect(() => {
    getAllCourse();
  }, [isDel, reLoad]);

  return (
    <React.Fragment>
      <Grid xs={12}>
        <Box
          py={3}
          width='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <FilterByCat setcourses={setcourses} />
          <FilterByInstructor setcourses={setcourses} />
        </Box>
      </Grid>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>Course name</TableCell>

              <TableCell align='left'>Course fee</TableCell>
              <TableCell align='left'>Course sales</TableCell>
              <TableCell align='left'>Course views</TableCell>
              {/* <TableCell align="left">Is finished</TableCell> */}

              <TableCell align='right'>Features</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <RowCourse
                course={course}
                handleDelCourse={handleDelCourse}
                key={course.course_id}
                raiseReLoad={() => raiseReLoad()}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
