import React, { Component } from "react";

const LocateOnMapBtn = props => (
  <div className="btn locateBtn" onClick={props.setCoordinate}>
    Lokalizuj
  </div>
);

export default LocateOnMapBtn;
