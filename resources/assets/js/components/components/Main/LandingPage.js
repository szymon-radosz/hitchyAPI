import React, { Component } from "react";
import MainMeetings from "./../Meetings/MainMeetings";
import Main from "./Main";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocationPrompt: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state.userLocationPrompt);

    if (this.state.userLocationPrompt) {
      this.props.changeStateOfSearchInLocation(this.state.userLocationPrompt);
    }
  }

  render() {
    return (
      <div>
        {this.props.searchInLocation ? (
          <MainMeetings searchInLocation={this.props.searchInLocation} />
        ) : (
          <div className="row landing">
            <div className="col-sm-6 col-sm-offset-3 landingForm">
              <h1>AutoStop app</h1>

              <h4>Dołącz do społeczności autostopowiczów.</h4>

              <div className="landingButtons">
                <Link to="/login" onClick={this.cleanStateOfSearchInLocation}>
                  <div className="btn btn-default">Login</div>
                </Link>

                <Link
                  to="/register"
                  onClick={this.cleanStateOfSearchInLocation}
                >
                  <div className="btn btn-default">Register</div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LandingPage;
