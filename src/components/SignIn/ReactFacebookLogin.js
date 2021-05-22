import axios from "axios";
import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import * as env from "../../config/env.config";

export default function ReactFacebookLogin({}) {
  const [load, setLoad] = useState(false);

  let history = useHistory();
  function signIn(username, email) {
    console.log("func sign in ", username, email);
    const fb_sign_in_url = `${env.DEV_URL}/api/user/facebook/sign-in`;
    const config = {};
    const data = {
      user_name: username,
      email: email,
    };
    axios.post(fb_sign_in_url, data, config).then((ret) => {
      const user = ret.data.user_info;
      console.log(user);
      sessionStorage.setItem("user_name", JSON.stringify(user.user_name));
      sessionStorage.setItem("email", JSON.stringify(user.email));
      sessionStorage.setItem("isLogout", false);
      history.push(ret.data.href);
    });
  }

  const responseFacebook = (res) => {
    console.log(res);

    signIn(res.name, res.email);
  };

  const componentClicked = (e) => {};

  useEffect(() => {
    setLoad(true);
  }, [load]);
  return (
    <FacebookLogin
      appId={env.APP_ID}
      autoLoad
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      textButton="Sign in with Facebook"
      icon="fa-facebook"
    />
  );
}
