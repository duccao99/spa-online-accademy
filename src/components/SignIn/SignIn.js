import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import * as env_config from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';
import Copyright from './../Copyright/Copyright';
import ReactFacebookLogin from './ReactFacebookLogin';
import ReactGoogleLogin from './ReactGoogleLogin';
import httpService from '../../services/httpService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  helperText: {
    color: 'red'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:hover': {
      fontWeight: '550',
      textDecoration: 'none'
    }
  },
  navigateLink: {
    justifyContent: 'center'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [is_error_email, set_is_error_email] = useState(false);
  const [is_error_password, set_is_error_password] = useState(false);
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const history = useHistory();

  useEffect(() => {}, [history]);

  const handleEmailChange = (e) => {
    set_email(e.target.value);
    if (validator.isEmail(e.target.value) === false) {
      set_is_error_email(true);
    } else {
      set_is_error_email(false);
    }
  };

  const handlePasswordChange = (e) => {
    set_password(e.target.value);
    if (e.target.value.length < 6) {
      set_is_error_password(true);
    } else {
      set_is_error_password(false);
    }
  };
  const handleFormOnkeypress = (e) => {
    if (e.which === 13) {
      handleFormSubmit(e);
    }
  };
  const handleBtnSignInClick = (e) => {
    handleFormSubmit(e);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = `${env_config.DEV_URL}/api/user/sign-in`;
    const data = {
      email,
      password
    };
    const config = {};

    axios
      .post(url, data, config)
      .then((ret) => {
        const user = ret.data.user_info;
        sessionStorage.setItem('user_name', JSON.stringify(user.user_name));
        sessionStorage.setItem('email', JSON.stringify(user.email));
        sessionStorage.setItem('isLogout', false);

        sessionStorage.setItem('accessToken', ret.data.accessToken);
        sessionStorage.setItem('refreshToken', ret.data.refreshToken);

        httpService.setJwt(ret.data.accessToken)

        sessionStorage.setItem('user_role', ret.data.user_info.role_id);
        sessionStorage.setItem('user_login_id', ret.data.user_info.user_id);

        history.push(ret.data.href);
      })
      .catch((er) => {
        const title = 'Error!';
        const html = 'Email or password is incorrect';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleFormSubmit}
          onKeyPress={handleFormOnkeypress}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            value={email}
            onChange={handleEmailChange}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            error={is_error_email}
            helperText={is_error_email === true ? 'Email invalid!' : ''}
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            error={is_error_password}
            helperText={
              is_error_password === true
                ? 'Password must contain at least 6 character!'
                : ''
            }
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleBtnSignInClick}
          >
            Sign In
          </Button>
        </form>

        <Box>
          <Box
            width='100%'
            display='none'
            justifyContent='center'
            alignItems='center'
            my={1}
          >
            <ReactFacebookLogin />
          </Box>
          <Box
            width='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            mb={3}
            mt={1}
          >
            <ReactFacebookLogin />
          </Box>

          <Box
            width='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            my={3}
          >
            <ReactGoogleLogin />
          </Box>

          <Grid container className={classes.navigateLink}>
            <Grid item>
              <Link className={classes.link} to='/user/sign-up' variant='body2'>
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
