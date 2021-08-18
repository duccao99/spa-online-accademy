import { makeStyles, Button } from '@material-ui/core';
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
  const {
    sort_name,
    sub_sort,
    sortBy,
    setSortBy
  } = props;

  const classes = style();
  const [open, setOpen] = React.useState(false);

  const handleSortClick = (e, sort_name, sort_value) => {
    if (sort_name.toLowerCase() === 'rate') {
      setSortBy({
        ...sortBy,
        rate_asc: sort_value === 'asc',
        rate_desc: sort_value !== 'asc'
      });
      return;
    }

    if (sort_name.toLowerCase() === 'price') {
      setSortBy({
        ...sortBy,
        price_asc: sort_value === 'asc',
        price_desc: sort_value !== 'asc'
      });
      return;
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
            const shouldChangeBackground = sortBy.rate_asc && ele.sub_name === 'asc' && sort_name.toLowerCase() === 'rate'
            || sortBy.rate_desc && ele.sub_name === 'desc' && sort_name.toLowerCase() === 'rate'
            || sortBy.price_asc && ele.sub_name === 'asc' && sort_name.toLowerCase() === 'price'
            || sortBy.price_desc && ele.sub_name === 'desc' && sort_name.toLowerCase() === 'price'
            return (
              <ListItem key={i} className={classes.nested} style={shouldChangeBackground ? {backgroundColor: 'darkgray'} : {}}>
                <ListItemIcon className={classes.cat_icon}>
                  {ele.sub_name === 'asc' ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </ListItemIcon>
                <Button
                  className={classes.link}
                  onClick={(e) => {
                    handleSortClick(e, sort_name, ele.sub_name);
                  }}
                >
                  <ListItemText
                    primary={`${
                      ele.sub_name === 'asc' ? 'Ascending' : 'Descending'
                    }`}
                  />
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
