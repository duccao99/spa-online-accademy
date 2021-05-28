import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

// import CardCourse from './../CardCourse/CardCourse';
const CardCourse = lazy(() => import('./../CardCourse/CardCourse'));

const style = makeStyles((theme) => ({
  paper: {
    padding: 32,
    textAlign: 'center',
    color: theme.palette.text.secondary
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

export default function FavoriteCourse() {
  const classes = style();
  const [favorites, setFavorites] = useState([]);

  const { email } = useParams();
  const [isLogout, setisLogout] = useState(true);
  const [favoComponentUpdate, setFavoComponentUpdate] = useState(false);

  function getFavoriteCourse(user_id) {
    // favorite courses
    const purchase_url = `${env.DEV_URL}/api/student/favorite-courses/${user_id}`;
    axios
      .get(purchase_url, {})
      .then((ret) => {
        setFavorites(ret.data.favorite_courses);
      })
      .catch((er) => {
        setFavorites([]);
      });
  }

  useEffect(() => {
    // nav
    const isLg = sessionStorage.getItem('isLogout', false);
    const user_id = +sessionStorage.getItem('user_login_id', false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }

    getFavoriteCourse(user_id);
  }, [favoComponentUpdate]);

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />

      <Container maxWidth='lg'>
        <Box my={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Box mb={6} display='flex' maxWidth justifyContent='flex-start'>
                  <Typography variant='h4' component='p'>
                    Favorite course
                  </Typography>
                </Box>

                <Grid container spacing={4}>
                  <Suspense fallback={<div>...loading</div>}>
                    {favorites.length !== 0
                      ? favorites.map((ele, i) => {
                          return (
                            <Grid xs={12} md={3} item key={i}>
                              <CardCourse
                                course_favo_status={ele.is_favorite}
                                course_favo_id={ele.course_id}
                                favoComponentUpdate={favoComponentUpdate}
                                setFavoComponentUpdate={setFavoComponentUpdate}
                                {...ele}
                              />
                            </Grid>
                          );
                        })
                      : 'There is no course!'}
                  </Suspense>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />
    </React.Fragment>
  );
}
