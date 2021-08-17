import {
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Collapse
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const common_fontsize = 18;
const styles = makeStyles((theme) => ({
  course_detail_wrapper: {},
  ava_course: {},
  section_header: {
    minHeight: 100,
    marginTop: 100
  },
  course_name: {
    fontWeight: 'bold'
  },
  course_header_title: {
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 12,
    color: 'white'
  },
  section_short_des: {
    minHeight: 100,
    fontSize: common_fontsize
  },
  root: {
    width: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  des: {
    fontWeight: 'bold'
  },
  section_description: {
    minHeight: 100,
    fontSize: common_fontsize
  },
  section_syllabus: {
    minHeight: 100,
    fontSize: common_fontsize
  },
  section_rating: {},
  section_feedback: {
    marginBottom: 16
  },
  paper: {
    padding: 0,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: 16
  },
  full_des: {
    fontSize: '24px',
    fontWeight: '550',
    color: 'black',
    marginLeft: '10px'
  },
  box_cat: {
    padding: 12,
    '& .MuiTypography-root': {
      fontSize: common_fontsize
    }
  },
  title: {
    color: 'black',
    fontWeight: 500
  }
}));

export default function FullDes({ updateCourseDetail, setUpdateCourseDetail }) {
  const classes = styles();

  const [user_role, setUserRole] = useState(0);
  const [insId, setInsId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [course_detail, set_course_detail] = React.useState({});
  const [fullDes, setFullDes] = useState(course_detail.course_full_description);
  const [loadDing, setLoadDing] = useState(false);
  const [last_updated, set_last_updated] = useState('');
  const { course_id } = useParams();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function getCourseDetail() {
    const url = `${env.DEV_URL}/api/course/${course_id}`;
    const config = {};
    axios.get(url, config).then((ret) => {
      set_course_detail(ret.data.course_detail);
      const last_updated = new Date(
        `${ret.data.course_detail.course_last_updated}`
      );
      set_last_updated(last_updated);
    });
  }

  const handleEditFulDes = (e) => {
    setIsEdit(false);
    setLoadDing(true);
    const url = `${env.DEV_URL}/api/instructor/edit-full-des`;
    const data = {
      user_id: insId,
      course_full_description: fullDes,
      course_id: course_detail.course_id
    };

    axios
      .patch(url, data, {})
      .then((ret) => {
        setUpdateCourseDetail(!updateCourseDetail);
        setLoadDing(false);
        const title = 'Success!';
        const html = 'Edited!';
        const timer = 2500;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);
      })
      .catch((er) => {
        setUpdateCourseDetail(!updateCourseDetail);

        const title = 'error!';
        const html = 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
      });
  };

  useEffect(() => {
    setFullDes(course_detail.course_full_description);
  }, [course_detail]);

  useEffect(() => {
    const curr_user_role = sessionStorage.getItem('user_role');
    const user_login_id = sessionStorage.getItem('user_login_id');

    setUserRole(+curr_user_role);
    setInsId(+user_login_id);

    getCourseDetail();
  }, [isEdit, course_id]);

  const handleQuillEdit = (value) => {
    setFullDes(value);
  };

  return isEdit === true ? (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='h5'>
        Full description
      </Typography>
      <Box my={3}>
        <ReactQuill
          theme='snow'
          value={fullDes || ''}
          onChange={handleQuillEdit}
        />
      </Box>

      {+user_role === 3 && +course_detail.user_id === +insId ? (
        <div>
          {loadDing === true ? (
            <Button className={classes.btn} variant='outlined' color='primary'>
              ... Loading
            </Button>
          ) : (
            <Button
              onClick={handleEditFulDes}
              className={classes.btn}
              variant='contained'
              color='secondary'
            >
              Save
            </Button>
          )}
        </div>
      ) : (
        ''
      )}
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Card className={classes.root}>
        <CardActions disableSpacing>
          <Typography className={classes.full_des}>Full Description</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Box
              my={3}
              dangerouslySetInnerHTML={{
                __html: course_detail.course_full_description
              }}
            ></Box>
          </CardContent>
        </Collapse>
      </Card>
      {/* <Typography className={classes.title} variant="h5">
        Full description
      </Typography>
      <Box
        my={3}
        dangerouslySetInnerHTML={{
          __html: course_detail.course_full_description,
        }}
      ></Box> */}

      {+user_role === 3 && +course_detail.user_id === +insId ? (
        <Button
          onClick={() => setIsEdit(true)}
          className={classes.btn}
          variant='contained'
          color='primary'
        >
          Edit
        </Button>
      ) : (
        ''
      )}
    </Paper>
  );
}
