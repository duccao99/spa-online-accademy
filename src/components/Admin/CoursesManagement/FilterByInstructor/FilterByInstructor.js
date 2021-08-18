import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as env_config from '../../../../config/env.config';
import PopoverInstructor from './PopoverInstructor';
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2)
  },
  hover: {
    cursor: 'pointer'
  }
}));

export default function Category({ setcourses }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sub_cat, set_sub_cat] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const categories = [
    {
      cat_id: 1,
      cat_name: 'Web application development'
    },
    {
      cat_id: 2,
      cat_name: 'Mobile application development'
    }
  ];

  useEffect(() => {
    const url = `${env_config.DEV_URL}/api/instructor`;
    const config = {};
    axios
      .get(url, config)
      .then((ret) => {
        setInstructors(ret.data.instructors);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }, []);

  return (
    <div className={classes.hover}>
      <PopoverInstructor
        setcourses={setcourses}
        title='Filter by Instructor'
        instructors={instructors}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      />
    </div>
  );
}
