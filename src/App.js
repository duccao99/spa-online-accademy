import { useState, useEffect } from "react";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import { getToken, setToken } from "./config/accessToken";
import HomePage from "./components/HomePage/HomePage";
import CoursesList from "./components/CoursesList/CoursesList";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import Cart from "./components/Cart/Cart";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UserProfile from "./components/User/UserProfile";
import FacebookSignIn from "./components/SignIn/FacebookSignInButton";

function App() {
  const [is_logged_in, set_is_logged_in] = useState(false);
  const [access_token, set_access_token] = useState("");

  useEffect(() => {
    set_access_token(getToken());

    if (access_token !== "" || access_token !== undefined) {
      set_is_logged_in(true);
    }
  }, [access_token]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user/sign-in" component={SignIn} />

        <Route exact path="/user/sign-up" component={SignUp} />
        <Route exact path="/user/sign-out" component={HomePage} />
        <Route exact path="/user/profile" component={UserProfile} />
        <Route exact path="/user/profile/:id" component={UserProfile} />
        <Route exact path="/user/forgot-password" component={ForgotPassword} />

        <Route exact path="/user/cart" component={Cart} />
        <Route exact path="/courses-list" component={CoursesList} />
        <Route
          exact
          path="/courses-list/byRate/:rate_value"
          component={CoursesList}
        />
        <Route
          exact
          path="/courses-list/byPrice/:price_value"
          component={CoursesList}
        />
        <Route exact path="/courses-list/:id" component={CoursesList} />
        <Route exact path="/course/:course_id" component={CourseDetail} />
      </Switch>
    </Router>
  );
}

export default App;
