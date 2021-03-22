import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const firebaseApp = firebase.apps[0];
    return (
      <div align="center">
        Home
        <code>
          <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
        </code>
        <br>
        </br>
        <a href="/login" ><button>Login</button></a>
        <a href="/register" ><button>Register</button></a>

      </div>
    );
  }
}
export default withRouter(Home);