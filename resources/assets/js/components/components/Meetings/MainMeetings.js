import React, { Component } from "react";
import axios from "axios";
import SingleMeetingOnList from "./MeetingsListComponents/SingleMeetingOnList.js";
import MapComponent from "./../Map/MapComponent.js";
import Animate from "react-smooth";

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

  async setNewCenterCoords(lat, lng) {
    await this.setState({ centerCoord: [lat, lng] });

    await this.loadAllMeetings(1);
  }

  async loadAllMeetings(page) {
    this.props.switchLoader(true);
    try {
      const allMeetings = await axios.get(
        `${this.props.appPath}/api/events/${this.state.centerCoord[0]}/${
          this.state.centerCoord[1]
        }?page=${page}`
      );

      await this.setState({
        paginationPageLimit: allMeetings.data.last_page,
        meetingsData: [],
        markersData: []
      });

      await allMeetings.data.data.map((item, i) => {
        console.log(item);

        let singleStartMarkerData = {
          key: uuidv1(),
          position: [item.startPlaceLattitude, item.startPlaceLongitude],
          text: item.title,
          limit: item.limit,
          countUsers: item.users.length
        };

        let singleStopMarkerData = {
          key: uuidv1(),
          position: [item.stopPlaceLattitude, item.stopPlaceLongitude],
          text: item.title,
          limit: item.limit,
          countUsers: item.users.length
        };

        this.setState(prevState => ({
          meetingsData: [...prevState.meetingsData, item],
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
                    item={item}
                    setCoordinates={this.setCoordinates}
                    animationSteps={this.props.animationSteps}
                  />
                );
              })}

              <Animate steps={this.props.animationSteps}>
                <div>
                  <div
                    className="btn btn-default paginateBtn btnCircled btnGray"
                    onClick={this.prevPointsPage}
                  >
                    Poprzednie
                  </div>
                  <div
                    className="btn btn-default paginateBtn btnCircled btnGray"
                    onClick={this.nextPointsPage}
                  >
                    Nastepne
                  </div>
                </div>
              </Animate>
            </div>

            <div className="col-sm-6 meetingMapContainer">
              <MapComponent
                latCenter={this.state.lat}
                lngCenter={this.state.lng}
                markersData={this.state.markersData}
                centerCoord={this.state.centerCoord}
                setNewCenterCoords={this.setNewCenterCoords}
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
