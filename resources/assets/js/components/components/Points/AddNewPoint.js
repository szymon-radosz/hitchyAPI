import React, { Component } from "react";
import axios from "axios";
import MapComponent from "./../Map/MapComponent.js";

class AddNewMeeting extends Component {
  constructor(props) {
    super(props);

    console.log(sessionStorage.getItem("userNickName"));

    this.state = {
      title: "",
      description: "",
      author: "",
      lattitude: "",
      longitude: "",
      lat: 40.73061,
      lng: -73.935242,
      centerCoord: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewCoords = this.setNewCoords.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let savedPoint;

    try {
      savedPoint = await axios.post(
        `http://127.0.0.1:8000/api/point`,
        {
          name: this.state.title,
          description: this.state.description,
          authorNickName: sessionStorage.getItem("userNickName"),
          lattitude: this.state.lat,
          longitude: this.state.lng
        },
        {
          headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
        }
      );
    } catch (error) {
      console.log(error);
    }

    console.log(savedPoint);

    if (savedPoint.status == "201") {
      console.log("zapisano punkt");
      this.props.showAlertSuccess("Zapisałeś punkt.");
    } else {
      this.props.showAlertWarning("Nie udało się zapisać punktu.");
    }
  }

  setNewCoords(newLat, newLng) {
    this.setState({
      lat: newLat,
      lng: newLng
    });
  }

  render() {
    return (
      <div className="addNewMeeting row addNewMeetingRow">
        <div className="col-sm-6 addNewMeetingCol">
          <h2>Add new meeting</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lattitude">lattitude:</label>
              <input
                type="text"
                className="form-control"
                id="lattitude"
                name="lattitude"
                value={this.state.lat}
                onChange={this.handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">longitude:</label>
              <input
                type="text"
                className="form-control"
                id="longitude"
                name="longitude"
                value={this.state.lng}
                onChange={this.handleChange}
                disabled
              />
            </div>

            <input
              type="submit"
              className="btn btn-default"
              id="addNewMeetingBtn"
              value="Add new meeting"
            />
          </form>
        </div>

        <div
          className="col-sm-6 mainMeetingsMap"
          style={{ height: "calc(100vh - 60px)" }}
        >
          <MapComponent
            latCenter={this.state.lat}
            lngCenter={this.state.lng}
            allowDragableMarker={true}
            setNewCoords={this.setNewCoords}
            displayFirstMarker={true}
            displaySecondMarker={false}
            centerCoord={this.state.centerCoord}
          />
        </div>
      </div>
    );
  }
}

export default AddNewMeeting;
