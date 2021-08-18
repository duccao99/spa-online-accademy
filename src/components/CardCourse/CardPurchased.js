import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_COURSE_TO_CART } from '../../actionTypes/cart.type';
import * as env from '../../config/env.config';
import Badge from '@material-ui/core/Badge';
import { Box } from '@material-ui/core';
const common_spacing = 32;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 8px rgb(0 1 1 / 10%)'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'left'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  btn_sign_in: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  ten_most_newest_courses: {
    textAlign: 'center',
    marginTop: common_spacing,
    marginBottom: common_spacing
  },
  outstanding_courses: {
    textAlign: 'center',
    marginTop: common_spacing,
    marginBottom: common_spacing
  },
  card_wrapper: {
    // marginBottom: common_spacing * 2,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  typo: {
    textAlign: 'left'
  },
  card_action: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100%'
  },
  badge: {
    '& .MuiBadge-anchorOriginBottomLeftRectangle': {
      width: '100px',
      backgroundColor: '#e2e27a'
    }
  },
  btn: {
    textTransform: 'capitalize'
  },
  course_name: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    overflow: 'hidden',
    height: '2.5em',
    lineHeight: '24px'
  },
  subject_name: {
    fontSize: '14px',
    fontWeight: '550',
    color: 'grey',
    margin: '5px 0'
  },
  instructor: {
    margin: '5px 0',
    fontSize: '12px'
  },
  avg_rate: {
    display: 'flex',
    margin: '5px 0',
    alignItems: 'center'
  },
  avg_rate_num: {
    marginRight: '5px',
    fontWeight: 500
  },
  student_num: {
    fontWeight: 500,
    fontSize: '14px'
  },
  badge: {
    '& .MuiBadge-anchorOriginBottomLeftRectangle': {
      width: '200px',
      padding: 12,
      backgroundColor: 'lightgreen',
      margin: '12px 0'
    }
  }
}));

function CardPurchased(props) {
  const {
    course_avatar_url,
    course_name,
    course_id,
    is_finished,
    subject_name,
    ins_name,
    avg_rate,
    num_stu_enroll,
    total_review,
    dispatchAddToCart,
    cart_global_state,
    isLogout
  } = props;

  const [is_in_cart, set_is_in_cart] = useState(false);
  const [toggle_buy_click, set_toggle_buy_click] = useState(false);
  const [email, set_email] = useState(undefined);

  const handleEnroll = (e) => {
    const url = `${env.DEV_URL}/api/student/enroll`;
    const data = {
      user_id: Number(sessionStorage.getItem('user_login_id')),
      course_id: Number(course_id)
    };
    axios
      .post(url, data, {})
      .then((ret) => {})
      .catch((er) => {
        console.log(er.response);
      });
  };

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email === null) {
      return set_email(undefined);
    } else if (email === undefined) {
      return set_email(undefined);
    } else if (email === '') {
      return set_email(undefined);
    }
    set_email(email);

    if (cart_global_state !== undefined) {
      for (let i = 0; i < cart_global_state.length; ++i) {
        if (cart_global_state[i].course_id === course_id) {
          set_is_in_cart(true);
          set_toggle_buy_click(!toggle_buy_click);
          break;
        }
      }
    }
  }, [cart_global_state, email, isLogout]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Link className={classes.link} to={`/course/${course_id}`}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image={`${course_avatar_url}`}
              title='Image title'
            />

            <CardContent className={classes.cardContent}>
              <Typography>
                {+is_finished === 0 ? (
                  <Box
                    display='flex'
                    px={8}
                    justifyContent='flex-start'
                    width='100%'
                  >
                    <Badge
                      className={classes.badge}
                      variant='standard'
                      badgeContent="   Haven't completed yet!"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                      }}
                    />
                  </Box>
                ) : (
                  ''
                )}
              </Typography>

              <Typography
                className={(classes.typo, classes.course_name)}
                gutterBottom
                variant='h6'
                component='p'
              >
                {course_name}
              </Typography>
              <Typography
                className={(classes.typo, classes.subject_name)}
                textOverflow='ellipsis'
              >
                {subject_name}
              </Typography>
              <Typography className={(classes.typo, classes.instructor)}>
                {ins_name}
              </Typography>
              <Typography className={(classes.typo, classes.student_num)}>
                Students: {num_stu_enroll}
              </Typography>
              {avg_rate && (
                <Typography className={(classes.typo, classes.avg_rate)}>
                  <Typography className={(classes.typo, classes.avg_rate_num)}>
                    {Math.round(avg_rate * 10) / 10}
                  </Typography>
                  <Rating
                    name='half-rating-read'
                    defaultValue={avg_rate}
                    precision={0.5}
                    readOnly
                  />{' '}
                  ({total_review})
                </Typography>
              )}
              {/* <Typography className={classes.typo}> {ins_name}</Typography> */}
              {/* <Typography className={classes.typo}>{course_fee}$</Typography> */}
            </CardContent>
          </CardActionArea>
        </Link>

        {email !== undefined ? (
          <CardActions className={classes.card_action}>
            <Link to={`/student/enroll/course/${course_id}`}>
              <Button
                className={classes.btn}
                disabled={is_in_cart === true}
                onClick={handleEnroll}
                variant='contained'
                size='small'
                color='secondary'
              >
                Enroll
              </Button>
            </Link>
            <Link className={classes.link} to={`/course/${course_id}`}>
              <Button variant='outlined' size='small' color='primary'>
                Detail
              </Button>
            </Link>
          </CardActions>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cart_global_state: state.cartReducer.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddToCart: (
      course_id,
      user_id,
      course_price,
      course_ava,
      course_name,
      course_title
    ) => {
      dispatch({
        type: ADD_COURSE_TO_CART,
        payload: {
          course_id: course_id,
          course_price: course_price,
          course_ava: course_ava,
          course_name: course_name,
          course_title: course_title,
          user_id: user_id
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPurchased);
