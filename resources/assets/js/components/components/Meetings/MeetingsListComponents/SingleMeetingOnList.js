import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LocateOnMapBtn from "./LocateOnMapBtn";
import axios from "axios";

class SingleMeetingOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: ""
    };

    this.sendCoordinatesToMainMeetings = this.sendCoordinatesToMainMeetings.bind(
      this
    );
  }

  sendCoordinatesToMainMeetings() {
    this.props.setCoordinates(this.props.lattitude, this.props.longitude);
  }

  render() {
    return (
      <div className="panel-group">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title bold">
              {this.props.title} - {this.props.category}
            </h4>
          </div>
          <div className="panel-body">
            <p>
              <span className="bold">Data: </span>
              {this.props.date} {this.props.time}
            </p>
            <p>
              <span className="bold">Opis: </span>
              {this.props.description}
            </p>
            <p>
              <span className="bold">Stworzone przez: </span>
              {this.props.author}
            </p>
            <p>
              <span className="bold">Limit uczestników: </span>
              {this.props.limit}
            </p>
            <Link to={`/events/${this.props.id}`}>
              <div className="btn meetingDetailsBtn">Szczegóły</div>
            </Link>
            <div
              className="btn locateBtn"
              onClick={() => {
                this.props.setNewCenterCoords(
                  this.props.startPlaceLattitude,
                  this.props.startPlaceLongitude
                );
              }}
            >
              Punkt Początkowy
            </div>
            <div
              className="btn locateBtn"
              onClick={() => {
                this.props.setNewCenterCoords(
                  this.props.stopPlaceLattitude,
                  this.props.stopPlaceLongitude
                );
              }}
            >
              Punkt Końcowy
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SingleMeetingOnList;
