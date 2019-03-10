import React, { Component } from "react";
import Menu from "./Menu.js";
import loader from "./../../images/loader.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
import Joyride from "react-joyride";

const animationSteps = [
  {
    style: {
      opacity: 0
    },
    duration: 100
  },
  {
    style: {
      opacity: 1
    },
    duration: 600
  }
];

const appPath = "http://auto.last-bee.com";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertSuccess: false,
      alertSuccessDescription: "",
      alertWarning: false,
      alertWarningDescription: "",
      loader: false,
      guestUser: false,
      userIsLoggedIn: false,
      searchInLocation: "",
      showGuideBtn: true,
      run: false
    };
    this.changeStateOfSearchInLocation = this.changeStateOfSearchInLocation.bind(
      this
    );
    /*this.cleanStateOfSearchInLocation = this.cleanStateOfSearchInLocation.bind(
      this
    );*/
    this.handleClickStart = this.handleClickStart.bind(this);
    this.showAlertSuccess = this.showAlertSuccess.bind(this);
    this.showAlertWarning = this.showAlertWarning.bind(this);
    this.hideAlertSuccess = this.hideAlertSuccess.bind(this);
    this.hideAlertWarning = this.hideAlertWarning.bind(this);
    this.switchLoader = this.switchLoader.bind(this);
    this.setGuestUser = this.setGuestUser.bind(this);
    this.hideGuestUser = this.hideGuestUser.bind(this);
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

  /*cleanStateOfSearchInLocation() {
    this.setState({
      searchInLocation: ""
    });
  }*/

  callback = data => {
    const { action, index, type } = data;
  };

  componentDidMount() {
    store.subscribe(() => {
      //console.log(store.getState());

      let storeData = store.getState();

      if (storeData.user.user && storeData.user.user.userId) {
        this.setState({ userIsLoggedIn: true });
      } else if (storeData.user.user && storeData.user.user == "") {
        this.setState({ userIsLoggedIn: false });
      }
    });

    let storeData = store.getState();

    console.log(storeData.user);

    if (storeData.user.user && storeData.user.user.userId) {
      this.setState({ userIsLoggedIn: true });
    } else if (storeData.user.user && storeData.user.user == "") {
      this.setState({ userIsLoggedIn: false });
    }
  }

  setGuestUser() {
    //console.log("setGuestUser");
    this.setState({ guestUser: true });
  }

  hideGuestUser() {
    //console.log("hideGuestUser");
    this.setState({ guestUser: false });
  }

  showAlertSuccess(info) {
    this.setState({
      alertSuccess: true,
      alertSuccessDescription: info
    });

    setTimeout(
      function() {
        this.setState({ alertSuccess: false });
      }.bind(this),
      4000
    );
  }

  showAlertWarning(info) {
    this.setState({
      alertWarning: true,
      alertWarningDescription: info
    });

    setTimeout(
      function() {
        this.setState({ alertWarning: false });
      }.bind(this),
      4000
    );
  }

  switchLoader(state) {
    return this.setState({
      loader: state
    });
  }

  hideAlertSuccess() {
    this.setState({
      alertSuccess: false
    });
  }

  hideAlertWarning() {
    this.setState({
      alertWarning: false
    });
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.showGuideBtn && this.state.userIsLoggedIn && (
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
          <div>
            {this.state.alertSuccess && (
              <div
                className="alert alert-success alert-dismissible"
                role="alert"
              >
                <a href="#" className="close" onClick={this.hideAlertSuccess}>
                  ×
                </a>
                <strong>{this.state.alertSuccessDescription}</strong>
              </div>
            )}

            {this.state.alertWarning && (
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <a href="#" className="close" onClick={this.hideAlertWarning}>
                  ×
                </a>
                <strong>{this.state.alertWarningDescription}</strong>
              </div>
            )}

            {this.state.loader && (
              <div className="loaderContainer">
                <div className="loader">
                  <img src={loader} />
                </div>
              </div>
            )}

            <div>
              <Menu
                switchLoader={this.switchLoader}
                showAlertSuccess={this.showAlertSuccess}
                showAlertWarning={this.showAlertWarning}
                store={this.props.store}
                animationSteps={animationSteps}
                appPath={appPath}
                setGuestUser={this.setGuestUser}
                guestUser={this.state.guestUser}
                //cleanStateOfSearchInLocation={this.cleanStateOfSearchInLocation}
                userIsLoggedIn={this.state.userIsLoggedIn}
              />
            </div>
          </div>

          <Route
            exact
            path="/"
            render={() => {
              return (
                <LandingPage
                  searchInLocation={this.state.searchInLocation}
                  changeStateOfSearchInLocation={
                    this.props.changeStateOfSearchInLocation
                  }
                  setGuestUser={this.setGuestUser}
                  guestUser={this.state.guestUser}
                  hideGuestUser={this.hideGuestUser}
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
                  appPath={appPath}
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
                  appPath={appPath}
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
                  switchLoader={this.switchLoader}
                  animationSteps={this.props.animationSteps}
                  appPath={appPath}
                  guestUser={this.state.guestUser}
                  userIsLoggedIn={this.state.userIsLoggedIn}
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
                  switchLoader={this.switchLoader}
                  animationSteps={this.props.animationSteps}
                  appPath={appPath}
                  guestUser={this.state.guestUser}
                  userIsLoggedIn={this.state.userIsLoggedIn}
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
                  switchLoader={this.switchLoader}
                  animationSteps={this.props.animationSteps}
                  appPath={appPath}
                  guestUser={this.state.guestUser}
                  userIsLoggedIn={this.state.userIsLoggedIn}
                />
              );
            }}
          />
          <Route
            exact
            path="/profile"
            render={() => {
              return (
                <MainProfile
                  animationSteps={this.props.animationSteps}
                  appPath={appPath}
                  userIsLoggedIn={this.state.userIsLoggedIn}
                />
              );
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
                  appPath={appPath}
                  guestUser={this.state.guestUser}
                  userIsLoggedIn={this.state.userIsLoggedIn}
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
                  appPath={appPath}
                  guestUser={this.state.guestUser}
                  userIsLoggedIn={this.state.userIsLoggedIn}
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default Main;
