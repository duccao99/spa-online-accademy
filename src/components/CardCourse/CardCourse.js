import { Box, FormControlLabel, withStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import cn from 'classnames';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_COURSE_TO_CART } from '../../actionTypes/cart.type';
import * as env from '../../config/env.config';

const common_spacing = 32;

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

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
    // textAlign: "center",
    marginTop: common_spacing,
    marginBottom: common_spacing
  },
  outstanding_courses: {
    // textAlign: "center",
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
    height: '100%',
    position: 'relative'
  },
  badge_bestSeller: {
    '& .MuiBadge-anchorOriginBottomLeftRectangle': {
      width: '100px'
    }
  },
  badge_mostView: {
    '& .MuiBadge-anchorOriginBottomLeftRectangle': {
      width: '100px',
      backgroundColor: 'lightskyblue',
      color: 'lightyellow',
      display: 'none'
    }
  },
  badge_newest: {
    '& .MuiBadge-anchorOriginBottomLeftRectangle': {
      width: '100px',

      backgroundColor: '#e2e27a'
    }
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
    width: 'fit-content',
    fontSize: '14px',
    fontWeight: '550',
    color: 'grey',
    margin: '5px 0',

    '&:hover': {
      color: 'darkGrey'
    }
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
  sale: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    justifyContent: 'flex-start'
  },
  price: {
    fontWeight: '500',
    marginRight: '10px'
  },
  del_free: {
    textDecoration: 'line-through;',
    fontSize: '12px'
  },
  checkbox: {
    margin: 0,
    marginBottom: -5
  },
  favo: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: '1500!important',
    border: 'none!important',
    '& .MuiButtonBase-root': {
      border: 'none!important',
      color: '#95f0ff'
    },
    '& .MuiButton-outlinedPrimary': {
      border: 'none!important'
    }
  }
}));

const defaultProps = {
  color: 'secondary'
};

