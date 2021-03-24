import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { auth } from "./Services/firebase";
import { PrivateRoute, PublicRoute } from "./Common/AuthGuard";

// Pages
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/RegisterPage";
import HomePage from "./Views/HomePage";
import Navbar from "./Views/Navbar";
import LocationPage from "./Views/LocationPage";

 class RouteConfig extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: Boolean,
    };
  }

  componentDidMount() {
    this.authlistener = auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: true,
        });
      } else {
        this.setState({
          currentUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.authlistener();
  }

  render() {
    return (
      <Switch>
        <Route exact path={"/home"} component={HomePage} />
        <PublicRoute
          currentUser={this.state.currentUser}
          path={"/login"}
          component={LoginPage}
        />
        <PublicRoute
          currentUser={this.state.currentUser}
          path={"/register"}
          component={RegisterPage}
        />
        <PublicRoute
          currentUser={this.state.currentUser}
          path="/location"
          component={LocationPage}
        />
        <PrivateRoute
          currentUser={this.state.currentUser}
          path="/"
          component={Navbar}
        />
      </Switch>
    );
  }
}

export default withRouter(RouteConfig);
