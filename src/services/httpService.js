import axios from "axios";
import * as env_config from "../config/env.config";

axios.defaults.baseURL = env_config.DEV_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 404 && error.response < 500;

  if (!expectedError) {
    // logger.log(error);
    // toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
