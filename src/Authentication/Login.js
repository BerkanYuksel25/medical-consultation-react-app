import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
// import { Button, Header, Grid, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";

// import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginSuccessful: Boolean,
      loginMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.RedirectToRegister = this.RedirectToRegister.bind(this);

  }

  RedirectToRegister() {
    this.props.history.push("/Register");
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin() {
    axios
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(
        (res) => {
          Cookies.set("auth-cookie", res.data.access_token);
          this.props.history.push("/Home");
        },
        (error) => {
          this.setState({ loginMessage: error.response.data.msg ,loginSuccessful: false });
        }
      );
  }

  render() {
    return (
        <div align="center">
        <form onSubmit={this.handleSubmit}>
          <label>
              Email: 
              <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} ></input>
          </label>
          <label>
              Password:
              <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} ></input>
          </label>
          <input type="submit" value="login" />
        </form>
    </div>
    );
  }
}
export default withRouter(Login);
