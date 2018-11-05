import React, { Component } from "react";

class LocateOnMapBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="btn locateBtn" onClick={this.props.setCoordinate}>
        Lokalizuj
      </div>
    );
  }
}

export default LocateOnMapBtn;
