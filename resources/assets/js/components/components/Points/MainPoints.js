import React, { Component } from "react";
import axios from "axios";
import MapComponent from "./../Map/MapComponent.js";
import SinglePointOnList from "./PointsListComponent/SinglePointOnList";
import { store } from "./../../store";

class MainPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointsData: [],
      markersData: [],
      dateSortedBy: "",
      currentPageResult: 1,
      currentUserId: 0,
      paginationPageLimit: 0,
      filter: "",
      lat: 40.73061,
      lng: -73.935242,
      centerCoord: [40.73061, -73.935242]
    };

    this.setNewCenterCoords = this.setNewCenterCoords.bind(this);
    this.disableVoteSelect = this.disableVoteSelect.bind(this);
    this.loadAllSpots = this.loadAllSpots.bind(this);
    this.prevPointsPage = this.prevPointsPage.bind(this);
    this.nextPointsPage = this.nextPointsPage.bind(this);

    this.loadTheOldestPoint = this.loadTheOldestPoint.bind(this);
    this.loadTheLatestPoint = this.loadTheLatestPoint.bind(this);
    this.loadTheBestVoted = this.loadTheBestVoted.bind(this);
    this.loadTheMostTimeVoted = this.loadTheMostTimeVoted.bind(this);
    this.loadTheWorstVoted = this.loadTheWorstVoted.bind(this);
  }

  async loadTheOldestPoint() {
    await this.setState({
      filter: "theOldest",
      currentPageResult: 1,
      pointsData: [],
      markersData: []
    });

    await this.loadAllSpots(this.state.currentPageResult, this.state.filter);
  }

  async loadTheLatestPoint() {
    await this.setState({
      filter: "theLatest",
      currentPageResult: 1,
      pointsData: [],
      markersData: []
    });

    await this.loadAllSpots(this.state.currentPageResult, this.state.filter);
  }

  async loadTheBestVoted() {
    await this.setState({
      filter: "bestVoted",
      currentPageResult: 1,
      pointsData: [],
      markersData: []
    });

    await this.loadAllSpots(this.state.currentPageResult, this.state.filter);
  }

  async loadTheWorstVoted() {
    await this.setState({
      filter: "worstVoted",
      currentPageResult: 1,
      pointsData: [],
      markersData: []
    });

    await this.loadAllSpots(this.state.currentPageResult, this.state.filter);
  }

  async loadTheMostTimeVoted() {
    await this.setState({
      filter: "mostTimeVoted",
      currentPageResult: 1,
      pointsData: [],
      markersData: []
    });

    await this.loadAllSpots(this.state.currentPageResult, this.state.filter);
  }

  async prevPointsPage() {
    if (this.state.currentPageResult > 1) {
      await this.setState({
        pointsData: [],
        currentPageResult: this.state.currentPageResult - 1
      });
      await this.loadAllSpots(this.state.currentPageResult, this.state.filter);
    }
  }

  async nextPointsPage() {
    if (this.state.currentPageResult < this.state.paginationPageLimit) {
      await this.setState({
        pointsData: [],
        currentPageResult: this.state.currentPageResult + 1
      });
      await this.loadAllSpots(this.state.currentPageResult, this.state.filter);
    }
  }

  async setNewCenterCoords(lat, lng) {
    await this.setState({
      centerCoord: [lat, lng],
      pointsData: [],
      markersData: []
    });

    await this.loadAllSpots(1, "");
  }

  async loadAllSpots(pageNumber, filter) {
    this.props.switchLoader(true);
    try {
      let allPoints;

      if (filter == "theOldest") {
        allPoints = await axios.get(
          `http://127.0.0.1:8000/api/getTheOldestPoints/${
            this.state.centerCoord[0]
          }/${this.state.centerCoord[1]}?page=${pageNumber}`
        );
      } else if (filter == "theLatest") {
        allPoints = await axios.get(
          `http://127.0.0.1:8000/api/getTheNewestPoints/${
            this.state.centerCoord[0]
          }/${this.state.centerCoord[1]}?page=${pageNumber}`
        );
      } else if (filter == "bestVoted") {
        allPoints = await axios.get(
          `http://127.0.0.1:8000/api/getTheBestVoted/${
            this.state.centerCoord[0]
          }/${this.state.centerCoord[1]}?page=${pageNumber}`
        );
      } else if (filter == "worstVoted") {
        allPoints = await axios.get(
          `http://127.0.0.1:8000/api/getTheWorstVoted/${
            this.state.centerCoord[0]
          }/${this.state.centerCoord[1]}?page=${pageNumber}`
        );
      } else if (filter == "mostTimeVoted") {
        allPoints = await axios.get(
          `http://127.0.0.1:8000/api/getTheMostTimeVoted/${
            this.state.centerCoord[0]
          }/${this.state.centerCoord[1]}?page=${pageNumber}`
        );
      } else {
        allPoints = await axios.get(
          `http://127.0.0.1:8000/api/getPointsNearCoords/${
            this.state.centerCoord[0]
          }/${this.state.centerCoord[1]}?page=${pageNumber}`
        );
      }

      await this.setState({ paginationPageLimit: allPoints.data.last_page });

      await allPoints.data.data.map(async (item, i) => {
        let checkIfUserVoteExists;

        try {
          checkIfUserVoteExists = await axios.post(
            `http://127.0.0.1:8000/api/checkIfUserVoteExists`,
            {
              user_id: this.state.currentUserId,
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
        //console.log(checkIfUserVoteExists.data);

        let pointObject = {
          id: item.id,
          title: item.name,
          description: item.description,
          author: item.authorNickName,
          lattitude: item.lattitude,
          longitude: item.longitude,
          sumOfVotes: item.sum_of_votes,
          countVotes: item.amount_of_votes,
          date: item.created_at,
          checkIfUserVote: checkIfUserVote,
          rating: item.rating
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
        this.props.switchLoader(false);
      });
    } catch (error) {
      console.log(error);
      this.props.switchLoader(false);
    }
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
    //console.log(newPointsData);
    this.setState({ pointsData: newPointsData });
  }

  async componentDidMount() {
    let storeData = store.getState();

    if (storeData.user.user.userId) {
      await this.setState({ currentUserId: storeData.user.user.userId });
    }

    await this.loadAllSpots(this.state.currentPageResult);
  }

  render() {
    return (
      <div className="row listOfPointsRow">
        <div className="col-sm-6 listOfPointsCol">
          <div className="mainPointsButtonPanel">
            <div className="btn btn-default" onClick={this.loadTheLatestPoint}>
              Najnowsze
            </div>

            <div className="btn btn-default" onClick={this.loadTheOldestPoint}>
              Najstarsze
            </div>

            <div className="btn btn-default" onClick={this.loadTheBestVoted}>
              Najlepiej oceniane
            </div>

            <div className="btn btn-default" onClick={this.loadTheWorstVoted}>
              Najgorzej oceniane
            </div>

            <div
              className="btn btn-default"
              onClick={this.loadTheMostTimeVoted}
            >
              Najczęściej oceniane
            </div>
          </div>
          {this.state.pointsData.map((item, i) => {
            return (
              <SinglePointOnList
                key={i}
                changeMarker={this.changeMarker}
                item={item}
                setNewCenterCoords={this.setNewCenterCoords}
                showAlertSuccess={this.props.showAlertSuccess}
                showAlertWarning={this.props.showAlertWarning}
                disableVoteSelect={this.disableVoteSelect}
              />
            );
          })}

          {this.state.pointsData.length > 2 && (
            <div>
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
          )}
        </div>

        <div className="col-sm-6 pointMapContainer">
          <MapComponent
            latCenter={this.state.lat}
            lngCenter={this.state.lng}
            markersData={this.state.markersData}
            displayFirstMarker={false}
            centerCoord={this.state.centerCoord}
            setNewCenterCoords={this.setNewCenterCoords}
          />
        </div>
      </div>
    );
  }
}

export default MainPoints;
