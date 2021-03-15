import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div align="center">
            Dashboard
        </div>
    );
  }
}
export default withRouter(Dashboard);