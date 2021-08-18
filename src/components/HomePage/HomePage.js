import { Box } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import cn from 'classnames';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_SALES_INTO_GLOBAL_STATE } from '../../actionTypes/course.type';
import { BRING_SCROLLBAR_BACK } from '../../actionTypes/home.type';
import * as env from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';
import CardCourse from '../CardCourse/CardCourse';
import CommonCarousel from '../Carousel/CommonCarousel';
import Navbar from '../Navbar/Navbar';
import Footer from './../Footer/Footer';
import CardCat from './CardCat';
import { SET_ALL_COURSES_PURCHASED } from './../../actionTypes/purchase.type';

const common_spacing = 10;

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.primary}`,
    padding: '0 4px'
  }
}))(Badge);

function HomePage(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& h4': {
        textAlign: 'center'
      }
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '.75em',
        display: 'initial'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: `#455a64`,
        outline: '1px solid slategrey'
      }
    },
    icon: {
      marginRight: theme.spacing(2)
    },
    heroContent: {
      // backgroundColor: theme.palette.background.paper,
      backgroundImage: 'url("/banner.png")',
      padding: theme.spacing(15, 0, 15),
      boxShadow: '0 4px 8px rgb(0 1 1 / 10%)',
      marginBottom: '6vw',
      '& div ': {
        '& h4': {
          textAlign: 'center'
        }
      }
    },
    heroButtons: {
      marginTop: theme.spacing(4)
    },
    cardGrid: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
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
      flexGrow: 1
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
      flexGrow: 1,
      display: 'flex'
    },
    text_center: {
      textAlign: 'center',
      paddingBottom: 24,
      fontFamily: 'unset',
      fontWeight: 500
    },
    btn_sign_in: {
      color: 'inherit',
      textDecoration: 'none',
      textTransform: 'capitalize',
      '&:visited': {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    ten_most_newest_courses: {
      textAlign: 'center',
      margin: common_spacing
    },
    outstanding_courses: {
      textAlign: 'center',
      margin: common_spacing
    },
    card_wrapper: {
      // marginBottom: common_spacing * 2,
    },
    nav_typo: {
      margin: 12
    },
    btn_si: {
      textTransform: 'capitalize'
    },
    outstanding_course_wrapper: {
      marginBottom: '6vw'
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
      '&:visited': {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    btn: {
      textTransform: 'capitalize'
    },
    cart_css: {
      color: 'white'
    },
    header: {
      marginTop: 100
    },
    list_cat_container: {
      display: 'flex',
      justifyContent: 'center'
    },
    table: {
      '&.MuiTableContainer-root': {
        width: 'unset'
      }
    },
    box_cat: {
      display: 'flex;',
      justifyContent: 'center;',
      alignItems: 'center;',
      width: '100%'
    },
    btn_join: {
      width: '100px',
      textTransform: 'capitalize'
    },
    bannerContent: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      justifyContent: 'center'
    },
    bannerTextHeader: {
      color: 'black',
      fontWeight: '500'
    },
    bannerText: {
      textAlign: 'center'
    },
    course_list_section: {
      borderTop: '1px solid rgba(210, 210, 210)',
      padding: '30px 0'
    }
  }));

  const {
    dispatchAddSales,
    bringScrollbarBack,
    purchased_id_list,
    setPurchasedListId
  } = props;
  const classes = useStyles();
  const [is_logged_in, set_is_logged_in] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [outstanding_courses, set_outstanding_courses] = useState([]);
  const [newest_courses_1_4, set_newest_courses_1_4] = useState([]);
  const [newest_courses_2_4, set_newest_courses_2_4] = useState([]);
  const [newest_courses_3_2, set_newest_courses_3_2] = useState([]);

  const [most_viewed_courses_1_4, set_most_viewed_courses_1_4] = useState([]);
  const [most_viewed_courses_2_4, set_most_viewed_courses_2_4] = useState([]);
  const [most_viewed_courses_3_2, set_most_viewed_courses_3_2] = useState([]);
  const [top_sub_cat, set_top_sub_cat] = useState([]);
  const [isLogout, setisLogout] = useState(true);
  const [is_verified, set_is_verified] = useState(false);
  const [user_id, set_user_id] = useState(null);

  useEffect(() => {
    // bring scrollbar back
    // bringScrollbarBack();
    // check is verify account
    let email = sessionStorage.getItem('email');
    let curr_user_id = sessionStorage.getItem('user_login_id');
    set_user_id(curr_user_id);

    if (email !== null) {
      set_is_logged_in(true);
      email = email.substring(1, email.length - 1);
      const config = {};
      const verified_url = `${env.DEV_URL}/api/user/check-verify-account/${email}`;
      axios
        .get(verified_url, config)
        .then((ret) => {
          set_is_verified(ret.data.isVerified);
          if (ret.data.isVerified === false) {
            const icon = 'warning';
            const title = 'Verify!';
            const html = 'Please verify your email account!';
            const timer = 3500;
            swal2Timing(title, html, timer, icon);
          }
        })
        .catch((er) => {
          console.log(er.response);
        });
    }

    const isLg = sessionStorage.getItem('isLogout', false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }

    // add sales dispatch

    const all_sales_url = `${env.DEV_URL}/api/course/all-sales`;
    const config = {};
    axios
      .get(all_sales_url, config)
      .then((ret) => {
        dispatchAddSales(ret.data.all_sales);
      })
      .catch((er) => {
        console.log(er.response);
      });

    // outstanding
    const url = `${env.DEV_URL}/api/course/outstanding-courses`;
    const config = {};
    axios.get(url, config).then((ret) => {
      if (ret && ret.data) {
        set_outstanding_courses(ret.data.outstanding_courses);
      } else {
        set_outstanding_courses(null);
      }
    });

    if (user_id) {
      const url_pruchased_course_id = `${env.DEV_URL}/api/student/purchases-course-id/${user_id}`;
      axios
        .get(url_pruchased_course_id, config)
        .then((ret) => {
          setPurchasedListId(ret.data.purchased_courses_id_list);
        })
        .catch((err) => {
          setPurchasedListId([]);
        });
    }

    // newest

    const newest_url = `${env.DEV_URL}/api/course/ten-newest-courses`;

    axios
      .get(newest_url, config)
      .then((ret) => {
        let first_4 = [];
        let second_4 = [];
        let third_2 = [];

        if (ret.data.ten_newest_courses.length >= 10) {
          for (let i = 0; i < 4; ++i) {
            first_4.push(ret.data.ten_newest_courses[i]);
          }

          for (let i = 4; i < 8; ++i) {
            second_4.push(ret.data.ten_newest_courses[i]);
          }
          for (let i = 8; i < 10; ++i) {
            third_2.push(ret.data.ten_newest_courses[i]);
          }
          set_newest_courses_1_4(first_4);
          set_newest_courses_2_4(second_4);
          set_newest_courses_3_2(third_2);
        } else {
          for (let i = 0; i < ret.data.ten_newest_courses.length; ++i) {
            first_4.push(ret.data.ten_newest_courses[i]);
          }
          set_newest_courses_1_4(first_4);
        }
      })
      .catch((er) => {
        console.log(er.response);
      });

    // viewed

    const most_viewed_url = `${env.DEV_URL}/api/course/ten-most-viewed-courses`;

    axios.get(most_viewed_url, config).then((ret) => {
      let first_4 = [];
      let second_4 = [];
      let third_2 = [];

      if (ret.data.ten_most_viewed_courses.length >= 10) {
        for (let i = 0; i < 4; ++i) {
          first_4.push(ret.data.ten_most_viewed_courses[i]);
        }

        for (let i = 4; i < 8; ++i) {
          second_4.push(ret.data.ten_most_viewed_courses[i]);
        }
        for (let i = 8; i < 10; ++i) {
          third_2.push(ret.data.ten_most_viewed_courses[i]);
        }

        set_most_viewed_courses_1_4(first_4);
        set_most_viewed_courses_2_4(second_4);
        set_most_viewed_courses_3_2(third_2);
      } else {
        for (let i = 0; i < ret.data.ten_most_viewed_courses.length; ++i) {
          first_4.push(ret.data.ten_most_viewed_courses[i]);
        }
        set_most_viewed_courses_1_4(first_4);
      }
    });

    // top sub cat
    const top_sub_cat_url = `${env.DEV_URL}/api/course/top-sub-cat`;

    axios
      .get(top_sub_cat_url, config)
      .then((ret) => {
        set_top_sub_cat(ret.data.top_sub_cat);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }, [isLogout, is_logged_in]);

  return (
    <React.Fragment className={classes.root}>
      <Navbar setisLogout={setisLogout} />
      <main>
        {/* Hero unit */}
        <div className={cn(classes.heroContent)}>
          <Container maxWidth='sm' className={classes.bannerContent}>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              className={(classes.bannerText, classes.bannerTextHeader)}
              gutterBottom
            >
              Study in COVID 19 ?
            </Typography>
            <Typography
              className={classes.bannerText}
              variant='h5'
              color='textSecondary'
              paragraph
            >
              Go study online
            </Typography>
            <div className={(classes.heroButtons, classes.bannerTextHeader)}>
              <Grid container spacing={2} justify='center'>
                {/* <Grid item>
                  <Link to="/join-with-ins" className={classes.link}>
                    <Button
                      className={classes.btn}
                      variant="contained"
                      color="primary"
                    >
                      If you are instructor
                    </Button>
                  </Link>
                </Grid> */}
                {user_id === null ? (
                  <Grid item>
                    <Link to='/user/sign-in' className={classes.link}>
                      <Button
                        className={classes.btn_join}
                        variant='contained'
                        color='primary'
                      >
                        {/* If you are student */}
                        Go
                      </Button>
                    </Link>
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
            </div>
          </Container>
        </div>

        <Container
          className={cn(classes.cardGrid, classes.outstanding_course_wrapper)}
          maxWith='lg'
        >
          {/* End hero unit */}
          <Typography
            className={
              (classes.outstanding_courses,
              classes.course_list_section,
              classes.text_center)
            }
            variant='h4'
          >
            Outstanding courses
          </Typography>

          <Grid container spacing={4} justify={'center'}>
            {outstanding_courses.length > 0
              ? outstanding_courses.map((card, i) => {
                  return (
                    <Grid
                      item
                      key={card.course_id}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                    >
                      {/* <CardCourse {...card} /> */}
                      <CardCourse
                        most_stu_enroll={outstanding_courses}
                        isLogout={isLogout}
                        {...card}
                        purchased_id_list={purchased_id_list}
                      />
                    </Grid>
                  );
                })
              : ''}
          </Grid>
        </Container>

        <Container className={classes.cardGrid} maxWidth='lg'>
          {/* End hero unit */}
          <Typography
            className={
              (classes.ten_most_newest_courses,
              classes.course_list_section,
              classes.text_center)
            }
            variant='h4'
          >
            Newest courses
          </Typography>

          <CommonCarousel>
            {/* first 4 newest courses */}
            <Grid container spacing={4}>
              {newest_courses_1_4 !== undefined && newest_courses_1_4.length > 0
                ? newest_courses_1_4.map((card, i) => (
                    <Grid
                      item
                      key={card.course_id}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                    >
                      <CardCourse
                        newest_courses={newest_courses_1_4}
                        isLogout={isLogout}
                        purchased_id_list={purchased_id_list}
                        {...card}
                      />
                    </Grid>
                  ))
                : ''}
            </Grid>
            <Grid container spacing={4}>
              {/* second 4 newest courses */}
              {newest_courses_2_4 && newest_courses_2_4.length > 0
                ? newest_courses_2_4.map((card, i) => (
                    <Grid
                      item
                      key={card.course_id}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                      className={classes.card_wrapper}
                    >
                      <CardCourse
                        newest_courses={newest_courses_2_4}
                        isLogout={isLogout}
                        purchased_id_list={purchased_id_list}
                        {...card}
                      />
                    </Grid>
                  ))
                : ''}
            </Grid>

            <Grid container spacing={4}>
              {/* third 2 newest courses */}
              {newest_courses_3_2 && newest_courses_3_2.length > 0
                ? newest_courses_3_2.map((card, i) => (
                    <Grid
                      item
                      key={card.course_id}
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                    >
                      <CardCourse
                        newest_courses={newest_courses_3_2}
                        isLogout={isLogout}
                        purchased_id_list={purchased_id_list}
                        {...card}
                      />
                    </Grid>
                  ))
                : ''}
            </Grid>
          </CommonCarousel>
        </Container>

        <Container className={classes.cardGrid} maxWith='lg'>
          {/* End hero unit */}
          <Typography
            className={
              (classes.ten_most_newest_courses,
              classes.course_list_section,
              classes.text_center)
            }
            variant='h4'
          >
            Most viewed courses
          </Typography>

          <CommonCarousel>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_first_4 */}
              {most_viewed_courses_1_4.length > 0
                ? most_viewed_courses_1_4.map((card, i) => {
                    return (
                      <Grid
                        className={classes.card_wrapper}
                        item
                        key={card.course_id}
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                      >
                        <CardCourse
                          isLogout={isLogout}
                          {...card}
                          purchased_id_list={purchased_id_list}
                        />
                      </Grid>
                    );
                  })
                : ''}
            </Grid>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_second_4 */}
              {most_viewed_courses_2_4.length > 0
                ? most_viewed_courses_2_4.map((card, i) => {
                    return (
                      <Grid
                        key={card.course_id}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                      >
                        <CardCourse
                          isLogout={isLogout}
                          {...card}
                          purchased_id_list={purchased_id_list}
                        />
                      </Grid>
                    );
                  })
                : ''}
            </Grid>
            <Grid container spacing={4}>
              {/* ten_most_viewed_courses_third_2 */}
              {most_viewed_courses_3_2.length > 0
                ? most_viewed_courses_3_2.map((card, i) => {
                    return (
                      <Grid
                        key={card.course_id}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                      >
                        <CardCourse
                          isLogout={isLogout}
                          {...card}
                          purchased_id_list={purchased_id_list}
                        />
                      </Grid>
                    );
                  })
                : ''}
            </Grid>
          </CommonCarousel>
        </Container>

        <Container className={classes.cardGrid} maxWith='lg'>
          {/* End hero unit */}
          <Typography
            className={
              (classes.ten_most_newest_courses,
              classes.course_list_section,
              classes.text_center)
            }
            variant='h4'
          >
            Top categories
          </Typography>

          <Box className={classes.box_cat}>
            <TableContainer component={Paper} className={classes.table}>
              <TableContainer aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ minWidth: 200 }}>Category</TableCell>
                    <TableCell align='right' style={{ minWidth: 200 }}>
                      Subcategory
                    </TableCell>
                    <TableCell align='right' style={{ minWidth: 200 }}>
                      Total students
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {top_sub_cat.map((cat, i) => (
                    <CardCat key={i} cat={cat} />
                  ))}
                </TableBody>
              </TableContainer>
            </TableContainer>
          </Box>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cart_global_state: state.cartReducer.cart,
    all_courses_sale_global_state: state.courseReducer.all_courses_sale,
    purchased_id_list: state.purchasedCourseReducer.purchased_id_list
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   dispatchAddToCart: bindActionCreators(CartActions, dispatch),
// });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddSales: (sales) => {
      dispatch({
        type: ADD_SALES_INTO_GLOBAL_STATE,
        payload: sales
      });
    },

    setPurchasedListId: (purchase_list_id) => {
      dispatch({
        type: SET_ALL_COURSES_PURCHASED,
        payload: purchase_list_id
      });
    },

    bringScrollbarBack: () => {
      dispatch({
        type: BRING_SCROLLBAR_BACK,
        payload: true
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
