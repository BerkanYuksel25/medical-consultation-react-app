import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../Services/firebase";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginSuccessful: Boolean,
      loginMessage: "",
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

  emptyFields() {
    return this.state.email === "" || this.state.password === "";
  }

  handleLogin() {
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.props.history.push("/Dashboard");
      })
      .catch((error) => {
        this.setState({
          loginMessage: `${error.code} - ${error.message}`,
          loginSuccessful: false,
        });
      });
  }

  render() {
    return (
      <div align="center">
        <form>
          <label>
            Email:
            <input
              type="text"
              placeholder="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
          </label>
        </form>
        <button
          style={this.submitButton}
          onClick={this.handleLogin}
          disabled={this.emptyFields()}
        >
          Login
        </button>
        <a href="/">
          <button>Home</button>
        </a>
        {this.state.loginSuccessful === false && <h1>Login failed</h1>}
      </div>
    );
  }
}
export default LoginPage;
