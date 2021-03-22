import React, { Component } from "react";
import { auth } from "../Services/firebase";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      userType: 0,
      RegistrationSuccessful: Boolean,
      registrationMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRegister() {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.props.history.push("/Dashboard");
      })
      .catch((error) => {
        this.setState({
          registrationMessage: `${error.code} - ${error.message}`,
          loginSuccessful: false,
        });
      });
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
      <div align="center">
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
          <a href="/">
            <button>Home</button>
          </a>
          {this.state.RegistrationSuccessful === false && (
            <h1>Registration failed</h1>
          )}
        </div>
      </div>
    );
  }
}

export default RegisterPage;
