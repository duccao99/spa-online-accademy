import axios from 'axios';
import React from 'react';
import GitHubLogin from 'react-github-login';
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET
} from '../../config/env.config';

const onSuccess = (res) => {
  console.log(res);
  const data = {
    client_id: `${GITHUB_CLIENT_ID}`,
    client_secret: `${GITHUB_CLIENT_SECRET}`,
    redirect_uri: 'https://localhost:3000/',
    code: res.code
  };
  const access_token_url = `https://github.com/login/oauth/access_token`;
  axios
    .post(access_token_url, data, {})
    .then((ret) => {
      console.log(ret);
    })
    .catch((er) => {
      console.log(er);
    });
};
const onFailure = (er) => {
  console.log(er);
};

export default function ReactGithubLogin() {
  return (
    <GitHubLogin
      redirectUri='https://localhost:3000/'
      clientId={`${GITHUB_CLIENT_ID}`}
      clientSecret
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
