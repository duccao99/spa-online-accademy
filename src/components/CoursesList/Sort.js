import { makeStyles } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StarRateIcon from '@material-ui/icons/StarRate';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const style = makeStyles((theme) => ({
  left_cat_wrapper: {},
  nested: {
    paddingLeft: theme.spacing(4)
  },
  cat_icon: {
    '&.MuiListItemIcon-root': {
      minWidth: 40
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
}));

export default function Sort(props) {
  const { sort_name, sort_id, sub_sort, sort_value, set_sort_value } = props;
  const [page_link, set_page_link] = useState('');

  const classes = style();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleCheckBoxChange = (event) => {
    set_sort_value({
      sort_name: event.target.value,
      is_checked: event.target.checked
    });
    if (event.target.value === 'asc' && event.target.checked === true) {
      set_page_link('/courses-list/byRate/asc');
    }
  };

  const handleClick = (e) => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItem
        className={classes.left_cat_wrapper}
        button
        onClick={handleClick}
      >
        <ListItemIcon>
          {sort_name === 'Rate' ? <StarRateIcon /> : <MonetizationOnIcon />}
        </ListItemIcon>
        <ListItemText primary={sort_name} />
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {sub_sort.map((ele, i) => {
            return (
              <ListItem key={i} className={classes.nested}>
                <ListItemIcon className={classes.cat_icon}>
                  {/* <Checkbox
                    onChange={handleCheckBoxChange}
                    value={ele.sub_name}
                    className={classes.link}
                    defaultChecked
                    color="primary"
                    inputProps={{ "aria-label": ele.sub_name }}
                  /> */}
                  {ele.sub_name === 'asc' ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </ListItemIcon>
                <Link
                  className={classes.link}
                  to={`/courses-list/by${sort_name}/${ele.sub_name}`}
                >
                  <ListItemText
                    primary={`${
                      ele.sub_name === 'asc' ? 'Ascending' : 'Descending'
                    }`}
                  />
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
