import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { REMOVE_COURSE } from '../../actionTypes/course.type';

const styles = makeStyles((theme) => ({
  card_wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ava_wrapper: {
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  ava: {},
  full_hw: {
    height: '100%',
    width: '200px'
  },
  media: {
    maxWidth: '200px',
    width: '200px',
    height: 140
  },

  course_name_wrap: {
    textAlign: 'left',
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 18,
    paddingRight: 32
  },
  course_name: {
    textAlign: 'left'
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

function ItemCard(props) {
  const {
    course_id,
    user_id,
    course_price,
    course_ava,
    course_name,
    course_title,
    dispatchRemoveCourse
  } = props;
  const classes = styles();

  const handleRemoveItem = (e) => {
    dispatchRemoveCourse(course_id);
  };

  return (
    <TableRow hover>
      <TableCell component='th' scope='row'>
        <Box className={classes.ava_wrapper}>
          <Box className={cn(classes.ava, classes.full_hw)}>
            <Card className={classes.full_hw}>
              <Link className={classes.link} to={`/course/${course_id}`}>
                <CardActionArea className={classes.full_hw}>
                  <CardMedia
                    className={classes.media}
                    image={`${course_ava}`}
                    title={`${course_title}`}
                  />
                </CardActionArea>
              </Link>
            </Card>
          </Box>
          <Box className={cn(classes.course_name_wrap)}>
            <Box mb={1}>
              <Typography
                className={classes.course_name}
                variant='h6'
                component='p'
              >
                {course_name}
              </Typography>
            </Box>
            <Box className={classes.course_title}>
              {/* <Typography component="p">{course_title}</Typography> */}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell align='center'>{course_price} $</TableCell>
      <TableCell align='right'>
        <Button onClick={handleRemoveItem} variant='contained'>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchRemoveCourse: (course_id) => {
      dispatch({
        type: REMOVE_COURSE,
        payload: course_id
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(ItemCard);
