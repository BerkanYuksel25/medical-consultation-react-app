import React, { Component } from "react";
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import AuthenticationGuard from "./Authentication/AuthenticationGuard";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={"/login"} component={Login} />
          <Route path={"/Register"} component={Register} />
          <AuthenticationGuard>
            <Route path={"/Dashboard"} component={Dashboard} />
          </AuthenticationGuard>
        </Switch>
      </BrowserRouter>
    );
  }
}