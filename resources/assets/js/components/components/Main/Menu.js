import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
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
            <Link to="/" className="navbar-brand">
              Autostart
            </Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              {this.props.userIsLoggedIn || this.props.guestUser ? (
                <li className="eventsMenuLink">
                  <Link to="/meetings">Wydarzenia</Link>
                </li>
              ) : null}

              {this.props.userIsLoggedIn || this.props.guestUser ? (
                <li className="pointsMenuLink">
                  <Link to="/points">Punkty</Link>
                </li>
              ) : null}

              {this.props.userIsLoggedIn || this.props.guestUser ? (
                <li className="addMeetingMenuLink">
                  <Link to="/add-meeting">Dodaj wydarzenie</Link>
                </li>
              ) : null}

              {this.props.userIsLoggedIn || this.props.guestUser ? (
                <li className="addPointMenuLink">
                  <Link to="/add-point">Dodaj punkt</Link>
                </li>
              ) : null}

              {!this.props.userIsLoggedIn ? (
                <li>
                  <Link to="/login">Logowanie</Link>
                </li>
              ) : (
                ""
              )}
              {!this.props.userIsLoggedIn && (
                <li>
                  <Link to="/register">Rejestracja</Link>
                </li>
              )}
              {this.props.userIsLoggedIn && (
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
                        onClick={this.props.cleanStateOfSearchInLocation}
                      >
                        Mój profil
                      </Link>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
