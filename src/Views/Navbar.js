import React, { Component } from "react";
import { auth } from "../Services/firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import LocationPage from "./LocationPage";
import DashboardPage from "./DashboardPage";
import About from "./AboutPage";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

var logoutImgStyle = {
  width: "20px",
  filter: "brightness(0) invert(1) opacity(70%)",
  cursor: "pointer",
  height: "20px",
  marginRight: "1em",
  marginTop: "1px"
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
      this.props.history.push("/DashboardPage");
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
    console.log("TAB", event.target.getAttribute("name"));
    this.props.history.push(`/${event.target.getAttribute("name")}`);
  };

  render() {
    const logoutImg = "/static/logout.svg";
    return (
      <div>
        <div className={styles.root}>
          <AppBar position="static">
            <Toolbar>
              <div style={{ width: "50%" }}>
                <Typography
                  name="DashboardPage"
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
                  name="LocationPage"
                  variant="h4"
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
                  name="AppointmentsPage"
                  variant="h4"
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
                  name="About"
                  variant="h4"
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
                <Typography
                  variant="h4"
                  color="inherit"
                  style={{ marginRight: "10px" }}
                >
                  Signout
                </Typography>
                <img
                  src={logoutImg}
                  alt="Logout"
                  style={logoutImgStyle}
                  onClick={this.handleSignout}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Switch>
            <Route exact path="/DashboardPage" component={DashboardPage} />
            <Route exact path="/About" component={About} />
            <Route exact path="/LocationPage" component={LocationPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Navbar));
