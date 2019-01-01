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
import Joyride from "react-joyride";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userIsLoggedIn: false,
      searchInLocation: "",
      showGuideBtn: true,
      run: false
    };
    this.changeStateOfSearchInLocation = this.changeStateOfSearchInLocation.bind(
      this
    );
    this.cleanStateOfSearchInLocation = this.cleanStateOfSearchInLocation.bind(
      this
    );
    this.handleClickStart = this.handleClickStart.bind(this);
  }

  handleClickStart = e => {
    e.preventDefault();

    this.setState({
      run: true,
      showGuideBtn: false
    });
  };

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

  callback = data => {
    const { action, index, type } = data;
  };

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
          {this.state.showGuideBtn && (
            <button className="guideBtn" onClick={this.handleClickStart}>
              Jak to działa?
            </button>
          )}
          <div className="userGuide">
            <Joyride
              continuous
              scrollToFirstStep
              showProgress
              showSkipButton
              run={this.state.run}
              styles={{
                options: {
                  primaryColor: "#6a8ad4"
                }
              }}
              steps={[
                {
                  content:
                    "Autostart to aplikacja dla autostopowiczów ułatwiająca im podrózowanie.",
                  placement: "center",
                  disableBeacon: true,
                  styles: {
                    options: {
                      zIndex: 10000
                    }
                  },
                  locale: {
                    skip: "Pomiń",
                    back: "Wróć",
                    close: "Zamknij",
                    last: "Ostatni",
                    next: "Następny"
                  },
                  target: "body"
                },
                {
                  content:
                    "W zakładce Wydarzenia mozesz oglądać zaplanowane wyjazdy. Jeśli znajdziesz interesujące Cię wydarzenie, mozesz wziąć w nim udział, jeśli są jeszcze wolne miejsca.",
                  placement: "bottom",
                  styles: {
                    options: {
                      width: 400,
                      height: 70
                    }
                  },
                  target: ".eventsMenuLink",
                  locale: {
                    skip: "Pomiń",
                    back: "Wróć",
                    close: "Zamknij",
                    last: "Ostatni",
                    next: "Następny"
                  },
                  title: "Wydarzenia"
                },
                {
                  content:
                    "W zakładce Punkty mozesz oglądać dodane spoty przez innych uzytkowników. Jeśli znajdziesz punkty, z których korzystałeś w przeszłości mozesz dodać im ocenę, aby pomóc innym uzytkownikom w wybraniu najlepszego punktu w okolicy w ich przyszłych wyjazdach.",
                  placement: "bottom",
                  styles: {
                    options: {
                      width: 400
                    }
                  },
                  target: ".pointsMenuLink",
                  locale: {
                    skip: "Pomiń",
                    back: "Wróć",
                    close: "Zamknij",
                    last: "Ostatni",
                    next: "Następny"
                  },
                  title: "Punkty"
                },

                {
                  content:
                    "W zakładce Dodaj Wydarzenie mozesz dodać nowy wydarzenie, określając lokalizację miejsca startowego i docelowego, limit uczestników, datę rozpoczęcia etc.",
                  placement: "right",
                  styles: {
                    options: {
                      width: 400
                    }
                  },
                  target: ".addMeetingMenuLink",
                  locale: {
                    skip: "Pomiń",
                    back: "Wróć",
                    close: "Zamknij",
                    last: "Ostatni",
                    next: "Następny"
                  },
                  title: "Dodaj wydarzenie"
                },
                {
                  content:
                    "W zakładce Dodaj Punkt mozesz dodać nowy spot, określając lokalizację miejsca, jego opis etc.",
                  placement: "right",
                  styles: {
                    options: {
                      width: 400
                    }
                  },
                  target: ".addPointMenuLink",
                  locale: {
                    skip: "Pomiń",
                    back: "Wróć",
                    close: "Zamknij",
                    last: "Ostatni",
                    next: "Następny"
                  },
                  title: "Dodaj punkt"
                },
                {
                  content:
                    "W zakładce Konto masz moliwość przejścia do zakładki Mój profil oraz Wylogowania się z aplikacji. W zakładce Mój profil mozesz zobaczyć swoje dane oraz historię swoich wyjazdów.",
                  placement: "right",
                  styles: {
                    options: {
                      width: 400
                    }
                  },
                  target: ".userAccountLink",
                  locale: {
                    skip: "Pomiń",
                    back: "Wróć",
                    close: "Zamknij",
                    last: "Ostatni",
                    next: "Następny"
                  },
                  title: "Konto"
                }
              ]}
              //callback={this.handleJoyrideCallback}
            />
          </div>

          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-headesr">
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
                    <li className="eventsMenuLink">
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
                    <li className="pointsMenuLink">
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
                    <li className="addMeetingMenuLink">
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

                  {this.state.userIsLoggedIn ? (
                    <li className="addPointMenuLink">
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
                          className="btn btnBlue btnCircled userAccountLink"
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
                  animationSteps={this.props.animationSteps}
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
                  animationSteps={this.props.animationSteps}
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
                  animationSteps={this.props.animationSteps}
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
                  animationSteps={this.props.animationSteps}
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
                  animationSteps={this.props.animationSteps}
                />
              );
            }}
          />
          <Route
            exact
            path="/profile"
            render={() => {
              return <MainProfile animationSteps={this.props.animationSteps} />;
            }}
          />
          <Route
            exact
            path="/add-meeting"
            render={() => {
              return (
                <AddNewMeeting
                  showAlertSuccess={this.props.showAlertSuccess}
                  showAlertWarning={this.props.showAlertWarning}
                  animationSteps={this.props.animationSteps}
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
                  animationSteps={this.props.animationSteps}
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
