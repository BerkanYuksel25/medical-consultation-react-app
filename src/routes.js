import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { auth } from "./Services/firebase";
import { PrivateRoute, PublicRoute } from "./Common/AuthGuard";

// Pages
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/RegisterPage";
import HomePage from "./Views/HomePage";
import DashboardPage from "./Views/DashboardPage";
import AppointmentsPage from "./Views/AppointmentsPage";
import LocationPage from "./Views/LocationPage";

export default class RouteConfig extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: Boolean,

    };
  }

  componentDidMount() {
    this.authlistener = auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          currentUser: true,
        });
      } else {
        localStorage.removeItem("user");
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
        <Route exact path={"/"} component={HomePage} />
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
        <Route
          currentUser={this.state.currentUser}
          path="/location"
          component={LocationPage}
        />
        <PrivateRoute
          currentUser={this.state.currentUser}
          path="/dashboard"
          component={DashboardPage}
        />
        <PrivateRoute
          currentUser={this.state.currentUser}
          path={"/appointments"}
          component={AppointmentsPage}
        />
      </Switch>
    );
  }
}
