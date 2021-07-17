import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Cart from "./components/Cart/Cart";
// import CourseDetail from "./components/CourseDetail/CourseDetail";
// import CoursesList from "./components/CoursesList/CoursesList";
// import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
// import HomePage from "./components/HomePage/HomePage";
// import PurchasedCourse from "./components/PurchasedCourses/PurchasedCourses";
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import UserProfile from './components/User/UserProfile';
import Verify from './components/User/Verify';
import { getToken } from './config/accessToken';
// import Admin from "./components/Admin/Admin";
// import UploadCourse from "./components/Instructor/UploadCourse";
// const SignIn = lazy(() => import("./components/SignIn/SignIn"));
// const SignUp = lazy(() => import("./components/SignUp/SignUp"));

const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const CoursesList = lazy(() => import('./components/CoursesList/CoursesList'));
const UploadCourse = lazy(() => import('./components/Instructor/UploadCourse'));
const CourseDetail = lazy(() =>
  import('./components/CourseDetail/CourseDetail')
);
const ForgotPassword = lazy(() =>
  import('./components/ForgotPassword/ForgotPassword')
);
const PurchasedCourse = lazy(() =>
  import('./components/PurchasedCourses/PurchasedCourses')
);
const Cart = lazy(() => import('./components/Cart/Cart'));
const Admin = lazy(() => import('./components/Admin/Admin'));
const UploadedCourse = lazy(() =>
  import('./components/Instructor/UploadedCourse')
);
const FavoriteCourse = lazy(() =>
  import('./components/FavoriteCourse/FavoriteCourse')
);

const EnrollCourse = lazy(() => import('./components/Student/EnrollCourse'));

const UploadCourseSuspense = (props) => {
  return (
    <Suspense fallback={<div>... loading</div>}>
      <UploadCourse {...props} />
    </Suspense>
  );
};
function App() {
  const [is_logged_in, set_is_logged_in] = useState(false);
  const [access_token, set_access_token] = useState('');

  const [isLogout, setisLogout] = useState(true);

  useEffect(() => {
    set_access_token(getToken());

    if (access_token !== '' || access_token !== undefined) {
      set_is_logged_in(true);
    }
  }, [access_token]);

  return (
    <Router>
      <Suspense fallback={<div>........... loading</div>}>
        <Switch>
          <Route exact path='/' component={HomePage} />

          <Route exact path='/user/sign-in' component={SignIn} />

          <Route exact path='/user/sign-up' component={SignUp} />
          <Route exact path='/user/sign-out' component={HomePage} />
          <Route exact path='/user/profile' component={UserProfile} />
          <Route exact path='/user/profile/:id' component={UserProfile} />
          <Route
            exact
            path='/user/forgot-password'
            component={ForgotPassword}
          />

          <Route exact path='/user/cart' component={Cart} />
          <Route
            exact
            path='/user/purchased-course/:email'
            component={PurchasedCourse}
          />
          <Route
            exact
            path='/user/favorite-course/:email'
            component={FavoriteCourse}
          />

          <Route exact path='/courses-list/:id' component={CoursesList} />
          <Route exact path='/courses-list' component={CoursesList} />
          <Route
            exact
            path='/courses-list/byRate/:rate_value'
            component={CoursesList}
          />
          <Route
            exact
            path='/courses-list/byPrice/:price_value'
            component={CoursesList}
          />
          <Route exact path='/course/:course_id' component={CourseDetail} />
          <Route exact path='/admin/' component={Admin}></Route>
          <Route exact path='/admin/cat-management' component={Admin}></Route>
          <Route
            exact
            path='/admin/cat-management/subcat/:id'
            component={Admin}
          ></Route>

          <Route exact path='/admin/delete-course' component={Admin}></Route>
          <Route
            exact
            path='/admin/student-management'
            component={Admin}
          ></Route>
          <Route
            exact
            path='/admin/student-management/student/:id'
            component={Admin}
          ></Route>
          <Route
            exact
            path='/admin/instructor-management'
            component={Admin}
          ></Route>
          <Route
            exact
            path='/admin/instructor-management/instructor/:id'
            component={Admin}
          ></Route>

          <Route
            exact
            path='/student/enroll/course/:course_id'
            component={EnrollCourse}
          ></Route>

          <Route
            exact
            path='/instructor/upload-course'
            component={(props) => <UploadCourseSuspense {...props} />}
          ></Route>

          <Route
            exact
            path='/instructor/uploaded-course/:id'
            component={UploadedCourse}
          ></Route>

          <Route
            exact
            path='/ins/case/uploaded/:id'
            component={UploadedCourse}
          ></Route>

          <Route
            exact
            path='/ins/case/upload-lesson/:id'
            component={UploadedCourse}
          ></Route>
          <Route
            exact
            path='/ins/case/upload-chapter/:id'
            component={UploadedCourse}
          ></Route>
          <Route exact path='/join-with-ins' component={SignIn}></Route>

          <Route exact path='/:id' component={Verify} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
