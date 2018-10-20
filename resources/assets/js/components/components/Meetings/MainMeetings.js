import React, { Component } from "react";
import axios from "axios";
import SingleMeetingOnList from "./MeetingsListComponents/SingleMeetingOnList.js";
import MapComponent from "./MapComponent.js";

class MainMeetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingsData: [],
      lat: 40.73061,
      lng: -73.935242
    };

    this.setCoordinates = this.setCoordinates.bind(this);
  }

  async componentDidMount() {
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

        this.setState(prevState => ({
          meetingsData: [...prevState.meetingsData, meetingObject]
        }));
      });
    } catch (error) {
      console.log(error);
    }
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
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    author={item.author}
                    lattitude={item.lattitude}
                    longitude={item.longitude}
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
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MainMeetings;
