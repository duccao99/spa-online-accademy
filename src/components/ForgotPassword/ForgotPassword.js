import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import * as env_config from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';
import Copyright from './../Copyright/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    '.MuiFormHelperText-root': {
      color: 'red'
    }
  },
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
    marginTop: theme.spacing(3)
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
    }
  }
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const [is_email_error, set_is_email_error] = useState(false);
  const [is_pass_error, set_is_pass_error] = useState(false);
  const [user_name, set_user_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');

  const handleEmailChange = (e) => {
    set_email(e.target.value);
    if (validator.isEmail(email) === false) {
      set_is_email_error(true);
    } else {
      set_is_email_error(false);
    }
  };

  const handleUsernameChange = (e) => {
    set_user_name(e.target.value);
  };
  const handlePasswordChange = (e) => {
    set_password(e.target.value);

    if (e.target.value.length < 6) {
      set_is_pass_error(true);
    } else {
      set_is_pass_error(false);
    }
  };
  const handleForgotPasswordClick = (e) => {
    handleFormSubmit(e);
  };
  const createStudentAccount = (e) => {
    const url = `${env_config.DEV_URL}/api/user/sign-up`;
    const data = {
      user_name: user_name,
      email: email,
      password: password
    };
    const config = {};
    axios
      .post(url, data, config)
      .then((ret) => {
        // auth
        const auth_url = `${env_config.DEV_URL}/api/auth`;
        const auth_data = {
          ...data
        };

        axios.post(auth_url, auth_data, config).then((ret) => {
          const title = 'Account created!';
          const html = '';
          const timer = 2000;
          const icon = 'success';
          swal2Timing(title, html, timer, icon);
        });
      })
      .catch((er) => {
        const title = 'Error!';
        const html = '';
        const timer = 2000;
        const icon = 'error';

        swal2Timing(title, html, timer, icon);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (e.which === 13) {
      createStudentAccount();
    }
    createStudentAccount();
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleFormSubmit(e);
    }
  };

  useEffect(() => {}, []);

  return (
    <Container component='main' maxWidth='xs' className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Forgot password
        </Typography>
        <form
          className={classes.form}
          noValidate
          onKeyPress={handleKeyPress}
          onSubmit={handleFormSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                className={classes.email}
                onChange={handleEmailChange}
                value={email}
                FormHelperTextProps={{ className: classes.helperText }}
                helperText={is_email_error === true ? 'Email invalid!' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={handlePasswordChange}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
                helperText={
                  is_pass_error === true ? 'At least 6 characters' : ''
                }
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleForgotPasswordClick}
          >
            Update
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link className={classes.link} to='/user/sign-in' variant='body2'>
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
