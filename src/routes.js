import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import { auth } from "./Services/firebase";
import { PrivateRoute, PublicRoute } from "./Common/AuthGuard";

// Pages
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/RegisterPage";
import HomePage from "./Views/HomePage";
import Navbar from "./Views/Navbar";
import DashboardPage from "./Views/DashboardPage";
import RegisterPageNew from "./Views/RegisterPage";
import LoginPageNew from "./Views/LoginPage";

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
        this.setState({
          currentUser: true,
        });
      } else {
        this.setState({
          authenticated: false,
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
        <PrivateRoute
          currentUser={this.state.currentUser}
          path="/"
          component={Navbar}
        />
      </Switch>
    );
  }
}
