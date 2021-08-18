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
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import * as env from '../../config/env.config';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Change from './Change';

const styles = makeStyles((theme) => ({
  paper: {
    padding: 32,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  group_btn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
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
    fontSize: 32,
    textTransform: 'initial',
    justifyContent: 'flex-end'
  },
  change: {
    height: 370
  }
}));

export default function UserProfile() {
  const classes = styles();
  let { id } = useParams();
  const [user_name, set_user_name] = useState('');
  const [sessionUsername, setSessionUserName] = useState('');
  const [sessionUserEmail, setSessionUserEmail] = useState('');
  const [shouldNavUpdate, setShouldNavUpdate] = useState(false);

  const [email, set_email] = useState('');
  const [isLogout, setisLogout] = useState(true);
  const [update, setupdate] = useState(false);
  const [user_id, setuser_id] = useState(0);

  function getNameMaile(id) {
    const url_maile_name = `${env.DEV_URL}/api/user/${id}`;
    axios
      .get(url_maile_name, {})
      .then((ret) => {
        set_user_name(ret.data.user_detail.user_name);
        set_email(ret.data.user_detail.email);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  useEffect(() => {
    const curr_user_id = sessionStorage.getItem('user_login_id');
    setuser_id(+curr_user_id);

    const ssUsername = JSON.parse(sessionStorage.getItem('user_name'));
    const ssEmail = JSON.parse(sessionStorage.getItem('email'));
    setSessionUserEmail(ssEmail);
    setSessionUserName(ssUsername);

    getNameMaile(+curr_user_id);

    set_user_name(user_name);
    set_email(email);
  }, [update]);
  return user_id === undefined || user_id === null ? (
    <Redirect to='/' />
  ) : (
    <React.Fragment>
      <Navbar setisLogout={setisLogout} shouldNavUpdate={update} />

      <Container>
        <Box mt={12} mb={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Box my={3}>
                  <Typography variant='h6' component='p'>
                    Username: {user_name ? user_name : sessionUsername}
                  </Typography>
                </Box>
                <Box my={3}>
                  <Typography variant='h6' component='p'>
                    Email: {email ? email : sessionUserEmail}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={cn(classes.paper, classes.change)}>
                <Change setupdate={setupdate} update={update} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
