import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div align="center">
            Home
            <br>
            </br>
            <a href="/login" ><button>Login</button></a>
            <a href="/register" ><button>Register</button></a>

        </div>
    );
  }
}
export default withRouter(Home);