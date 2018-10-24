import React, { Component } from "react";
import axios from "axios";
import MapComponent from "./../Map/MapComponent.js";
import SinglePointOnList from "./PointsListComponent/SinglePointOnList";

class MainPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointsData: [],
      markersData: [],
      lat: 40.73061,
      lng: -73.935242,
      centerCoord: [40.73061, -73.935242]
    };

    this.setNewCenterCoords = this.setNewCenterCoords.bind(this);
    this.disableVoteSelect = this.disableVoteSelect.bind(this);
    this.loadAllSpots = this.loadAllSpots.bind(this);
  }

  setNewCenterCoords(lat, lng) {
    this.setState({ centerCoord: [lat, lng] });
  }

  async loadAllSpots() {
    try {
      const allPoints = await axios.get(`http://127.0.0.1:8000/api/points`);

      console.log(allPoints);

      await allPoints.data.map(async (item, i) => {
        let checkIfUserVoteExists;

        try {
          checkIfUserVoteExists = await axios.post(
            `http://127.0.0.1:8000/api/checkIfUserVoteExists`,
            {
              user_id: sessionStorage.getItem("userId"),
              point_id: item.id
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

        let checkIfUserVote;
        if (checkIfUserVoteExists.data == 1) {
          checkIfUserVote = true;
        } else {
          checkIfUserVote = false;
        }
        console.log(checkIfUserVoteExists.data);

        let pointObject = {
          id: item.id,
          title: item.name,
          description: item.description,
          author: item.authorNickName,
          lattitude: item.lattitude,
          longitude: item.longitude,
          sumOfVotes: item.sumOfVotes,
          countVotes: item.countVotes,
          date: item.created_at,
          checkIfUserVote: checkIfUserVote
        };

        let singleMarkerData = {
          key: item.name,
          position: [item.lattitude, item.longitude],
          text: item.name
        };

        this.setState(prevState => ({
          pointsData: [...prevState.pointsData, pointObject],
          markersData: [...prevState.markersData, singleMarkerData]
        }));
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.loadAllSpots();
  }

  disableVoteSelect(pointId, voteValue) {
    let newPointsData = [...this.state.pointsData];

    newPointsData.map(elem => {
      if (elem.id == pointId) {
        elem.checkIfUserVote = true;
        elem.sumOfVotes = elem.sumOfVotes + parseInt(voteValue);
        elem.countVotes = elem.countVotes + 1;
      }
    });
    console.log(newPointsData);
    this.setState({ pointsData: newPointsData });
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
                checkIfUserVote={item.checkIfUserVote}
                title={item.title}
                description={item.description}
                author={item.author}
                lattitude={item.lattitude}
                longitude={item.longitude}
                sumOfVotes={item.sumOfVotes}
                countVotes={item.countVotes}
                date={item.date}
                setNewCenterCoords={this.setNewCenterCoords}
                showAlertSuccess={this.props.showAlertSuccess}
                showAlertWarning={this.props.showAlertWarning}
                disableVoteSelect={this.disableVoteSelect}
              />
            );
          })}
        </div>

        <div className="col-sm-6">
          <MapComponent
            latCenter={this.state.lat}
            lngCenter={this.state.lng}
            markersData={this.state.markersData}
            displayFirstMarker={false}
            centerCoord={this.state.centerCoord}
          />
        </div>
      </div>
    );
  }
}

export default MainPoints;
