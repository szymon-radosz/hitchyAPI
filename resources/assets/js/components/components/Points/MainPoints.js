import React, { Component } from "react";
import axios from "axios";
import MapComponent from "./../Meetings/MapComponent.js";
import SinglePointOnList from "./../Meetings/MapComponent.js";

class MainMeetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointsData: [],
      lat: 40.73061,
      lng: -73.935242
    };

    this.setCoordinates = this.setCoordinates.bind(this);
  }

  async componentDidMount() {
    try {
      const allPoints = await axios.get(`http://127.0.0.1:8000/api/points`);

      await allPoints.data.map((item, i) => {
        let pointObject = {
          id: item.id,
          title: item.title,
          description: item.description,
          author: item.authorNickName,
          lattitude: item.lattitude,
          longitude: item.longitude
        };

        this.setState(prevState => ({
          pointsData: [...prevState.pointsData, pointObject]
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
        <div className="col-sm-6 listOfMeetingsCol">
          {this.state.pointsData.map((item, i) => {
            return (
              <SinglePointOnList
                key={i}
                changeMarker={this.changeMarker}
                id={item.id}
                title={item.title}
                description={item.description}
                author={item.author}
                lattitude={item.lattitude}
                longitude={item.longitude}
                setCoordinates={this.setCoordinates}
              />
            );
          })}
        </div>

        <div className="col-sm-6">
          <MapComponent latCenter={this.state.lat} lngCenter={this.state.lng} />
        </div>
      </div>
    );
  }
}

export default MainMeetings;
