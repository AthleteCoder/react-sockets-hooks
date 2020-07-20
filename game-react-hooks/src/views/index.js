import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import useAuthentication from "../utils/useAuthentication";
import LinearProgress from "@material-ui/core/LinearProgress";
import PrivateRoute from "./PrivateRoute";
import Lobby from "./Lobby/Lobby";
import NavBar from "../components/NavBar/NavBar";

function Layout() {
  const loading = useAuthentication();
  if (loading) return <LinearProgress />;
  return (
    <>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={Signup} exact />
          <PrivateRoute path="/lobby" exact component={Lobby} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </>
  );
}

export default Layout;
