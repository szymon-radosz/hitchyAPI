import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SpotVotes from "./SpotVotes";
import axios from "axios";

class SinglePointOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: "",
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
          `http://127.0.0.1:8000/api/saveVote`,
          {
            spot_id: this.props.item.id,
            user_id: sessionStorage.getItem("userId"),
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

  render() {
    return (
      <div className="panel-group">
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
              Ocena:{" "}
              {this.props.item.sumOfVotes
                ? (
                    this.props.item.sumOfVotes / this.props.item.countVotes
                  ).toFixed(2)
                : "---"}
            </p>
            <p>
              Ilosc glosow:{" "}
              {this.props.item.countVotes ? this.props.item.countVotes : "0"}
            </p>
            <div
              className="btn locateBtn"
              onClick={() => {
                this.props.setNewCenterCoords(
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
      </div>
    );
  }
}
export default SinglePointOnList;
