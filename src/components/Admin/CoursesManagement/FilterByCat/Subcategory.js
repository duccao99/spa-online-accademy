import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';
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

export default function Subcategory({
  cat_name,
  set_cat_close,
  sub_web_cat,
  sub_mobi_cat,
  classes,
  setcourses
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleFilterByCat(subject_id) {
    set_cat_close(true);
    const url = `${env_config.DEV_URL}/api/extra-task/filter-course-by-category/${subject_id}`;
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
    <div>
      <Button
        aria-controls='customized-menu'
        aria-haspopup='true'
        variant='text'
        color='primary'
        className={classes.cat_name}
        onClick={handleClick}
      >
        <Box p={1}>{cat_name}</Box>
      </Button>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        className={classes.popover_cat}
        open={Boolean(anchorEl)}
        onClose={() => {
          set_cat_close(true);
        }}
      >
        {sub_web_cat.length !== 0
          ? sub_web_cat.map((ele, i) => {
              return (
                <Box>
                  <Button
                    key={ele.subject_name}
                    onClick={() => {
                      handleFilterByCat(ele.subject_id);
                    }}
                    className={classes.link}
                  >
                    <StyledMenuItem>
                      <ListItemText primary={ele.subject_name} />
                    </StyledMenuItem>
                  </Button>
                </Box>
              );
            })
          : ''}
        {sub_mobi_cat.length !== 0
          ? sub_mobi_cat.map((ele, i) => {
              return (
                <Box>
                  <Button
                    key={ele.subject_name}
                    onClick={() => {
                      handleFilterByCat(ele.subject_id);
                    }}
                    className={classes.link}
                  >
                    <StyledMenuItem>
                      <ListItemText primary={ele.subject_name} />
                    </StyledMenuItem>
                  </Button>
                </Box>
              );
            })
          : ''}
      </StyledMenu>
    </div>
  );
}
