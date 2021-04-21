import React, { Component } from "react";
import { auth } from "../Services/firebase";

import { Switch, Route } from "react-router-dom";

import LocationPage from "./LocationPage";
import DashboardPage from "./DashboardPage";
import About from "./AboutPage";
import AppointmentsPage from "./AppointmentsPage";
import Footer from "./Footer";

import {
  Button,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    cursor: "pointer",
    marginRight: "2em",
  },
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
    this.state = {
      user: auth().currentUser,
      activeTab: 1,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/dashboard");
    }, 1000);
  }

  handleSignout = () => {
    auth()
      .signOut()
      .then((data) => {
        window.location.replace("/home");
      });
  };

  onChangeTab = (event) => {
    this.props.history.push(`/${event.target.getAttribute("name")}`);
  };

  render() {
    return (
      <div>
        <div className={styles.root}>
          <AppBar position="static">
            <Toolbar>
              <div style={{ width: "50%" }}>
                <Typography
                  name="dashboard"
                  component="p"
                  variant="h4"
                  color="inherit"
                  style={{
                    cursor: "pointer",
                    marginRight: "2em",
                    display: "inline",
                  }}
                  onClick={this.onChangeTab}
                >
                  Dashboard
                </Typography>
                <Typography
                  name="location"
                  variant="h4"
                  component="p"
                  color="inherit"
                  style={{
                    cursor: "pointer",
                    marginRight: "2em",
                    display: "inline",
                  }}
                  onClick={this.onChangeTab}
                >
                  Location
                </Typography>
                <Typography
                  name="appointments"
                  variant="h4"
                  component="p"
                  color="inherit"
                  style={{
                    cursor: "pointer",
                    marginRight: "2em",
                    display: "inline",
                  }}
                  onClick={this.onChangeTab}
                >
                  Appointments
                </Typography>
                <Typography
                  name="about"
                  variant="h4"
                  component="p"
                  color="inherit"
                  style={{
                    cursor: "pointer",
                    marginRight: "2em",
                    display: "inline",
                  }}
                  onClick={this.onChangeTab}
                >
                  About
                </Typography>
              </div>

              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="large"
                  color="inherit"
                  component="p"
                  startIcon={<ExitToAppIcon />}
                  disableElevation
                  disableRipple
                  onClick={this.handleSignout}
                >
                  Sign Out
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <Switch>
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/about" component={About} />
          <Route path="/location" component={LocationPage} />
          <Route path="/appointments" component={AppointmentsPage} />
        </Switch>
        {window.location.pathname !== "/location" && <Footer />}
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
