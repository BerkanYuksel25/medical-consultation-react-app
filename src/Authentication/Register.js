import React, { Component } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getToken } from "./JwtConfig";
// import { Button, Header, Grid, Form } from "semantic-ui-react";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      userType: 0,
      RegistrationSuccessful: Boolean,
      registrationMessage: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  componentDidMount() {
    const jwt = getToken();
    if (jwt) {
      this.props.history.push("/Home");
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRegister() {
    axios
      .post("/registration", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        userType: this.state.userType,
      })
      .then(
        (res) => {
          Cookies.set("auth-cookie", res.data.access_token);
          this.props.history.push("/Dashboard");
        },
        (error) => {
          this.setState({ registrationMessage: error.response.data.msg, RegistrationSuccessful: false });
        }
      );
  }

  emptyFields() {
    return (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === ""
    );
  }

  onRadioChange = (e) => {
    console.log(e.target.value);
    this.setState({
      userType: parseInt(e.target.value),
    });
  };

  render() {
    return (
        <div>
        <div style={this.formContainer}>
          <div style={this.form}>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Name"
                  onChange={this.handleInputChange}
                  name="name"
                ></input>
              </div>
            </div>
            <div class="field">
              <input
                class="input"
                type="text"
                placeholder="Email"
                onChange={this.handleInputChange}
                name="email"
              ></input>
            </div>
            <div class="field">
              <input
                class="input"
                type="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                name="password"
              ></input>
            </div>
            <div class="control">
              <label class="radio">
                <input
                  type="radio"
                  checked={this.state.userType === 0}
                  onChange={this.onRadioChange}
                  value="0"
                />
                Patient
              </label>
              <label class="radio">
                <input
                  type="radio"
                  checked={this.state.userType === 1}
                  onChange={this.onRadioChange}
                  value="1"
                />
                Doctor
              </label>
            </div>
          </div>
          <button
            style={this.submitButton}
            onClick={this.handleRegister}
            disabled={this.emptyFields()}
            class="button is-primary"
          >
            Register
          </button>
          {this.state.RegistrationSuccessful === false && (
            <h1>Registration failed</h1>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