function CardCourse(props) {
  const {
    course_avatar_url,
    course_fee,
    course_name,
    course_title,
    course_id,
    subject_name,
    user_name,
    is_finished,
    user_id,
    avg_rate,
    total_review,

    dispatchAddToCart,
    cart_global_state,
    isLogout,
    isUpdateFromPagi,
    purchased_id_list,

    setFavoComponentUpdate,
    favoComponentUpdate,
    course_favo_id,
    course_favo_status
  } = props;

  const [is_best_seller, set_is_best_seller] = useState(false);
  const [is_most_view, set_is_most_view] = useState(false);
  const [is_newest, set_is_newest] = useState(false);
  const [is_sales, set_is_sales] = useState(false);
  const [sale, set_sale] = useState(0);
  const [all_sales, set_all_sales] = useState([]);
  const [is_in_cart, set_is_in_cart] = useState(false);
  const [toggle_buy_click, set_toggle_buy_click] = useState(false);
  const [email, set_email] = useState('');
  const [show_btn, set_show_btn] = useState(false);
  const [user_role, setUser_role] = useState(0);
  const [checked, setChecked] = useState(is_finished);
  const [isUpdate, setisUpdate] = useState(false);
  const [is_favorite, set_is_favorite] = useState(false);

  const handleChangeCheck = (e) => {
    const curr_user_id = sessionStorage.getItem('user_login_id');

    setChecked(e.target.checked);
    const data = {
      is_finished: e.target.checked,
      course_id: +course_id,
      user_id: +curr_user_id
    };

    const finished_url = `${env.DEV_URL}/api/instructor/toggle-finished-course/`;
    axios.patch(finished_url, data, {}).then((ret) => {});
    setisUpdate(!isUpdate);
  };

  const handleBuyClick = (e) => {
    const curr_user_id = sessionStorage.getItem('user_login_id');

    dispatchAddToCart(
      course_id,
      +curr_user_id,
      course_fee,
      course_avatar_url,
      course_name,
      course_title
    );
  };

  function getIsFavorite(user_id, course_id) {
    let url_is_favo = '';
    if (course_favo_id !== undefined) {
      url_is_favo = `${env.DEV_URL}/api/student/is-favorite?course_id=${course_favo_id}&user_id=${user_id}`;
    } else {
      url_is_favo = `${env.DEV_URL}/api/student/is-favorite?course_id=${course_id}&user_id=${user_id}`;
    }

    axios.get(url_is_favo, {}).then((ret) => {
      set_is_favorite(ret.data.is_favorite);
    });
  }

  const handleFavoriteClick = (e) => {
    const toggle_favorite_url = `${env.DEV_URL}/api/student/toggle-favorite`;
    const data = {
      user_id: Number(sessionStorage.getItem('user_login_id')),
      course_id: Number(course_id),
      is_favorite: is_favorite
    };

    axios.patch(toggle_favorite_url, data, {}).then((ret) => {
      getIsFavorite(data.user_id, data.course_id);

      if (
        setFavoComponentUpdate !== undefined &&
        setFavoComponentUpdate !== null
      ) {
        setFavoComponentUpdate(!favoComponentUpdate);
      }
    });
  };

  useEffect(() => {
    // favo

    if (course_favo_status !== undefined) {
      set_is_favorite(course_favo_status);
    } else {
      getIsFavorite(+sessionStorage.getItem('user_login_id'), course_id);
    }
    // role
    const user_role = sessionStorage.getItem('user_role');
    setUser_role(+user_role);
    // sale

    const all_sales_url = `${env.DEV_URL}/api/course/all-sales`;
    const config = {};
    axios.get(all_sales_url, config).then((ret) => {
      set_all_sales(ret.data.all_sales);

      if (ret.data.all_sales !== undefined) {
        for (let i = 0; i < ret.data.all_sales.length; ++i) {
          if (course_id === ret.data.all_sales[i].course_id) {
            set_is_sales(true);
            set_sale(+ret.data.all_sales[i].sale_percent);
            break;
          }
        }
      }
    });

    // This stuff make app broken !!!

    const email = sessionStorage.getItem('email');

    if (isLogout === true) {
      set_show_btn(false);
    } else {
      set_show_btn(true);
    }

    if (email === null) {
      set_email(undefined);
    } else if (email === undefined) {
      set_email(undefined);
    } else if (email === '') {
      set_email(undefined);
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
  }, [
    // toggle_buy_click,
    cart_global_state,
    email,
    isLogout,
    show_btn,
    // bestseller problem
    // is_best_seller,
    // is_newest,
    isUpdate,
    isUpdateFromPagi,
    is_favorite,
    favoComponentUpdate
  ]);

  function isBestSellerBadgeHandle() {
    const url = `${env.DEV_URL}/api/extra-task/is-best-seller/${course_id}`;

    axios.get(url).then((ret) => {
      set_is_best_seller(ret.data);
    });
  }

  function isNewBadgeHandle() {
    const url = `${env.DEV_URL}/api/extra-task/is-newest/${course_id}`;

    axios.get(url).then((ret) => {
      set_is_newest(ret.data);
    });
  }

  // handle badge
  useEffect(() => {
    isBestSellerBadgeHandle();
    isNewBadgeHandle();
  }, []);

  const handleLinkClick = (e) => {
    // setUpdateCourseDetail(!updateCourseDetail);
  };

  const handleEnroll = (e) => {
    const url = `${env.DEV_URL}/api/student/enroll`;
    const data = {
      user_id: sessionStorage.getItem('user_login_id'),
      course_id: course_id
    };
    axios.post(url, data, {}).then((ret) => {});
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Box onClick={handleLinkClick}>
          <CardActionArea>
            <Link className={classes.link} to={`/course/${course_id}`}>
              <CardMedia
                className={classes.cardMedia}
                image={`${course_avatar_url}`}
                title='Image title'
              />
            </Link>
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

            {is_best_seller === true ? (
              <Box
                display='flex'
                px={8}
                justifyContent='flex-start'
                width='100%'
              >
                <Badge
                  className={classes.badge_bestSeller}
                  variant='standard'
                  badgeContent='Best seller'
                  {...defaultProps}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                />
              </Box>
            ) : is_newest === true ? (
              <Box
                display='flex'
                px={8}
                justifyContent='flex-start'
                width='100%'
              >
                <Badge
                  className={classes.badge_newest}
                  variant='standard'
                  badgeContent='New'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                />
              </Box>
            ) : (
              <Box></Box>
            )}

            <CardContent className={classes.cardContent}>
              <Typography
                className={(classes.typo, classes.course_name)}
                gutterBottom
                variant='h6'
                component='p'
              >
                {course_name}
              </Typography>
              <Link to={`/courses-list/${subject_name}`}>
                <Typography
                  className={(classes.typo, classes.subject_name)}
                  textOverflow='ellipsis'
                >
                  {subject_name}
                </Typography>
              </Link>
              <Typography className={(classes.typo, classes.instructor)}>
                {' '}
                {user_name}
              </Typography>
              {avg_rate && (
                <Typography className={(classes.typo, classes.avg_rate)}>
                  <Typography className={(classes.typo, classes.avg_rate_num)}>
                    {Math.round(avg_rate * 10) / 10}
                  </Typography>
                  <Rating
                    name='half-rating-read'
                    defaultValue={Math.round(avg_rate * 10) / 10}
                    precision={0.5}
                    readOnly
                  />
                  ({total_review})
                </Typography>
              )}

              {is_sales &&
              course_fee - Math.floor((course_fee * sale) / 100) !==
                course_fee ? (
                // <React.Fragment>
                <Typography className={cn(classes.typo, classes.sale)}>
                  <Typography className={(classes.typo, classes.price)}>
                    $
                    {(
                      course_fee - Math.floor((course_fee * sale) / 100)
                    ).toPrecision(2)}
                  </Typography>
                  <Typography className={(classes.typo, classes.del_free)}>
                    ${course_fee}
                  </Typography>
                </Typography>
              ) : (
                <Typography className={(classes.typo, classes.price)}>
                  ${course_fee}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Box>
        {email !== undefined ? (
          <CardActions className={classes.card_action}>
            {user_role === 2 || user_role === 4 ? (
              purchased_id_list && purchased_id_list.indexOf(course_id) > -1 ? (
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
              ) : (
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  disabled={is_in_cart === true}
                  onClick={handleBuyClick}
                >
                  {is_in_cart === true ? 'Added to cart' : 'Buy'}
                </Button>
              )
            ) : (
              <div>
                {user_role === 3 &&
                user_id === +sessionStorage.getItem('user_login_id') ? (
                  <FormControlLabel
                    className={classes.checkbox}
                    control={
                      <GreenCheckbox
                        checked={checked}
                        onChange={handleChangeCheck}
                        name='checkedG'
                      />
                    }
                    label='Is finished'
                  />
                ) : (
                  ''
                )}
              </div>
            )}
            <Link
              onClick={handleLinkClick}
              className={classes.link}
              to={`/course/${course_id}`}
            >
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

export default connect(mapStateToProps, mapDispatchToProps)(CardCourse);
