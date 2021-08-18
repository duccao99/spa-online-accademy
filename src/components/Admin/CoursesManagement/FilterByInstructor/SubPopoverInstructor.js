import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import * as env_config from '../../../../config/env.config';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  },
  btn_cat_name: {
    padding: 12
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
}))(MenuItem);

export default function SubPopoverInstructor(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { classes, set_cat_close, cat_name, user_name, user_id, setcourses } =
    props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleFilterByInstructor() {
    set_cat_close(true);

    const url = `${env_config.DEV_URL}/api/extra-task/filter-course-by-instructor?instructor_id=${user_id}`;
    axios
      .get(url)
      .then((ret) => {
        setcourses(ret.data);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  return (
    <Button
      aria-controls='customized-menu'
      aria-haspopup='true'
      variant='text'
      color='primary'
      className={classes.cat_name}
      onClick={handleFilterByInstructor}
    >
      <Box p={1}>{user_name}</Box>
    </Button>
  );
}
