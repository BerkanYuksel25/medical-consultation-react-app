// @ts-nocheck
import { Component } from "react";
import PropTypes from "prop-types";
import React from "react";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headaches: "",
      fever: "",
      covidContact: "",
      soreThroat: "",
      shortnessOfBreath: "",
      cough: "",
    };
  }

  componentDidMount() {
    const { steps } = this.props;
    const {
      headaches,
      fever,
      soreThroat,
      cough,
      shortnessOfBreath,
      covidContact,
    } = steps;

    this.setState({
      headaches,
      fever,
      soreThroat,
      cough,
      shortnessOfBreath,
      covidContact,
    });
  }

  render() {
    const {
      headaches,
      fever,
      soreThroat,
      cough,
      shortnessOfBreath,
      covidContact,
    } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Headaches</td>
              <td>{headaches.value}</td>
            </tr>
            <tr>
              <td>Fever</td>
              <td>{fever.value}</td>
            </tr>
            <tr>
              <td>Sore Throat</td>
              <td>{soreThroat.value}</td>
            </tr>
            <tr>
              <td>Cough</td>
              <td>{cough.value}</td>
            </tr>
            <tr>
              <td>Shortness Of Breath</td>
              <td>{shortnessOfBreath.value}</td>
            </tr>
            <tr>
              <td>Contact with COVID</td>
              <td>{covidContact.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default Review;
