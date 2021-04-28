import { Component } from "react";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

class Recheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trigger: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ trigger: true });
    this.props.triggerNextStep({ trigger: "intro" });
  }

  render() {
    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleClick}>Assess COVID likelihood again</Button>
      </div>
    );
  }
}

Recheck.propTypes = {
  triggerNextStep: PropTypes.func,
};

Recheck.defaultProps = {
  triggerNextStep: undefined,
};

export default Recheck;
