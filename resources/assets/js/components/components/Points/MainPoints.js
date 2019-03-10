import React, { Component } from "react";
import axios from "axios";
import MapComponent from "./../Map/MapComponent.js";
import SinglePointOnList from "./PointsListComponent/SinglePointOnList";
import { store } from "./../../store";
import Animate from "react-smooth";

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
    this.centerMapLocation = this.centerMapLocation.bind(this);
    this.filterResults = this.filterResults.bind(this);
  }

  async filterResults(filterName) {
    await this.setState({
      filter: filterName,
      currentPageResult: 1,
      pointsData: [],
      markersData: []
    });

    await this.loadAllSpots(1, this.state.filter);
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

  centerMapLocation(lat, lng) {
    this.setState({
      centerCoord: [lat, lng]
    });
  }

  async loadAllSpots(pageNumber, filter) {
    this.props.switchLoader(true);
    try {
      let allPoints;

      switch (filter) {
        case "theOldest":
          allPoints = await axios.get(
            `${this.props.appPath}/api/getTheOldestPoints/${
              this.state.centerCoord[0]
            }/${this.state.centerCoord[1]}?page=${pageNumber}`
          );
          break;

        case "theLatest":
          allPoints = await axios.get(
            `${this.props.appPath}/api/getTheNewestPoints/${
              this.state.centerCoord[0]
            }/${this.state.centerCoord[1]}?page=${pageNumber}`
          );
          break;

        case "worstVoted":
          allPoints = await axios.get(
            `${this.props.appPath}/api/getTheWorstVoted/${
              this.state.centerCoord[0]
            }/${this.state.centerCoord[1]}?page=${pageNumber}`
          );
          break;

        case "bestVoted":
          allPoints = await axios.get(
            `${this.props.appPath}/api/getTheBestVoted/${
              this.state.centerCoord[0]
            }/${this.state.centerCoord[1]}?page=${pageNumber}`
          );
          break;

        case "mostTimeVoted":
          allPoints = await axios.get(
            `${this.props.appPath}/api/getTheMostTimeVoted/${
              this.state.centerCoord[0]
            }/${this.state.centerCoord[1]}?page=${pageNumber}`
          );
          break;

        default:
          allPoints = await axios.get(
            `${this.props.appPath}/api/getPointsNearCoords/${
              this.state.centerCoord[0]
            }/${this.state.centerCoord[1]}?page=${pageNumber}`
          );
      }

      await this.setState({
        pointsData: [],
        markersData: []
      });

      await allPoints.data.data.map(async (item, i) => {
        let singleMarkerData = {
          key: item.name,
          position: [item.lattitude, item.longitude],
          text: item.name,
          desc: item.description,
          sumOfVotes: item.sum_of_votes,
          votesCount: item.votes_count
        };

        await this.setState(prevState => ({
          paginationPageLimit: allPoints.data.last_page,
          pointsData: [...prevState.pointsData, item],
          markersData: [...prevState.markersData, singleMarkerData]
        }));
      });
      this.props.switchLoader(false);
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

    if (storeData.user.user.userId && !this.props.guestUser) {
      await this.setState({ currentUserId: storeData.user.user.userId });
    }

    await this.loadAllSpots(this.state.currentPageResult);
  }

  render() {
    if (this.props.userIsLoggedIn || this.props.guestUser) {
      return (
        <div className="row listOfPointsRow">
          <div className="col-sm-6 listOfPointsCol">
            <Animate steps={this.props.animationSteps}>
              <div className="mainPointsButtonPanel">
                <div
                  className={
                    this.state.filter == "theLatest"
                      ? "btn btn-default btnCircled btnDarkGray"
                      : "btn btn-default btnCircled btnGray"
                  }
                  onClick={() => this.filterResults("theLatest")}
                >
                  Najnowsze
                </div>

                <div
                  className={
                    this.state.filter == "theOldest"
                      ? "btn btn-default btnCircled btnDarkGray"
                      : "btn btn-default btnCircled btnGray"
                  }
                  onClick={() => this.filterResults("theOldest")}
                >
                  Najstarsze
                </div>

                <div
                  className={
                    this.state.filter == "bestVoted"
                      ? "btn btn-default btnCircled btnDarkGray"
                      : "btn btn-default btnCircled btnGray"
                  }
                  onClick={() => this.filterResults("bestVoted")}
                >
                  Najlepiej oceniane
                </div>

                <div
                  className={
                    this.state.filter == "worstVoted"
                      ? "btn btn-default btnCircled btnDarkGray"
                      : "btn btn-default btnCircled btnGray"
                  }
                  onClick={() => this.filterResults("worstVoted")}
                >
                  Najgorzej oceniane
                </div>

                <div
                  className={
                    this.state.filter == "mostTimeVoted"
                      ? "btn btn-default btnCircled btnDarkGray"
                      : "btn btn-default btnCircled btnGray"
                  }
                  onClick={() => this.filterResults("mostTimeVoted")}
                >
                  Najczęściej oceniane
                </div>
              </div>
            </Animate>
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
                  centerMapLocation={this.centerMapLocation}
                  animationSteps={this.props.animationSteps}
                  guestUser={this.props.guestUser}
                />
              );
            })}

            {this.state.paginationPageLimit > 1 && (
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
            )}
          </div>

          <div className="col-sm-6 order-first order-sm-last pointMapContainer">
            <MapComponent
              latCenter={this.state.lat}
              lngCenter={this.state.lng}
              markersData={this.state.markersData}
              displayFirstMarker={false}
              centerCoord={this.state.centerCoord}
              setNewCenterCoords={this.setNewCenterCoords}
              showSearchBox={true}
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

export default MainPoints;
