import { Component } from "react";
import { withRouter } from "react-router-dom";

class MapRedirect extends Component {
  componentDidMount() {
    this.props.history.push("/LocationPage");
  }

  render() {
    return null;
  }
}

export default withRouter(MapRedirect);
