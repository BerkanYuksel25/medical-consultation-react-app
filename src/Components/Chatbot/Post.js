import { Component } from "react";
import React from "react";
import PropTypes from "prop-types";
import { database } from "../../Services/firebase";
import { getAge, convertToONEZERO } from "../../Common/Utils";
import {
  getCovidLikelihood,
  getCovidTodayCasesByCountry,
} from "Services/api";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      covidLikelihood: "",
      trigger: false,
    };

    this.triggerNext = this.triggerNext.bind(this);
  }

  async componentDidMount() {
    const { steps } = this.props;
    var userid = JSON.parse(localStorage.getItem("user"))["uid"];
    var userdata = {};

    await database()
      .ref("users/" + userid)
      .once("value", (snap) => {
        userdata = snap.val();
      });

    const data = {
      sex: convertToONEZERO(userdata["gender"]),
      age: getAge(userdata["birthday"]),
      headaches: convertToONEZERO(steps.headaches.value),
      fever: convertToONEZERO(steps.fever.value),
      soreThroat: convertToONEZERO(steps.soreThroat.value),
      cough: convertToONEZERO(steps.cough.value),
      shortnessOfBreath: convertToONEZERO(steps.shortnessOfBreath.value),
      covidContact: convertToONEZERO(steps.covidContact.value),
    };

    const covidLikelihood = await getCovidLikelihood(data);

    this.setState({
      covidLikelihood,
    });

    await this.makeDecisionBasedOnCovidLikelihood(covidLikelihood);
  }

  async makeDecisionBasedOnCovidLikelihood(covidLikelihood) {
    const covidTodayCases = await getCovidTodayCasesByCountry(
      "australia"
    );

    const covidThresholdMultiplier = covidTodayCases >= 5 ? 1.1 : 0.9;

    const covidLikelihoodUpperThreshold = 20 * covidThresholdMultiplier;
    const covidLikelihoodLowerThreshold = 10 * covidThresholdMultiplier;

    if (covidLikelihood >= covidLikelihoodUpperThreshold) {
      this.triggerNext("high-risk");
    } else if (
      covidLikelihood <= covidLikelihoodUpperThreshold &&
      covidLikelihood >= covidLikelihoodLowerThreshold
    ) {
      this.triggerNext("medium-risk");
    } else {
      this.triggerNext("low-risk");
    }
  }

  triggerNext(nextStep) {
    this.setState({ trigger: true });
    this.props.triggerNextStep({ trigger: nextStep });
  }

  render() {
    const { covidLikelihood } = this.state;
    return (
      <div>
        Our results indicate that your COVID likelihood is{" "}
        {covidLikelihood.toString()}%
      </div>
    );
  }
}

Post.propTypes = {
  triggerNextStep: PropTypes.func,
};

Post.defaultProps = {
  triggerNextStep: undefined,
};

export default Post;
