import React, { Component } from "react";
import MainMeetings from "./../Meetings/MainMeetings";
import { BrowserRouter as Router, Link } from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocationPrompt: ""
    };
  }

  componentDidMount() {
    this.props.hideGuestUser();
  }

  render() {
    return (
      <div>
        <div className="row landing">
          <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1 landingForm">
            <h1>Autostart</h1>

            <h4>Dołącz do społeczności autostopowiczów.</h4>

            <div className="landingButtons">
              <Link to="/login">
                <div className="btn btn-default defaultBtn btnBlue btnCircled loginBtn">
                  Logowanie
                </div>
              </Link>

              <Link to="/register">
                <div className="btn btn-default defaultBtn btnBlue btnCircled">
                  Rejestracja
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Link to="/meetings" onClick={this.props.setGuestUser}>
          <div className="btn btn-default defaultBtn btnBlue btnCircled loginBtn testBtn">
            Przetestuj
          </div>
        </Link>
      </div>
    );
  }
}

export default LandingPage;
