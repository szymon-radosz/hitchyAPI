import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Animate from "react-smooth";

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
        <Animate steps={this.props.animationSteps}>
          <div className="panel panel-default shadowPanel">
            <div className="panel-heading">
              <h4 className="panel-title bold">
                {this.props.item.title}{" "}
                {this.props.item.users.length == this.props.item.limit &&
                  "- Osiągnięto limit"}
              </h4>
            </div>
            <div className="panel-body">
              <p>
                <span className="bold">Data: </span>
                {this.props.item.startDate}
              </p>
              <p>
                <span className="bold">Opis: </span>
                {this.props.item.description}
              </p>
              <p>
                <span className="bold">Stworzone przez: </span>
                {this.props.item.users[0].nickName}
              </p>
              <p>
                <span className="bold">Limit uczestników: </span>
                {this.props.item.limit} (wzięło udział:{" "}
                {this.props.item.users.length})
              </p>
              <Link to={`/events/${this.props.item.id}`}>
                <div className="btn btn-default btnBlue btnCircled">
                  Szczegóły
                </div>
              </Link>
              <div
                className="btn btn-default btnBlue btnCircled"
                onClick={() => {
                  this.props.setNewCenterCoords(
                    this.props.item.startPlaceLattitude,
                    this.props.item.startPlaceLongitude
                  );
                }}
              >
                Punkt Początkowy
              </div>
              <div
                className="btn btn-default btnBlue btnCircled"
                onClick={() => {
                  this.props.setNewCenterCoords(
                    this.props.item.stopPlaceLattitude,
                    this.props.item.stopPlaceLongitude
                  );
                }}
              >
                Punkt Końcowy
              </div>
            </div>
          </div>
        </Animate>
      </div>
    );
  }
}
export default SingleMeetingOnList;
