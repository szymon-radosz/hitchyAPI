import React, { Component } from "react";
import SpotVotes from "./SpotVotes";
import axios from "axios";
import Animate from "react-smooth";
import { BrowserRouter as Router, Link } from "react-router-dom";

class SinglePointOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: "",
      currentUserId: 0,
      currentVote: 1,
      userCanVote: true,
      pointVote: 0,
      voteAmount: 0
    };

    this.changeCurrentVote = this.changeCurrentVote.bind(this);
    this.saveNewSpotVote = this.saveNewSpotVote.bind(this);
  }

  changeCurrentVote(event) {
    this.setState({ currentVote: event.target.value });
  }

  async saveNewSpotVote(event) {
    event.preventDefault();

    let savedNewSpotVote;

    try {
      savedNewSpotVote = await axios.post(
        `${this.props.appPath}/api/addPointVote`,
        {
          pointId: this.props.item.id,
          userId: this.props.userId,
          vote: this.state.currentVote
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

    if (savedNewSpotVote.status == 200) {
      let sumOfVotes =
        Number(this.state.pointVote) + Number(this.state.currentVote);
      let voteAmount = Number(this.state.voteAmount) + 1;
      let calculatedPointVote = sumOfVotes / voteAmount;

      await this.setState({
        pointVote: calculatedPointVote,
        voteAmount: voteAmount,
        userCanVote: false
      });

      this.props.showAlertSuccess("zapisano glos.");
    } else {
      this.props.showAlertWarning("Nie udało się zapisać glosu.");
    }
  }

  async componentDidMount() {
    let sumOfVotes = 0;

    this.props.item.users.map((user, i) => {
      if (user.pivot.user_id == this.props.userId) {
        this.setState({ userCanVote: false });
      }
      sumOfVotes += user.pivot.vote;
    });

    let calculatedPointVote = sumOfVotes / this.props.item.users.length;

    await this.setState({
      pointVote: calculatedPointVote,
      voteAmount: this.props.item.users.length
    });
  }

  render() {
    return (
      <div className="panel-group">
        <Animate steps={this.props.animationSteps}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title bold">{this.props.item.name}</h4>
            </div>
            <div className="panel-body">
              <p>
                <span className="bold">Data: </span>
                {this.props.item.created_at}
              </p>
              <p>
                <span className="bold">Opis: </span>
                {this.props.item.description}
              </p>
              <p>
                <span className="bold">Autor: </span>
                {this.props.item.users[0].nickName}
              </p>
              <p>
                <span className="bold">Ocena:</span>{" "}
                {this.state.pointVote ? this.state.pointVote.toFixed(2) : "---"}
              </p>
              <p>
                <span className="bold">Ilosc glosow:</span>{" "}
                {this.state.voteAmount ? this.state.voteAmount : "---"}
              </p>

              {this.state.userCanVote && !this.props.guestUser && (
                <p>
                  <span className="bold">Dodaj ocenę:</span>
                </p>
              )}
              {this.state.userCanVote && !this.props.guestUser && (
                <SpotVotes
                  changeCurrentVote={this.changeCurrentVote}
                  saveNewSpotVote={this.saveNewSpotVote}
                />
              )}

              {this.props.guestUser && (
                <Link
                  to="/login"
                  className="btn btn-default btnBlue btnCircled guestBtnCircled"
                >
                  Zaloguj się, aby wziąć dodawać głosy
                </Link>
              )}

              <div
                className="btn btn-default btnBlue btnCircled locatePointBtn"
                onClick={() => {
                  this.props.centerMapLocation(
                    this.props.item.lattitude,
                    this.props.item.longitude
                  );
                }}
              >
                Lokalizuj
              </div>
            </div>
          </div>
        </Animate>
      </div>
    );
  }
}
export default SinglePointOnList;
