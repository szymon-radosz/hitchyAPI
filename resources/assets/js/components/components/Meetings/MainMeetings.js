import React, { Component } from "react";
import axios from "axios";
import SingleMeetingOnList from "./MeetingsListComponents/SingleMeetingOnList.js";
import MapComponent from "./../Map/MapComponent.js";

const uuidv1 = require("uuid/v1");

class MainMeetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageResult: 1,
      paginationPageLimit: 1,
      meetingsData: [],
      markersData: [],
      centerCoord: [],
      lat: 40.73061,
      lng: -73.935242
    };

    this.setCoordinates = this.setCoordinates.bind(this);
    this.setNewCenterCoords = this.setNewCenterCoords.bind(this);
    this.prevPointsPage = this.prevPointsPage.bind(this);
    this.nextPointsPage = this.nextPointsPage.bind(this);
    this.loadAllMeetings = this.loadAllMeetings.bind(this);
  }

  async prevPointsPage() {
    if (this.state.currentPageResult > 1) {
      await this.setState({
        meetingsData: [],
        currentPageResult: this.state.currentPageResult - 1
      });
      await this.loadAllMeetings(this.state.currentPageResult);
    }
  }

  async nextPointsPage() {
    if (this.state.currentPageResult < this.state.paginationPageLimit) {
      await this.setState({
        meetingsData: [],
        currentPageResult: this.state.currentPageResult + 1
      });
      await this.loadAllMeetings(this.state.currentPageResult);
    }
  }

  setNewCenterCoords(lat, lng) {
    this.setState({ centerCoord: [lat, lng] });
  }

  async loadAllMeetings(page) {
    this.props.switchLoader(true);
    try {
      const allMeetings = await axios.get(
        `http://127.0.0.1:8000/api/events?page=${page}`
      );

      this.setState({ paginationPageLimit: allMeetings.data.last_page });

      await allMeetings.data.data.map((item, i) => {
        let meetingObject = {
          id: item.id,
          title: item.title,
          description: item.description,
          author: item.authorNickName,
          startPlaceLattitude: item.startPlaceLattitude,
          startPlaceLongitude: item.startPlaceLongitude,
          stopPlaceLattitude: item.stopPlaceLattitude,
          stopPlaceLongitude: item.stopPlaceLongitude,
          limit: item.limit,
          date: item.startDate
        };

        let singleStartMarkerData = {
          key: uuidv1(),
          position: [item.startPlaceLattitude, item.startPlaceLongitude],
          text: item.title
        };

        let singleStopMarkerData = {
          key: uuidv1(),
          position: [item.stopPlaceLattitude, item.stopPlaceLongitude],
          text: item.title
        };

        this.setState(prevState => ({
          meetingsData: [...prevState.meetingsData, meetingObject],
          markersData: [...prevState.markersData, singleStartMarkerData]
        }));

        this.setState(prevState => ({
          markersData: [...prevState.markersData, singleStopMarkerData]
        }));
      });
    } catch (error) {
      console.log(error);
    }
    this.props.switchLoader(false);
  }

  setCoordinates(childLat, childLng) {
    this.setState({
      lat: childLat,
      lng: childLng
    });
  }

  async componentDidMount() {
    await this.loadAllMeetings(this.state.currentPageResult);
  }

  render() {
    return (
      <div className="row listOfMeetingsRow">
        {this.props.searchInLocation ? (
          "searchInLocation istnieje"
        ) : (
          <div>
            <div className="col-sm-6 listOfMeetingsCol">
              {this.state.meetingsData.map((item, i) => {
                return (
                  <SingleMeetingOnList
                    key={i}
                    changeMarker={this.changeMarker}
                    setNewCenterCoords={this.setNewCenterCoords}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    author={item.author}
                    startPlaceLattitude={item.startPlaceLattitude}
                    startPlaceLongitude={item.startPlaceLongitude}
                    stopPlaceLattitude={item.stopPlaceLattitude}
                    stopPlaceLongitude={item.stopPlaceLongitude}
                    limit={item.limit}
                    date={item.date}
                    time={item.time}
                    setCoordinates={this.setCoordinates}
                  />
                );
              })}

              <div
                className="btn btn-default paginateBtn"
                onClick={this.prevPointsPage}
              >
                Poprzednie
              </div>
              <div
                className="btn btn-default paginateBtn"
                onClick={this.nextPointsPage}
              >
                Nastepne
              </div>
            </div>

            <div className="col-sm-6 meetingMapContainer">
              <MapComponent
                latCenter={this.state.lat}
                lngCenter={this.state.lng}
                markersData={this.state.markersData}
                centerCoord={this.state.centerCoord}
                showSearchBox={true}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MainMeetings;
