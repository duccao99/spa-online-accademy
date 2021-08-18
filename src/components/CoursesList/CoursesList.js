import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import cn from 'classnames';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
import CardCourse from '../CardCourse/CardCourse';
import Footer from '../Footer/Footer';
import LeftCat from '../LeftCat/LeftCat';
import Navbar from '../Navbar/Navbar';
import Pagination from './Pagination';
import Searchbar from './Searchbar';
import Sort from './Sort';
import { connect } from 'react-redux';
import { SET_ALL_COURSES_PURCHASED } from './../../actionTypes/purchase.type';
import _ from 'lodash';

const style = makeStyles((theme) => ({
  main_course_list_wrapper: {
    flexGrow: 1,
    marginTop: 100,
    marginBottom: 100
  },

  paper: {
    padding: 32,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  course_list: {
    marginTop: 14,
    marginBottom: 14
  },
  pagination: {
    '& ul.MuiPagination-ul': {
      justifyContent: 'flex-end'
    }
  },
  left_cat: {
    position: 'sticky',
    top: 32,
    padding: 16
  },
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
  },
  filter: {
    textAlign: 'left'
  }
}));

const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const sort_info = [
  {
    sort_name: 'Rate',
    sub_sort: [
      {
        sub_id: 1,
        sub_name: 'asc'
      },
      {
        sub_id: 2,
        sub_name: 'desc'
      }
    ]
  },
  {
    sort_name: 'Price',
    sub_sort: [
      {
        sub_id: 1,
        sub_name: 'asc'
      },
      {
        sub_id: 2,
        sub_name: 'desc'
      }
    ]
  }
];

