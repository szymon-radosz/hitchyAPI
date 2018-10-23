import React, { Component } from "react";
import axios from "axios";
import MapComponent from "./../Map/MapComponent.js";
import SinglePointOnList from "./PointsListComponent/SinglePointOnList";

class MainMeetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointsData: [],
      lat: 40.73061,
      lng: -73.935242
    };
  }

  async componentDidMount() {
    try {
      const allPoints = await axios.get(`http://127.0.0.1:8000/api/points`);

      console.log(allPoints);

      await allPoints.data.map((item, i) => {
        let pointObject = {
          id: item.id,
          title: item.name,
          description: item.description,
          author: item.authorNickName,
          lattitude: item.lattitude,
          longitude: item.longitude,
          date: item.created_at
        };

        this.setState(prevState => ({
          pointsData: [...prevState.pointsData, pointObject]
        }));
      });
    } catch (error) {
      console.log(error);
    }
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
                date={item.date}
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
