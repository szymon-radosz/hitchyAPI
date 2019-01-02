import React, { Component } from "react";
import SpotVotes from "./SpotVotes";
import axios from "axios";
import { store } from "./../../../store";
import Animate from "react-smooth";

class SinglePointOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: "",
      currentUserId: 0,
      currentVote: "Wybierz"
    };

    this.changeCurrentVote = this.changeCurrentVote.bind(this);
    this.saveNewSpotVote = this.saveNewSpotVote.bind(this);
  }

  changeCurrentVote(event) {
    this.setState({ currentVote: event.target.value });
  }

  async saveNewSpotVote(event) {
    event.preventDefault();

    if (this.state.currentVote != "Wybierz") {
      let savedNewSpotVote;

      try {
        savedNewSpotVote = await axios.post(
          `http://phplaravel-226937-693336.cloudwaysapps.com/api/saveVote`,
          {
            spot_id: this.props.item.id,
            user_id: this.state.currentUserId,
            vote_value: this.state.currentVote
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

      console.log(savedNewSpotVote);

      if (savedNewSpotVote.status == "201") {
        console.log("zapisano glos");
        this.props.disableVoteSelect(
          this.props.item.id,
          this.state.currentVote
        );
        this.props.showAlertSuccess("zapisano glos.");
      } else {
        this.props.showAlertWarning("Nie udało się zapisać glosu.");
      }
    } else {
      this.props.showAlertWarning("Wybierz wartosc liczbowa.");
    }
  }

  componentDidMount() {
    let storeData = store.getState();

    if (storeData.user.user.userId) {
      this.setState({ currentUserId: storeData.user.user.userId });
    }
  }

  render() {
    return (
      <div className="panel-group">
        <Animate steps={this.props.animationSteps}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title bold">{this.props.item.title}</h4>
            </div>
            <div className="panel-body">
              <p>
                <span className="bold">Data: </span>
                {this.props.item.date}
              </p>
              <p>
                <span className="bold">Opis: </span>
                {this.props.item.description}
              </p>
              <p>
                <span className="bold">Autor: </span>
                {this.props.item.author}
              </p>
              <p>
                <span className="bold">Ocena:</span>{" "}
                {this.props.item.sumOfVotes
                  ? (
                      this.props.item.sumOfVotes / this.props.item.countVotes
                    ).toFixed(2)
                  : "---"}
              </p>
              <p>
                <span className="bold">Ilosc glosow:</span>{" "}
                {this.props.item.countVotes ? this.props.item.countVotes : "0"}
              </p>
              <div
                className="btn btn-default btnBlue btnCircled"
                onClick={() => {
                  this.props.centerMapLocation(
                    this.props.item.lattitude,
                    this.props.item.longitude
                  );
                }}
              >
                Lokalizuj
              </div>
              {!this.props.item.checkIfUserVote ? (
                <SpotVotes
                  changeCurrentVote={this.changeCurrentVote}
                  saveNewSpotVote={this.saveNewSpotVote}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </Animate>
      </div>
    );
  }
}
export default SinglePointOnList;
