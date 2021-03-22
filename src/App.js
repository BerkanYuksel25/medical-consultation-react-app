import React, { Component } from "react";
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { auth } from './service/firebase';
import { PrivateRoute, PublicRoute } from './Authentication/AuthGuard';

// pages
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: Boolean
    }
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

  componentWillUnmount () {
    this.authlistener();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <PublicRoute currentUser={this.state.currentUser} path={"/login"} component={Login} />
          <PublicRoute currentUser={this.state.currentUser} path={"/Register"} component={Register} />
          <PrivateRoute currentUser={this.state.currentUser} path='/dashboard' component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}
