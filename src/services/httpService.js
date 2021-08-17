import axios from "axios";
import * as env_config from "../config/env.config";

axios.defaults.baseURL = env_config.DEV_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 404 && error.response < 500;

  if (expectedError) {
    return Promise.reject(error);
  }

  if (error.response && error.response.data.message === 'Access token not found!') {
    const accessToken = sessionStorage.getItem('accessToken')
    const refreshToken = sessionStorage.getItem('refreshToken')

    const payload = {
      accessToken,
      refreshToken
    }

    return axios.post('/api/auth/refresh', payload).then(response => {
        const {accessToken} = response.data
        sessionStorage.getItem('accessToken', accessToken)
        setJwt(accessToken)
        error.response.config.headers['x-auth-token'] = accessToken;
        return axios(error.response.config);
    }).catch(error => {
        sessionStorage.clear();
        window.location.href = '/user/sign-in'
        return Promise.reject(error);
    });
  }
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
