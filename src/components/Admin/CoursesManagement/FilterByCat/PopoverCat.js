import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CategoryIcon from '@material-ui/icons/Category';
import React, { useEffect, useState } from 'react';
import Subcategory from './Subcategory';
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2)
  },
  popover: {
    boxShadow: 'none!important',
    textTransform: 'initial',
    '&.MuiButton-root': {
      padding: '0!important',
      transition: '0!important'
    },
    '&.MuiPaper-root': {
      transition: 0,
      transition: '0!important'
    }
  },
  popover_cat: {
    '&:hover': {
      cursor: 'pointer'
    },
    transition: '0!important',
    '&.MuiButton-root': {
      transition: '0!important'
    },
    '&.MuiPaper-root': {
      transition: '0!important'
    }
  },
  cat_name: {
    width: '100%!important',
    '&.MuiButton-root': {
      transition: '0!important'
    },
    '&.MuiPaper-root': {
      transition: '0!important'
    }
  },
  cat_icon: {
    display: 'flex',
    alignItems: 'center'
  },
  icon_category: {
    marginRight: 6
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
}));

export default function PopoverCat({
  title,
  categories,
  sub_mobi_cat,
  sub_web_cat,
  setcourses
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [close, set_close] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    set_close(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (close === true) {
      handleClose();
    }
  }, [close]);

  return (
    <div>
      <Box
        aria-describedby={id}
        variant='text'
        color='inherit'
        className={classes.popover}
        onClick={handleClick}
      >
        <Typography variant='h6' className={classes.cat_icon}>
          {' '}
          <CategoryIcon className={classes.icon_category} /> {title}
        </Typography>
      </Box>
      <Popover
        className={classes.popover_cat}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {categories.map((e, i) => {
          return (
            <Subcategory
              setcourses={setcourses}
              classes={classes}
              key={e.cat_id}
              set_cat_close={set_close}
              sub_mobi_cat={e.cat_id === 2 ? sub_mobi_cat : []}
              sub_web_cat={e.cat_id === 1 ? sub_web_cat : []}
              className={classes.typography}
              cat_name={e.cat_name}
            />
          );
        })}
      </Popover>
    </div>
  );
}
