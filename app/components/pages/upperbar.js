import React, { Component } from 'react';
import { FLIP_LOADER } from "utils/constants";

class UpperBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row header-bar">
          hello from upper bar
        </div>
      </React.Fragment>
    );
  }
}
export default UpperBar;
