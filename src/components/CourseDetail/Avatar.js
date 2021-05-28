import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
const common_fontsize = 18;
const styles = makeStyles((theme) => ({
  course_detail_wrapper: {},
  ava_course: {
    position: 'relative'
  },
  section_header: {
    minHeight: 100,
    marginTop: 100,
    position: 'relative'
  },
  course_name: {
    fontWeight: 'bold'
  },
  course_header_title: {
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 12,
    color: 'black'
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
  btn: {
    textTransform: 'capitalize'
  },
  favo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: '1500!important'
  }
}));

export default function Avatar({}) {
  const classes = styles();
  const { course_id } = useParams();
  const [course_detail, setcourse_detail] = useState({});
  const [last_updated, set_last_updated] = useState('');
  const [user_role, setUser_role] = useState(0);
  const [is_favorite, set_is_favorite] = useState(false);

  function getIsFavorite(user_id, course_id) {
    let url_is_favo = `${env.DEV_URL}/api/student/is-favorite?course_id=${course_id}&user_id=${user_id}`;

    axios
      .get(url_is_favo, {})
      .then((ret) => {
        set_is_favorite(ret.data.is_favorite);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  const handleFavoriteClick = (e) => {
    const toggle_favorite_url = `${env.DEV_URL}/api/student/toggle-favorite`;
    const data = {
      user_id: +sessionStorage.getItem('user_login_id'),
      course_id: course_id,
      is_favorite: is_favorite
    };

    axios.patch(toggle_favorite_url, data, {}).then((ret) => {
      getIsFavorite(data.user_id, data.course_id);
    });
  };

  function getAva() {
    const url = `${env.DEV_URL}/api/course/${course_id}`;
    const config = {};
    axios
      .get(url, config)
      .then((ret) => {
        setcourse_detail(ret.data.course_detail);
        const last_updated = new Date(
          `${ret.data.course_detail.course_last_updated}`
        );
        set_last_updated(last_updated);
      })
      .catch((er) => {
        console.log(er);
      });
  }

  useEffect(() => {
    getAva();

    const user_role = sessionStorage.getItem('user_role');
    setUser_role(+user_role);
    getIsFavorite(+sessionStorage.getItem('user_login_id'), course_id);
  }, [course_id]);
  return (
    <Paper
      style={{
        backgroundImage: `url(${course_detail.course_avatar_url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className={cn(classes.paper, classes.ava_course)}
    >
      {+user_role === 2 ? (
        <Box>
          {+is_favorite === 1 ? (
            <Link
              onClick={handleFavoriteClick}
              className={cn(classes.link, classes.favo)}
              // to={`/course/${course_id}`}
            >
              <Button variant='outlined' size='small' color='primary'>
                <FavoriteIcon />
              </Button>
            </Link>
          ) : (
            <Link
              onClick={handleFavoriteClick}
              className={cn(classes.link, classes.favo)}
              // to={`/course/${course_id}`}
            >
              <Button variant='outlined' size='small' color='primary'>
                <FavoriteBorderIcon />
              </Button>
            </Link>
          )}
        </Box>
      ) : (
        ''
      )}
      <Typography
        variant='h4'
        className={cn(classes.course_header_title, classes.course_name)}
      >
        {course_detail.course_name}
      </Typography>
      <Typography variant='h4' className={classes.course_header_title}>
        {course_detail.course_title}
      </Typography>
      <Typography variant='h6' className={classes.course_header_title}>
        Last updated - &nbsp;
        <Moment format='MM/DD/YYYY HH:MM:SS'>{last_updated}</Moment>
      </Typography>
    </Paper>
  );
}
