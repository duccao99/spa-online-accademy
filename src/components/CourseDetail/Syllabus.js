import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
import Chapter from './Chapter';

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
    paddingLeft: theme.spacing(4)
  },
  title: {
    color: 'black',
    fontWeight: 500
  }
}));

function unique(vl, i, self) {
  return self.indexOf(vl) === i;
}

export default function Syllabus({ course_detail }) {
  const classes = styles();

  const { course_id } = useParams();
  const [syllabus, setsyllabus] = useState([]);
  const [update, setupdate] = useState(false);
  const [chapters, setchapters] = useState([]);
  const [lessons, setlessons] = useState([]);

  function getSyllabus() {
    const url = `${env.DEV_URL}/api/course/detail/syllabus/${+course_id}`;
    axios.get(url, {}).then((ret) => {
      setsyllabus(ret.data.course_syllabus);

      let array = ret.data.course_syllabus;
      var flags = [],
        unique_chapter = [],
        lesson_of_chap = [],
        l = ret.data.course_syllabus.length,
        i;

      for (i = 0; i < l; ++i) {
        if (
          array[i].lesson_id !== null &&
          array[i].lesson_name !== null &&
          array[i].lesson_video_url !== null &&
          array[i].flag_reviewable !== null &&
          array[i].lesson_content !== null &&
          array[i].chap_id !== null
        ) {
          lesson_of_chap.push({
            lesson_id: array[i].lesson_id,
            lesson_name: array[i].lesson_name,
            lesson_video_url: array[i].lesson_video_url,
            flag_reviewable: array[i].flag_reviewable,
            lesson_content: array[i].lesson_content,
            chap_id: array[i].chap_id
          });
        }

        if (flags[array[i].chap_id]) continue;

        flags[array[i].chap_id] = true;

        if (array[i].chap_id !== null && array[i].chap_name !== null) {
          unique_chapter.push({
            chap_id: array[i].chap_id,
            chap_name: array[i].chap_name
          });
        }
      }

      setchapters(unique_chapter);
      setlessons(lesson_of_chap);

      // for(let i=0;i<ret.data.course_syllabus.length;++i){
      //   chapter_arr.push(ret.data.course_syllabus[i].chap_id)
      // }
    });
  }

  useEffect(() => {
    getSyllabus();
  }, [update, course_id]);

  return (
    <Paper className={classes.paper}>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <Box mb={3}>
            <Typography className={classes.title} variant='h5'>
              Course syllabus
            </Typography>
          </Box>
        }
        className={classes.root}
      >
        {chapters !== undefined ? (
          chapters.map((ele, i) => {
            return <Chapter lessons={lessons} key={ele.chapter_id} {...ele} />;
          })
        ) : (
          <Box>No syllabus</Box>
        )}
      </List>
    </Paper>
  );
}
