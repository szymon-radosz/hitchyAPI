import React, { Component } from "react";
import axios from "axios";
import _ from "underscore";
import MapComponent from "./MapComponent.js";

class AddNewMeeting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      author: "",
      lattitude: "",
      longitude: "",
      limit: "Select",
      date: "",
      lat: 40.73061,
      lng: -73.935242
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoundsChange = this.handleBoundsChange.bind(this);
    this.setNewCoords = this.setNewCoords.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.state.limit == "Select") {
      this.props.showAlertWarning("Please choose the limit of users.");
    } else if (this.state.category == "Select") {
      this.props.showAlertWarning("Please choose the category.");
    } else {
      const getUser = await axios.get(
        `http://127.0.0.1:8000/api/user/${sessionStorage.getItem("userId")}`
      );

      const savedMeeting = await axios.post(
        `http://127.0.0.1:8000/api/meeting`,
        {
          title: this.state.title,
          description: this.state.description,
          author: "test",
          lattitude: this.state.lattitude,
          longitude: this.state.longitude
          limit: this.state.limit,
          date: this.state.date
        }
      );

      if (savedMeeting.status == "201") {
        const savedMatchUserWithMeeting = await axios.post(
          `http://127.0.0.1:8000/api/matchUserWithMeeting`,
          {
            userId: sessionStorage.getItem("userId"),
            meetingId: savedMeeting.data.id
          }
        );

        if (savedMatchUserWithMeeting.status == "200") {
          this.props.showAlertSuccess("You added new meeting");
        } else {
          this.props.showAlertWarning(
            "Sorry we can't handle that. Please repeat for a while."
          );
        }
      } else {
        this.props.showAlertWarning(
          "Sorry we can't handle that. Please repeat for a while."
        );
      }
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
              <label htmlFor="lattitude">Lattitude:</label>
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
              <label htmlFor="longitude">Longitude:</label>
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
            <div className="form-group">
              <label htmlFor="limit">Limit:</label>
              <div className="form-group">
                <select
                  className="form-control"
                  name="limit"
                  id="limit"
                  onChange={this.handleChange}
                  required
                >
                  <option>Select</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>No limit</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                onChange={this.handleChange}
                required
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
          />
        </div>
      </div>
    );
  }
}

export default AddNewMeeting;
