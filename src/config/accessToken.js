function setToken(token) {
  sessionStorage.setItem("access_token", JSON.stringify(token));
}

function getToken() {
  const token = JSON.parse(sessionStorage.getItem("access_token"));
  return token;
}

export { setToken, getToken };
