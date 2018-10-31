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
      dateSortedBy: "",
      currentPageResult: 1,
      paginationPageLimit: 0,
      lat: 40.73061,
      lng: -73.935242,
      centerCoord: [40.73061, -73.935242]
    };

    this.setNewCenterCoords = this.setNewCenterCoords.bind(this);
    this.disableVoteSelect = this.disableVoteSelect.bind(this);
    this.loadAllSpots = this.loadAllSpots.bind(this);
    this.getTheNewestPoints = this.getTheNewestPoints.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.prevPointsPage = this.prevPointsPage.bind(this);
    this.nextPointsPage = this.nextPointsPage.bind(this);
  }

  async prevPointsPage() {
    if (this.state.currentPageResult > 1) {
      await this.setState({
        pointsData: [],
        currentPageResult: this.state.currentPageResult - 1
      });
      await this.loadAllSpots(this.state.currentPageResult);
    }
  }

  async nextPointsPage() {
    if (this.state.currentPageResult < this.state.paginationPageLimit) {
      await this.setState({
        pointsData: [],
        currentPageResult: this.state.currentPageResult + 1
      });
      await this.loadAllSpots(this.state.currentPageResult);
    }
  }

  setNewCenterCoords(lat, lng) {
    this.setState({ centerCoord: [lat, lng] });
  }

  async getTheNewestPoints(sortBy) {
    if (sortBy == "newest" && this.state.dateSortedBy == "oldest") {
      this.setState({ dateSortedBy: "newest" });
      let newState = [...this.state.pointsData];
      newState.reverse();
      this.setState({ pointsData: newState });
    } else if (sortBy == "oldest" && this.state.dateSortedBy == "newest") {
      this.setState({ dateSortedBy: "oldest" });
      let newState = [...this.state.pointsData];
      newState.reverse();
      this.setState({ pointsData: newState });
    }
  }

  async loadAllSpots(pageNumber) {
    this.props.switchLoader(true);
    try {
      const allPoints = await axios.get(
        `http://127.0.0.1:8000/api/points?page=${pageNumber}`
      );

      console.log(allPoints.data);

      this.setState({ paginationPageLimit: allPoints.data.last_page });

      await allPoints.data.data.map(async (item, i) => {
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

  async componentDidMount() {
    this.setState({ dateSortedBy: "newest" });
    await this.loadAllSpots(this.state.currentPageResult);
  }

  filterResults(sortBy, theBestResults) {
    let newState = [...this.state.pointsData];

    if (theBestResults && sortBy == "rating") {
      newState
        .sort(
          (a, b) => (a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0)
        )
        .reverse();
    } else if (theBestResults && sortBy == "countVotes") {
      newState
        .sort(
          (a, b) =>
            a.countVotes > b.countVotes
              ? 1
              : b.countVotes > a.countVotes
                ? -1
                : 0
        )
        .reverse();
    } else if (!theBestResults && sortBy == "rating") {
      newState.sort(
        (a, b) => (a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0)
      );
    }

    this.setState({ pointsData: newState });
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
          <div
            className="btn btn-default"
            onClick={() => {
              this.getTheNewestPoints("newest");
            }}
          >
            Najnowsze
          </div>

          <div
            className="btn btn-default"
            onClick={() => {
              this.getTheNewestPoints("oldest");
            }}
          >
            Najstarsze
          </div>

          <div
            className="btn btn-default"
            onClick={() => {
              this.filterResults("rating", true);
            }}
          >
            Najlepiej oceniane
          </div>
          <div
            className="btn btn-default"
            onClick={() => {
              this.filterResults("rating", false);
            }}
          >
            Najgorzej oceniane
          </div>
          <div
            className="btn btn-default"
            onClick={() => {
              this.filterResults("countVotes", true);
            }}
          >
            Najczęściej oceniane
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

          <div className="btn btn-default" onClick={this.prevPointsPage}>
            Poprzednie
          </div>
          <div className="btn btn-default" onClick={this.nextPointsPage}>
            Nastepne
          </div>
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
