import React, { Component } from "react";
import axios from "axios";
import _ from "underscore";
import MapComponent from "./../Map/MapComponent.js";

class AddNewMeeting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      author: "",
      lattitude: "",
      longitude: "",
      stopLat: "",
      stopLng: "",
      limit: "Select",
      date: "",
      lat: 40.73061,
      lng: -73.935242,
      secondLat: 40.8,
      secondLng: -73.99,
      centerCoord: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewCoords = this.setNewCoords.bind(this);
    this.setNewSecondCoords = this.setNewSecondCoords.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let savedMeeting;
    let savedMatchUserWithMeeting;
    let savedMeetingId;

    if (this.state.limit == "Wybierz") {
      this.props.showAlertWarning("Wybierz limit użytkowników.");
    } else {
      try {
        savedMeeting = await axios.post(
          `http://127.0.0.1:8000/api/events`,
          {
            title: this.state.title,
            description: this.state.description,
            authorNickName: sessionStorage.getItem("userNickName"),
            startPlaceLattitude: this.state.lat,
            startPlaceLongitude: this.state.lng,
            stopPlaceLattitude: this.state.secondLat,
            stopPlaceLongitude: this.state.secondLng,
            limit: this.state.limit,
            startDate: this.state.date
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

      console.log(savedMeeting);

      if (savedMeeting.status == "201") {
        try {
          savedMatchUserWithMeeting = await axios.post(
            `http://127.0.0.1:8000/api/matchUserWithMeeting`,
            {
              userId: sessionStorage.getItem("userId"),
              eventId: savedMeeting.data.id
            }
          );
        } catch (error) {
          console.log(error);
          this.props.showAlertWarning("Nie udało się zapisać spotkania.");
        }

        if (savedMatchUserWithMeeting.status == "200") {
          this.props.showAlertSuccess("You added new meeting");
        } else {
          this.props.showAlertWarning("Nie udało się zapisać spotkania.");
        }
      } else {
        this.props.showAlertWarning("Nie udało się zapisać spotkania.");
      }
    }
  }

  setNewCoords(newLat, newLng) {
    this.setState({
      lat: newLat,
      lng: newLng
    });
  }

  setNewSecondCoords(newLat, newLng) {
    this.setState({
      secondLat: newLat,
      secondLng: newLng
    });
  }

  render() {
    return (
      <div className="addNewMeeting row addNewMeetingRow">
        <div className="col-sm-6 addNewMeetingCol">
          <h2>Dodaj nowy wyjazd/wydarzenie</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Tytuł:</label>
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
              <label htmlFor="description">Opis:</label>
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
              <label htmlFor="lattitude">
                Szerokość geograficzna punktu startowego:
              </label>
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
              <label htmlFor="longitude">
                Wysokość geograficzna punktu startowego:
              </label>
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
              <label htmlFor="lattitude">
                Szerokość geograficzna punktu końcowego:
              </label>
              <input
                type="text"
                className="form-control"
                id="stopLat"
                name="stopLat"
                value={this.state.secondLat}
                onChange={this.handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">
                Wysokość geograficzna punktu startowego:
              </label>
              <input
                type="text"
                className="form-control"
                id="stopLng"
                name="stopLng"
                value={this.state.secondLng}
                onChange={this.handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="limit">Limit uczestników:</label>
              <div className="form-group">
                <select
                  className="form-control"
                  name="limit"
                  id="limit"
                  onChange={this.handleChange}
                  required
                >
                  <option>Wybierz</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>Bez limitu</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">Data:</label>
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
              value="Dodaj"
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
            displaySecondMarker={true}
            secondLatCenter={this.state.secondLat}
            secondLngCenter={this.state.secondLng}
            setNewSecondCoords={this.setNewSecondCoords}
            centerCoord={this.state.centerCoord}
          />
        </div>
      </div>
    );
  }
}

export default AddNewMeeting;
