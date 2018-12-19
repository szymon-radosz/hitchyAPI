import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import LandingPage from "./LandingPage.js";
import Login from "./../Account/Login.js";
import Register from "./../Account/Register.js";
import MainMeetings from "./../Meetings/MainMeetings.js";
import AddNewMeeting from "./../Meetings/AddNewMeeting.js";
import MeetingDetails from "./../Meetings/MeetingDetails.js";
import MainProfile from "./../Profile/MainProfile.js";
import MainPoints from "./../Points/MainPoints.js";
import AddNewPoint from "./../Points/AddNewPoint";
import { store } from "./../../store";
import LogoutBtn from "./LogoutBtn";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userIsLoggedIn: false,
      searchInLocation: ""
    };
    this.changeStateOfSearchInLocation = this.changeStateOfSearchInLocation.bind(
      this
    );
    this.cleanStateOfSearchInLocation = this.cleanStateOfSearchInLocation.bind(
      this
    );
  }

  changeStateOfSearchInLocation(value) {
    this.setState({
      searchInLocation: value
    });
  }

  cleanStateOfSearchInLocation() {
    this.setState({
      searchInLocation: ""
    });
  }

  async componentDidMount() {
    store.subscribe(() => {
      console.log(store.getState());

      let storeData = store.getState();

      if (storeData.user.user.userId) {
        this.setState({ userIsLoggedIn: true });
      } else if (storeData.user.user == "") {
        this.setState({ userIsLoggedIn: false });
      }
    });

    let storeData = store.getState();

    if (storeData.user.user.userId) {
      this.setState({ userIsLoggedIn: true });
    } else if (storeData.user.user == "") {
      this.setState({ userIsLoggedIn: false });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar"
                  aria-expanded="false"
                  aria-controls="navbar"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <Link
                  to="/"
                  className="navbar-brand"
                  onClick={this.cleanStateOfSearchInLocation}
                >
                  Autostart
                </Link>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                  {this.state.userIsLoggedIn ? (
                    <li>
                      <Link
                        to="/meetings"
                        onClick={this.cleanStateOfSearchInLocation}
                      >
                        Wydarzenia
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {this.state.userIsLoggedIn ? (
                    <li>
                      <Link
                        to="/points"
                        onClick={this.cleanStateOfSearchInLocation}
                      >
                        Punkty
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {this.state.userIsLoggedIn ? (
                    <li>
                      <Link
                        to="/add-point"
                        onClick={this.cleanStateOfSearchInLocation}
                      >
                        Dodaj punkt
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {this.state.userIsLoggedIn ? (
                    <li>
                      <Link
                        to="/add-meeting"
                        onClick={this.cleanStateOfSearchInLocation}
                      >
                        Dodaj wydarzenie
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {!this.state.userIsLoggedIn ? (
                    <li>
                      <Link
                        to="/login"
                        onClick={this.cleanStateOfSearchInLocation}
                      >
                        Logowanie
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {!this.state.userIsLoggedIn ? (
                    <li>
                      <Link
                        to="/register"
                        onClick={this.cleanStateOfSearchInLocation}
                      >
                        Rejestracja
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {this.state.userIsLoggedIn ? (
                    <li>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Konto
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <LogoutBtn />
                          <Link
                            to={`/profile`}
                            onClick={this.cleanStateOfSearchInLocation}
                          >
                            Mój profil
                          </Link>
                        </div>
                      </div>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <Route
            exact
            path="/"
            render={() => {
              return (
                <LandingPage
                  searchInLocation={this.state.searchInLocation}
                  changeStateOfSearchInLocation={
                    this.changeStateOfSearchInLocation
                  }
                />
              );
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              return (
                <Login
                  loginUser={this.loginUser}
                  showAlertSuccess={this.props.showAlertSuccess}
                  showAlertWarning={this.props.showAlertWarning}
                />
              );
            }}
          />
          <Route
            exact
            path="/register"
            render={() => {
              return (
                <Register
                  showAlertSuccess={this.props.showAlertSuccess}
                  showAlertWarning={this.props.showAlertWarning}
                />
              );
            }}
          />

          <Route
            exact
            path="/meetings"
            render={() => {
              return (
                <MainMeetings
                  searchInLocation={this.state.searchInLocation}
                  switchLoader={this.props.switchLoader}
                />
              );
            }}
          />

          <Route
            exact
            path="/points"
            render={() => {
              return (
                <MainPoints
                  searchInLocation={this.state.searchInLocation}
                  showAlertSuccess={this.props.showAlertSuccess}
                  showAlertWarning={this.props.showAlertWarning}
                  switchLoader={this.props.switchLoader}
                />
              );
            }}
          />

          <Route
            exact
            path="/events/:id"
            render={props => {
              return (
                <MeetingDetails
                  {...props}
                  showAlertSuccess={this.props.showAlertSuccess}
                  showAlertWarning={this.props.showAlertWarning}
                  switchLoader={this.props.switchLoader}
                />
              );
            }}
          />
          <Route path="/profile" component={MainProfile} />

          <Route
            exact
            path="/add-meeting"
            render={() => {
              return (
                <AddNewMeeting
                  showAlertSuccess={this.props.showAlertSuccess}
                  showAlertWarning={this.props.showAlertWarning}
                />
              );
            }}
          />

          <Route
            exact
            path="/add-point"
            render={() => {
              return (
                <AddNewPoint
                  showAlertSuccess={this.props.showAlertSuccess}
                  showAlertWarning={this.props.showAlertWarning}
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default Menu;
