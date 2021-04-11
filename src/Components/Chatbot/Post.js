import { Component } from "react";
import React from "react";
import PropTypes from "prop-types";
import { database } from "../../Services/firebase";
import { getAge, convertToONEZERO } from "../../Common/Utils";
import { getCovidLikelihood } from "Services/api";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      covidLikelihood: "",
    };
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
  values: PropTypes.object,
};

Post.defaultProps = {
  values: undefined,
};

export default Post;