const CoursesList = ({ purchased_id_list, setPurchasedListId }) => {
  const classes = style();
  const [isLoading, setIsLoading] = useState(false);
  const [all_courses_finished, set_all_courses_finished] = useState([]);
  const [total_pagi_stuff, set_total_pagi_stuff] = useState([]);
  const [curr_page, set_curr_page] = useState([]);
  const [search_value, set_search_value] = useState('');
  const { id, rate_value, price_value } = useParams();
  const [sort_value, set_sort_value] = useState({
    sort_name: '',
    is_checked: false
  });
  const [isPaginating, setIsPaginating] = useState(false);

  const [isLogout, setisLogout] = useState(true);
  const [isUpdateFromPagi, setisUpdateFromPagi] = useState(false);

  const [fulltextSearchResult, setFulltextSearchResult] = useState([]);

  const [sortBy, setSortBy] = useState({
    rate_asc: false,
    rate_desc: false,
    price_asc: false,
    price_desc: false
  });

  const location = useLocation();

  function fullTextSearchHandle(search_value) {
    if (typeof id !== 'undefined') {
      console.log('check params id in full text', id);
    } else {
      setIsLoading(true);

      const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/by-full-text-search/${search_value}`;
      const config = {};
      axios
        .get(all_courses_by_subcat_url, config)
        .then((ret) => {
          setFulltextSearchResult(ret.data.all_courses);
          set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
          set_curr_page(ret.data.curr_pagi);
          setIsLoading(false);
        })
        .catch((er) => {
          console.log(er.response);
        });
    }
  }

  function listCourseByCategory(subject_name) {
    setIsLoading(true);

    const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/byCat/${subject_name}`;
    const config = {};
    axios
      .get(all_courses_by_subcat_url, config)
      .then((ret) => {
        setFulltextSearchResult(ret.data.course_by_sub_cat);
        set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
        set_curr_page(ret.data.curr_pagi);
        setIsLoading(false);
      })
      .catch((er) => {
        console.log(er.response);
        setIsLoading(false);
      });
  }

  function listCourseByRate(rate_value) {
    if (search_value.length !== 0) {
      console.log('combine rate + search', search_value);
    } else {
      console.log('combine rate + search', search_value);
      setIsLoading(true);

      const all_course_finished_url = `${env.DEV_URL}/api/course/byRate/${rate_value}`;
      const config = {};
      axios
        .get(all_course_finished_url, config)
        .then((ret) => {
          setFulltextSearchResult(ret.data.all_courses);
          set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
          set_curr_page(ret.data.curr_pagi);
          setIsLoading(false);
        })
        .catch((er) => {
          console.log(er.response);
          setIsLoading(false);
        });
    }
  }

  function listCourseByPrice(price_value) {
    setIsLoading(true);

    const all_course_finished_url = `${env.DEV_URL}/api/course/byPrice/${price_value}`;
    const config = {};
    axios
      .get(all_course_finished_url, config)
      .then((ret) => {
        setFulltextSearchResult(ret.data.all_courses);
        set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
        set_curr_page(ret.data.curr_pagi);
        setIsLoading(false);
      })
      .catch((er) => {
        console.log(er.response);
        setIsLoading(false);
      });
  }

  function listCourseByNothing() {
    setIsLoading(true);
    const all_course_finished_url = `${env.DEV_URL}/api/course/all-with-finished`;
    const config = {};
    axios
      .get(all_course_finished_url, config)
      .then((ret) => {
        setFulltextSearchResult(ret.data.all_courses_finished);
        set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
        set_curr_page(ret.data.curr_pagi);
        setIsLoading(false);
      })
      .catch((er) => {
        console.log(er.response);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    let courses_sorted = fulltextSearchResult;

    if ((sortBy.rate_asc || sortBy.rate_desc) && (sortBy.price_desc || sortBy.price_asc)) {
    console.log('rate', sortBy.rate_asc ? 'asc' : 'desc')
    console.log('fee', sortBy.price_asc ? 'asc' : 'desc')
      sortBy.rate_asc
        ? (courses_sorted = _.sortBy(
            fulltextSearchResult,
            [`avg_rate`]
          ))
        : (courses_sorted = _.sortBy(
            fulltextSearchResult,
            [`avg_rate`]
          ).reverse());

      courses_sorted = courses_sorted.sort((a,b) => {
        if (a.avg_rate === b.avg_rate) {
          return sortBy.price_asc ? a.course_fee - b.course_fee : b.course_fee - a.course_fee
        }
        return 0
      })
      
      set_all_courses_finished(courses_sorted);
      return
    }

    if (sortBy.rate_asc || sortBy.rate_desc) {
      sortBy.rate_asc
        ? (courses_sorted = _.sortBy(
            fulltextSearchResult,
            [`avg_rate`]
          ))
        : (courses_sorted = _.sortBy(
            all_courses_finished,
            [`avg_rate`]
          ).reverse());
    }

    if (sortBy.price_desc || sortBy.price_asc) {
      sortBy.price_asc
        ? (courses_sorted = _.sortBy(courses_sorted, [`course_fee`], [`asc`]))
        : (courses_sorted = _.sortBy(
            courses_sorted,
            [`course_fee`],
            [`asc`]
          ).reverse());
    }

    set_all_courses_finished(courses_sorted);
  }, [sortBy, fulltextSearchResult]);

  useEffect(() => {
    const isLg = sessionStorage.getItem('isLogout', false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }

    if (search_value.length !== 0) {
      fullTextSearchHandle(search_value);

      return;
    } else {
      if (typeof id !== 'undefined') {
        if (id.length !== 0) {
          set_search_value('');
          listCourseByCategory(id);

          return;
        }
      } else {
        if (rate_value !== undefined) {
          listCourseByRate(rate_value);

          return;
        } else {
          if (price_value !== undefined) {
            listCourseByPrice(price_value);

            return;
          } else {
            listCourseByNothing();

            return;
          }
        }
      }
    }
  }, [search_value, sort_value, rate_value, price_value]);

  useEffect(() => {
    if (id) {
      listCourseByCategory(id);
    }

    return;
  }, [id]);

  const handlePagiChange = (event, value) => {
    set_curr_page(value);
    setisUpdateFromPagi(!isUpdateFromPagi);
    setIsPaginating(!isPaginating);

    const config = {
      params: {
        pagi: value
      }
    };
    if (search_value.length !== 0) {
      const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/by-full-text-search/${search_value}`;

      axios
        .get(all_courses_by_subcat_url, config)
        .then((ret) => {
          setFulltextSearchResult(ret.data.all_courses);
          set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
          set_curr_page(ret.data.curr_pagi);
        })
        .catch((er) => {
          console.log(er.response);
        });
      return;
    } else {
      if (id !== undefined) {
        set_search_value('');
        const all_courses_by_subcat_url = `${env.DEV_URL}/api/course/byCat/${id}`;

        axios
          .get(all_courses_by_subcat_url, config)
          .then((ret) => {
            setFulltextSearchResult(ret.data.all_courses);
            set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
            set_curr_page(ret.data.curr_pagi);
          })
          .catch((er) => {
            console.log(er.response);
          });
        return;
      } else {
        if (rate_value !== undefined) {
          const all_course_finished_url = `${env.DEV_URL}/api/course/byRate/${rate_value}`;

          axios
            .get(all_course_finished_url, config)
            .then((ret) => {
              setFulltextSearchResult(ret.data.all_courses);
              set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
              set_curr_page(ret.data.curr_pagi);
            })
            .catch((er) => {
              console.log(er.response);
            });
          return;
        } else {
          if (price_value !== undefined) {
            const all_course_finished_url = `${env.DEV_URL}/api/course/byPrice/${price_value}`;

            axios
              .get(all_course_finished_url, config)
              .then((ret) => {
                setFulltextSearchResult(ret.data.all_courses);
                set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
                set_curr_page(ret.data.curr_pagi);
              })
              .catch((er) => {
                console.log(er.response);
              });
            return;
          } else {
            const all_course_finished_url = `${env.DEV_URL}/api/course/all-with-finished`;

            axios
              .get(all_course_finished_url, config)
              .then((ret) => {
                setFulltextSearchResult(ret.data.all_courses_finished);
                set_total_pagi_stuff(ret.data.total_num_pagi_stuff);
                set_curr_page(ret.data.curr_pagi);
              })
              .catch((er) => {
                console.log(er.response);
              });
            return;
          }
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />

      <main>
        <Container className={classes.main_course_list_wrapper} maxWidth='lg'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Paper className={cn(classes.paper, classes.left_cat)}>
                    <LeftCat />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={cn(classes.paper, classes.left_cat)}>
                    <Typography
                      className={classes.filter}
                      variant='h6'
                      component='p'
                    >
                      <Box px={2}>Filter</Box>
                    </Typography>
                    {sort_info.map((ele, i) => {
                      return (
                        <Sort
                          setSortBy={setSortBy}
                          sortBy={sortBy}
                          set_sort_value={set_sort_value}
                          sort_value={sort_value}
                          {...ele}
                          key={i}
                        />
                      );
                    })}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Paper className={classes.paper}>
                <Searchbar
                  set_search_value={set_search_value}
                  search_value={search_value}
                  all_courses={all_courses_finished}
                />

                {isLoading === true ? (
                  '...loading'
                ) : (
                  <Grid container spacing={4} className={classes.course_list}>
                    {all_courses_finished !== undefined &&
                    all_courses_finished.length !== 0 ? (
                      all_courses_finished.map((ele, i) => {
                        return (
                          <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
                            <CardCourse
                              {...ele}
                              course_id={ele.course_id}
                              isPaginating={isPaginating}
                              isUpdateFromPagi={isUpdateFromPagi}
                              purchased_id_list={purchased_id_list}
                            />
                          </Grid>
                        );
                      })
                    ) : (
                      <Box px={2}>Oops... There is no course!</Box>
                    )}
                  </Grid>
                )}
                <Grid container spacing={4}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.pagination}
                  >
                    {total_pagi_stuff !== 0 ? (
                      <Pagination
                        curr_page={curr_page}
                        handlePagiChange={handlePagiChange}
                        set_curr_page={set_curr_page}
                        total_pagi_stuff={total_pagi_stuff}
                      />
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>

      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    purchased_id_list: state.purchasedCourseReducer.purchased_id_list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPurchasedListId: (purchase_list_id) => {
      dispatch({
        type: SET_ALL_COURSES_PURCHASED,
        payload: purchase_list_id
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);
