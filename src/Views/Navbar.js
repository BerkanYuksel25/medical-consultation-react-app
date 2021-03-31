import React, { Component } from "react";
import { auth } from "../Services/firebase";
import HealthAssistant from "../Components/Chatbot/HealthAssistant";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import DashboardPage from "./DashboardPage";
import About from "./AboutPage";
import LocationPage from "./LocationPage";

import { PrivateRoute } from "../Common/AuthGuard";

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
    this.props.history.push("/DashboardPage");
  }

  handleSignout() {
    auth()
      .signOut()
      .then((data) => {
        window.location.replace("/home");
      });
  }

  onChangeTab = (event) => {
    console.log("TAB", event.target.id);
    this.setState({ activeTab: event.target.id });
    this.props.history.push(`/${event.target.name}`);
  };

  render() {
    return (
      <div>
        <nav
          class="navbar navbar-expand-lg"
          style={{ backgroundColor: "#8A31FF", paddingBottom: 0 }}
        >
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item" style={{ marginRight: "3em" }}>
                <a
                  class="nav-link"
                  href="#"
                  style={{
                    color: "white",
                    fontFamily: "Atten Round New",
                    padding: "0.5em 0 0 0",
                    fontSize: "25px",
                  }}
                ></a>
              </li>
              <li class="nav-item" style={{ marginRight: "3em" }}>
                <a
                  id="1"
                  name="DashboardPage"
                  class="nav-link"
                  style={{
                    color: "white",
                    fontFamily: "Atten Round New",
                    padding: "0.5em 0 0 0",
                    fontSize: "25px",
                    borderBottom:
                      this.state.activeTab == 1 ? "4px solid #00BAFF" : null,
                    cursor: "pointer",
                  }}
                  onClick={this.onChangeTab}
                >
                  Dashboard <span class="sr-only"></span>
                </a>
              </li>
              <li class="nav-item" style={{ marginRight: "3em" }}>
                <a
                  id="2"
                  name="About"
                  class="nav-link"
                  style={{
                    color: "white",
                    fontFamily: "Atten Round New",
                    borderBottom:
                      this.state.activeTab == 2 ? "4px solid #00BAFF" : null,
                    padding: "0.5em 0 0 0",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={this.onChangeTab}
                >
                  About
                </a>
              </li>
              <li class="nav-item" style={{ marginRight: "3em" }}>
                <a
                  id="3"
                  name="LocationPage"
                  class="nav-link"
                  style={{
                    color: "white",
                    fontFamily: "Atten Round New",
                    borderBottom:
                      this.state.activeTab == 3 ? "4px solid #00BAFF" : null,
                    padding: "0.5em 0 0 0",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={this.onChangeTab}
                >
                  Location
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <a
                class="nav-link"
                style={{
                  color: "white",
                  fontFamily: "Atten Round New",
                  padding: "0.5em 0 0 0",
                  fontSize: "25px",
                  borderBottom:
                    this.state.activeTab == 3 ? "4px solid #00BAFF" : null,
                  cursor: "pointer",
                }}
                onClick={this.handleSignout}
              >
                Sign out
              </a>
            </form>
          </div>
        </nav>

        <div>
          <Switch>
            <Route path="/DashboardPage" component={DashboardPage} />
            <Route path="/About" component={About} />
            <Route path="/LocationPage" component={LocationPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
