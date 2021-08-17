import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useHistory } from 'react-router-dom';
import * as env from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';

const styles = makeStyles((theme) => ({
  facebook_button: {
    textTransform: 'capitalize!important',
    color: ' #fff;',
    cursor: ' pointer;',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 'calc(.27548vw + 12.71074px);',
    textDecoration: ' none;',
    transition: 'background-color .3s,border-color .3s;',
    backgroundColor: ' #4c69ba;',
    border: 'calc(.06887vw + .67769px) solid #4c69ba;',
    padding: '12px 50px 12px 50px!important',
    borderRadius: 2
  }
}));

export default function ReactFacebookLogin({}) {
  const [load, setLoad] = useState(false);
  const classes = styles();

  let history = useHistory();
  function signIn(username, email) {
    const fb_sign_in_url = `${env.DEV_URL}/api/user/facebook/sign-in`;
    const config = {};
    const data = {
      user_name: username,
      email: email
    };
    axios
      .post(fb_sign_in_url, data, config)
      .then((ret) => {
        const user = ret.data.user_info;
        if (user !== null) {
          sessionStorage.setItem('user_name', JSON.stringify(user.user_name));
          sessionStorage.setItem('email', JSON.stringify(user.email));
          sessionStorage.setItem('isLogout', false);
          sessionStorage.setItem('user_login_id', ret.data.user_info.user_id);
          sessionStorage.setItem('user_role', ret.data.user_info.role_id);
          history.push(ret.data.href);
        }
      })
      .catch((er) => {
        const title = 'error!';
        const html = er.response.data.message || 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
      });
  }

  const responseFacebook = (res) => {
    signIn(res.name, res.email);
  };

  const componentClicked = (e) => {};

  useEffect(() => {
    setLoad(true);
  }, [load]);
  return (
    <FacebookLogin
      appId={env.APP_ID}
      // autoLoad
      // className={classes.facebook_button}
      cssClass={classes.facebook_button}
      fields='name,email,picture'
      onClick={componentClicked}
      callback={responseFacebook}
      textButton='Sign in with Facebook'
      icon='fa-facebook'
    />
  );
}
