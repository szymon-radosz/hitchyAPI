import React, { Component } from "react";
import axios from "axios";
import SingleMeetingOnList from "./MeetingsListComponents/SingleMeetingOnList.js";
import MapComponent from "./../Map/MapComponent.js";

class MainMeetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingsData: [],
      markersData: [],
      centerCoord: [],
      lat: 40.73061,
      lng: -73.935242
    };

    this.setCoordinates = this.setCoordinates.bind(this);
    this.setNewCenterCoords = this.setNewCenterCoords.bind(this);
  }

  setNewCenterCoords(lat, lng) {
    this.setState({ centerCoord: [lat, lng] });
  }

  async componentDidMount() {
    this.props.switchLoader(true);
    try {
      const allMeetings = await axios.get(`http://127.0.0.1:8000/api/events`);

      await allMeetings.data.map((item, i) => {
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

        let singleMarkerData = {
          key: item.title,
          position: [item.startPlaceLattitude, item.stopPlaceLattitude],
          text: item.title
        };

        this.setState(prevState => ({
          meetingsData: [...prevState.meetingsData, meetingObject],
          markersData: [...prevState.markersData, singleMarkerData]
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
            </div>

            <div className="col-sm-6">
              <MapComponent
                latCenter={this.state.lat}
                lngCenter={this.state.lng}
                markersData={this.state.markersData}
                centerCoord={this.state.centerCoord}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MainMeetings;
