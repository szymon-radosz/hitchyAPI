import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/*import LocateOnMapBtn from "./LocateOnMapBtn";*/
import axios from "axios";

class SingleMeetingOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: ""
    };
  }

  render() {
    return (
      <div className="panel-group">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title bold">{this.props.title}</h4>
          </div>
          <div className="panel-body">
            <p>
              <span className="bold">Date: </span>
              {this.props.date}
            </p>
            <p>
              <span className="bold">Description: </span>
              {this.props.description}
            </p>
            <p>
              <span className="bold">Created by: </span>
              {this.props.author}
            </p>

            {/*<Link to={`/events/${this.props.id}`}>
              <div className="btn meetingDetailsBtn">Details</div>
            </Link>
            <LocateOnMapBtn
              setCoordinate={this.sendCoordinatesToMainMeetings}
    />*/}
          </div>
        </div>
      </div>
    );
  }
}
export default SingleMeetingOnList;
