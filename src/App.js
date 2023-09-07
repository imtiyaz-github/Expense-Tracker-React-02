import Signup from "./components/header/SignUp";
import WelcomeScreen from "./components/StaringPage/WelcomeScreen";
import { Redirect, Route } from "react-router-dom";
import { Fragment } from "react";
import Profile from "./components/StaringPage/Profile";
import { Switch } from "react-router-dom";
import Resetpassword from "./components/header/Resetpassword";
// import AddExpenses from "./components/StaringPage/AddExpenses";
import { useSelector } from "react-redux";
// import Notification from "./components/StaringPage/Notification";

function App() {
  const isLoggedIn = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Signup />
        </Route>

        {isLoggedIn && (
          <Route path="/welcomescreen" exact>
            <WelcomeScreen />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/welcomescreen/profile">
            <Profile />
          </Route>
        )}
        <Route path="/resetpassword" exact>
          <Resetpassword />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
