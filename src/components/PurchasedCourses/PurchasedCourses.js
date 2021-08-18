import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
import CardPurchased from '../CardCourse/CardPurchased';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const style = makeStyles((theme) => ({
  paper: {
    padding: 32,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent!important'
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
  purchase_title: {
    color: '#000000',
    fontFamily: 'unset',
    fontWeight: '500'
  }
}));

export default function PurchasedCourse() {
  const classes = style();
  const [purchased_courses, set_purchased_courses] = useState([]);

  const { email } = useParams();
  const [isLogout, setisLogout] = useState(true);

  useEffect(() => {
    const config = {};
    // nav
    const isLg = sessionStorage.getItem('isLogout', false);

    if (isLg !== null) {
      setisLogout(isLg);
    } else {
      setisLogout(isLg);
    }

    // purchases courses
    const purchase_url = `${env.DEV_URL}/api/student/purchased-courses/${email}`;
    axios
      .get(purchase_url, config)
      .then((ret) => {
        if (ret && ret.data) {
          set_purchased_courses(ret.data.purchased_courses);
        } else {
          set_purchased_courses(undefined);
        }
      })
      .catch((er) => {
        console.log(er.response);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} />

      <Container maxWidth='lg'>
        <Box my={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Box mb={6} display='flex' maxWidth justifyContent='flex-start'>
                  {' '}
                  <Typography
                    variant='h4'
                    component='p'
                    className={classes.purchase_title}
                  >
                    Purchased courses
                  </Typography>
                </Box>

                <Grid container spacing={4}>
                  {purchased_courses !== undefined
                    ? purchased_courses.map((ele, i) => {
                        return (
                          <Grid xs={12} md={3} item key={i}>
                            <CardPurchased {...ele} />
                          </Grid>
                        );
                      })
                    : 'You have not purchase any course yet...'}
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
