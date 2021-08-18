import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as env from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';
import RowExistsLesson from './RowExistsLesson';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {}
}));

export default function CaseUploadLesson({ email }) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [lessonName, setlessonName] = React.useState('');
  const [courses, setCourses] = useState([]);
  const [courseSelected, setcourseSelected] = useState('');
  const [user_id, setuser_id] = useState(0);
  const [isUpdate, setisUpdate] = useState(false);
  const [lesson_content, setlesson_content] = useState('');
  const [chap_exists, setchap_exists] = useState([1, 2, 3]);
  const [lesson_exists, setlesson_exists] = useState([]);
  const [chapSelected, setchapSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setfile] = useState('');
  const [loadingUploadVideo, setloadingUploadVideo] = useState(false);
  const [isLessonNameError, setIsLessonNameError] = useState(false);

  const config = {};

  const handleChapChange = (e) => {
    setisUpdate(!isUpdate);
    setchapSelected(e.target.value);
    getLessonExists(e.target.value);
  };

  function getUploadedCourse() {
    const url = `${env.DEV_URL}/api/instructor/uploaded-course/${email}`;
    axios
      .get(url, config)
      .then((ret) => {
        setCourses(ret.data.uploaded_course);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  useEffect(() => {
    const user_id_ss = sessionStorage.getItem('user_login_id');
    setuser_id(+user_id_ss);
    getUploadedCourse();
  }, []);

  function getChapExists(course_id) {
    const url_chap_exists = `${
      env.DEV_URL
    }/api/instructor/chap-exists/${+course_id}`;

    axios
      .get(url_chap_exists, {})
      .then((ret) => {
        setchap_exists(ret.data.chap_exists);
      })
      .catch((er) => {
        setchap_exists([]);
      });
  }

  const handleFileInputChange = (e) => {
    setfile(e.target.files[0]);
    let reader = new FileReader();

    let file = e.target.files[0];

    reader.onload = () => {
      setSelectedFile(file);
    };

    reader.readAsDataURL(file);
  };

  function getLessonExists(chap_id) {
    const url_lesson_exists = `${
      env.DEV_URL
    }/api/instructor/lesson-exists/${+chap_id}`;

    axios
      .get(url_lesson_exists, {})
      .then((ret) => {
        setlesson_exists(ret.data.lesson_exists);
      })
      .catch((er) => {
        setlesson_exists([]);
      });
  }

  const handleChange = (e) => {
    setcourseSelected(e.target.value);
    getChapExists(e.target.value);

    setisUpdate(!isUpdate);
  };

  const handleUpload = (e) => {
    const data = {
      course_id: +courseSelected,
      user_id: user_id
    };
    const formData = new FormData();

    if (
      courseSelected === '' ||
      lessonName === '' ||
      lesson_content === '' ||
      user_id === ''
    ) {
      const title = 'error!';
      const html = 'Cannot empty!';
      const timer = 2500;
      const icon = 'error';
      swal2Timing(title, html, timer, icon);
      return;
    }

    formData.append('lesson_video', selectedFile);
    formData.append('course_id', +courseSelected);
    formData.append('chap_id', +chapSelected);
    formData.append('lesson_name', lessonName);
    formData.append('lesson_content', lesson_content);
    formData.append('user_id', user_id);

    setloadingUploadVideo(true);
    const url_upload_lesson = `${env.DEV_URL}/api/instructor/upload-lesson`;
    axios
      .post(url_upload_lesson, formData, {})
      .then((ret) => {
        setloadingUploadVideo(false);
        setisUpdate(!isUpdate);
        const title = 'Success!';
        const html = 'Lesson upload success!';
        const timer = 2500;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);
      })
      .catch((er) => {
        setloadingUploadVideo(false);

        setisUpdate(!isUpdate);

        const title = 'error!';
        const html = 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
      });
  };

  useEffect(() => {
    getChapExists(courseSelected);
    getLessonExists(chapSelected);
  }, [isUpdate, loadingUploadVideo]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id='demo-simple-select-error-label'>
            Course uploaded
          </InputLabel>
          <Select
            fullWidth
            labelId='demo-simple-select-error-label'
            id='demo-simple-select-error'
            value={courseSelected}
            onChange={handleChange}
          >
            {courses.map((ele) => {
              return (
                <MenuItem
                  key={ele.course_id}
                  name={ele.course_name}
                  value={ele.course_id}
                >
                  {ele.course_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <Typography variant='h6'>Chapter exists information</Typography>
        </Box>
        <Box my={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Chap id</TableCell>
                  <TableCell align='left'>Chap name</TableCell>
                  <TableCell align='left'>Course name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chap_exists.map((row) => (
                  <TableRow hover key={row.chap_id}>
                    <TableCell align='left' component='th' scope='row'>
                      {row.chap_id}
                    </TableCell>
                    <TableCell align='left'>{row.chap_name}</TableCell>
                    <TableCell align='left'>{row.course_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel>Choose chapter to upload lesson</InputLabel>
          <Select fullWidth value={chapSelected} onChange={handleChapChange}>
            {chap_exists.map((ele) => {
              return (
                <MenuItem key={ele.chap_id} value={ele.chap_id}>
                  {ele.chap_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <Typography variant='h6'>Lesson exists information</Typography>
        </Box>
        <Box my={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Lesson id</TableCell>
                  <TableCell align='left'>Lesson name</TableCell>
                  <TableCell align='left'>Is allow preview</TableCell>
                  <TableCell align='left'>Chap id</TableCell>

                  <TableCell align='left'>Chap name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lesson_exists.map((row) => {
                  return <RowExistsLesson row={row} key={row.lesson_id} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              onKeyPress={(e) => {
                if (e.which === 13) {
                  handleUpload(e);
                }
              }}
              label='Lesson name'
              value={lessonName}
              error={isLessonNameError}
              helperText={isLessonNameError ? 'Error' : ''}
              onChange={(e) => {
                setlessonName(e.target.value);
                if (e.target.value === '') {
                  setIsLessonNameError(true);
                } else {
                  setIsLessonNameError(false);
                }
              }}
            />
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <Typography variant='h6' component='p'>
            Lesson content
          </Typography>
        </Box>
        <FormControl fullWidth>
          <ReactQuill
            theme='snow'
            value={lesson_content}
            onChange={setlesson_content}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          <Typography variant='h6' component='p'>
            Lesson video
          </Typography>
        </Box>
        <FormControl fullWidth>
          <input
            id='input-b2'
            name='input-b2'
            type='file'
            className='file'
            onChange={(e) => handleFileInputChange(e)}
            // onChange={(e) => onUploadAva(e)}
            // onChange={(e) => uploadImageChange(e)}
            data-browse-on-zone-click='true'
          ></input>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Box my={3}>
          {loadingUploadVideo === true ? (
            <Button
              className={classes.btn}
              fullWidth
              variant='outlined'
              color='primary'
              onClick={handleUpload}
            >
              Loading ...
            </Button>
          ) : (
            <Button
              className={classes.btn}
              variant='contained'
              color='primary'
              onClick={handleUpload}
            >
              Upload{' '}
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
