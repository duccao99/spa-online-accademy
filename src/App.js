import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import HelloWorld from "./components/HelloWorld/HelloWorld";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HelloWorld} />
        <Route exact path="/user/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
