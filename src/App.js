import { useState, useEffect } from "react";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import HelloWorld from "./components/HelloWorld/HelloWorld";
import SignIn from "./components/SignIn/SignIn";
import { getToken, setToken } from "./config/accessToken";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [is_logged_in, set_is_logged_in] = useState(false);
  const [access_token, set_access_token] = useState("");

  useEffect(() => {
    set_access_token(getToken());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user/sign-in" component={SignIn} />
        <Route exact path="/user/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
