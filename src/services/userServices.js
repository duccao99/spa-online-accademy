import http from "./httpService";

const apiEndpoint = "/api/user/sign-up";

export function register(user) {
  return http.post(apiEndpoint, user);
}
