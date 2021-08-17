import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import axios from 'axios';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';
import VideoStudy from '../CommonVideo/VideoStudy';
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
    padding: 32,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: 16
  },
  box_cat: {
    padding: 12,
    '& .MuiTypography-root': {
      fontSize: common_fontsize
    }
  },

  nested: {
    paddingLeft: theme.spacing(4),
    '&div.MuiMenu-paper': {
      transition: ' none !important;',
      transitionDuration: '0s !important;'
    },
    '&.MuiListItem-button': {
      transition: ' none !important;',
      transitionDuration: '0s !important;'
    }
  },
  preview: {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'black',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000038',
    zIndex: 100
  },
  video_wrapper: {
    position: 'fixed',
    zIndex: 111,
    opacity: 1
  },
  close_video_icon: {
    position: 'absolute',
    top: '-10%',
    left: '110%',
    zIndex: 110,
    color: 'white',
    height: 30,
    width: 30,
    '&:hover': {
      color: 'black',
      cursor: 'pointer'
    }
  },
  d_none: {
    display: 'none'
  },
  video: {
    backgroundColor: '#fafafa',
    padding: 32,
    paddingTop: 12,
    borderRadius: 5,
    '& .video-react-video': {
      // height: "200px!important",
    },
    '& .video-react': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  list: {
    'div.MuiMenu-paper': {
      transition: ' none !important;',
      transitionDuration: '0s !important;'
    }
  },
  father: {},
  btn: {
    textTransform: 'capitalize'
  }
}));
// "Lesson is not completed"
export default function Lesson({
  open,
  chap_id,
  lesson_id,
  lesson_name,
  lesson_video_url,
  flag_reviewable,
  lesson_content,
  isLessonCompleted
}) {
  const classes = styles();
  const [is_close_video, set_is_close_video] = useState(true);
  const [isCloseVideo, setisCloseVideo] = useState(true);
  const [muted, setmuted] = useState(true);

  const [user_role, setUserRole] = useState(0);
  const [insId, setInsId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [course_detail, set_course_detail] = React.useState({});
  const [last_updated, set_last_updated] = useState('');
  const [lessContent, setlessContent] = useState('');
  const [update, setupdate] = useState(false);
  const { course_id } = useParams();

  const [real_les_content, setreal_les_content] = useState('');

  const handleEditContent = (e) => {
    setIsEdit(false);

    const url = `${env.DEV_URL}/api/instructor/edit-lesson-content`;
    const data = {
      user_id: insId,
      lesson_content: lessContent,
      lesson_id: lesson_id
    };

    axios
      .patch(url, data, {})
      .then((ret) => {
        const title = 'Success!';
        const html = 'Edited!';
        const timer = 2500;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);
        getCourseDetail();
        setreal_les_content(data.lesson_content);
      })
      .catch((er) => {
        const title = 'error!';
        const html = 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
        getCourseDetail();
      });
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

  const handleCloseVideo = (e) => {
    setisCloseVideo(!isCloseVideo);
    setmuted(!muted);
  };

  useEffect(() => {
    const curr_user_role = sessionStorage.getItem('user_role');
    const user_login_id = sessionStorage.getItem('user_login_id');

    setUserRole(+curr_user_role);
    setInsId(+user_login_id);

    setreal_les_content(lesson_content);

    getCourseDetail();
  }, [isEdit, update]);

  // try hard again to handle video timing
  const videoRef = useRef();

  return (
    <React.Fragment>
      <Collapse
        in={open}
        timeout='auto'
        unmountOnExit
        className={classes.father}
      >
        <List className={classes.list} component='div' disablePadding>
          <ListItem disableRipple={true} button className={classes.nested}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary={`${lesson_name}`} />

            <Button className={classes.btn} onClick={handleCloseVideo}>
              Learn
            </Button>
          </ListItem>
        </List>
      </Collapse>

      <Box
        className={cn(classes.preview, {
          [classes.d_none]: is_close_video === true
        })}
      >
        <Box className={classes.video_wrapper}>
          <CloseIcon
            className={classes.close_video_icon}
            onClick={handleCloseVideo}
          />
        </Box>
      </Box>

      <Box
        component={Paper}
        className={cn(classes.video, {
          [classes.d_none]: isCloseVideo
        })}
      >
        <Box my={3}>
          <Typography variant='h6'>
            {' '}
            {lesson_name === null
              ? 'Chapter is not completed! '
              : lesson_name}{' '}
          </Typography>
        </Box>

        <Box>
          <VideoStudy
            user_id={+sessionStorage.getItem('user_login_id')}
            lesson_id={+lesson_id}
            ref={videoRef}
            muted={muted}
            lesson_video_url={lesson_video_url}
          />
        </Box>

        {isEdit === true ? (
          <Box>
            <Box my={3}>
              <Typography variant='h6'>Lesson content</Typography>
            </Box>

            <Box my={3}>
              <ReactQuill
                theme='snow'
                value={lessContent || ''}
                onChange={setlessContent}
              />
            </Box>
            <Box>
              {+user_role === 3 && +course_detail.user_id === +insId ? (
                <Button
                  onClick={handleEditContent}
                  className={classes.btn}
                  variant='contained'
                  color='secondary'
                >
                  Save
                </Button>
              ) : (
                ''
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            <Box my={3}>
              <Typography variant='h6'>Lesson content</Typography>
            </Box>

            <Box
              dangerouslySetInnerHTML={{
                __html: real_les_content
              }}
            ></Box>

            <Box>
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
            </Box>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
