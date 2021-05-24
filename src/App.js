import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import CoursesList from "./components/CoursesList/CoursesList";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import HomePage from "./components/HomePage/HomePage";
import PurchasedCourse from "./components/PurchasedCourses/PurchasedCourses";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import UserProfile from "./components/User/UserProfile";
import Verify from "./components/User/Verify";
import { getToken } from "./config/accessToken";
import Admin from "./components/Admin/Admin";
// import UploadCourse from "./components/Instructor/UploadCourse";

const UploadCourse = React.lazy(() =>
  import("./components/Instructor/UploadCourse")
);

const UploadCourseSuspense = (props) => {
  return (
    <Suspense fallback={<div>... loading</div>}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        crossorigin="anonymous"
      />
      <link
        href="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/css/fileinput.min.css"
        media="all"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        crossorigin="anonymous"
      />
      <script
        src="https://code.jquery.com/jquery-3.5.1.min.js"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/plugins/piexif.min.js"
        type="text/javascript"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/plugins/sortable.min.js"
        type="text/javascript"
      ></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
        crossorigin="anonymous"
      ></script>
      <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/fileinput.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/themes/fas/theme.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.2.0/js/locales/LANG.js"></script>
      <UploadCourse {...props} />
    </Suspense>
  );
};
function App() {
  const [is_logged_in, set_is_logged_in] = useState(false);
  const [access_token, set_access_token] = useState("");

  const [isLogout, setisLogout] = useState(true);

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
        <Route
          exact
          path="/user/purchased-course/:email"
          component={PurchasedCourse}
        />

        <Route exact path="/courses-list/:id" component={CoursesList} />
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
        <Route exact path="/course/:course_id" component={CourseDetail} />
        <Route exact path="/admin/" component={Admin}></Route>
        <Route exact path="/admin/cat-management" component={Admin}></Route>
        <Route
          exact
          path="/admin/cat-management/subcat/:id"
          component={Admin}
        ></Route>

        <Route exact path="/admin/delete-course" component={Admin}></Route>
        <Route exact path="/admin/student-management" component={Admin}></Route>
        <Route
          exact
          path="/admin/student-management/student/:id"
          component={Admin}
        ></Route>
        <Route
          exact
          path="/admin/instructor-management"
          component={Admin}
        ></Route>
        <Route
          exact
          path="/admin/instructor-management/instructor/:id"
          component={Admin}
        ></Route>

        <Route
          exact
          path="/instructor/upload-course"
          component={(props) => <UploadCourseSuspense {...props} />}
        ></Route>

        <Route exact path="/:id" component={Verify} />
      </Switch>
    </Router>
  );
}

export default App;
