import React, { Component } from "react";
import axios from "axios";
import MapComponent from "./../Map/MapComponent.js";
import { store } from "./../../store";
import Animate from "react-smooth";
import { BrowserRouter as Router, Link } from "react-router-dom";

class AddNewMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      userId: "",
      lattitude: "",
      longitude: "",
      lat: 40.73061,
      lng: -73.935242,
      vote: 1,
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
        `${this.props.appPath}/api/point`,
        {
          name: this.state.title,
          description: this.state.description,
          user_id: this.state.userId,
          lattitude: this.state.lat,
          longitude: this.state.lng,
          vote: this.state.vote
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

    if (savedPoint.status == "201") {
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

  componentDidMount() {
    let storeData = store.getState();

    if (storeData.user.user.userId) {
      this.setState({ userId: storeData.user.user.userId });
    }
  }

  render() {
    if (this.props.userIsLoggedIn || this.props.guestUser) {
      return (
        <div className="addNewPoint row addNewPointRow">
          <div className="col-sm-6 addNewPointCol">
            <Animate steps={this.props.animationSteps}>
              <div>
                <h2>Dodaj nowy punkt</h2>

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
                    <label htmlFor="vote">Ocena:</label>
                    <div className="form-group">
                      <select
                        className="form-control"
                        name="vote"
                        id="vote"
                        onChange={this.handleChange}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lattitude">Szerokość geograficzna:</label>
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
                    <label htmlFor="longitude">Wysokość geograficzna:</label>
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
                  {this.props.guestUser ? (
                    <Link
                      to="/login"
                      className="btn btn-default btnBlue btnCircled"
                    >
                      Zaloguj się, aby dodać wydarzenie
                    </Link>
                  ) : (
                    <input
                      type="submit"
                      className="btn btn-default btnBlue btnCircled"
                      id="addNewMeetingBtn"
                      value="Dodaj"
                    />
                  )}
                </form>
              </div>
            </Animate>
          </div>

          <div
            className="col-sm-6 mainMeetingsMap"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div className="mapHint">
              <p>
                Ustaw marker w interesującej Cię lokalizacji, żeby zmienić
                współrzędne punktu.
              </p>
            </div>
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
    } else {
      return (
        <div>
          <h4 className="emptyHeader">
            Musisz być zalogowany lub mieć status gościa poprzez odnośnik na
            stronie głównej.
          </h4>
        </div>
      );
    }
  }
}

export default AddNewMeeting;
