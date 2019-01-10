import React, { Component } from "react";
import Menu from "./Menu.js";
import loader from "./../../images/loader.svg";

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

const appPath = "http://127.0.0.1:8000";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertSuccess: false,
      alertSuccessDescription: "",
      alertWarning: false,
      alertWarningDescription: "",
      loader: false
    };

    this.showAlertSuccess = this.showAlertSuccess.bind(this);
    this.showAlertWarning = this.showAlertWarning.bind(this);
    this.hideAlertSuccess = this.hideAlertSuccess.bind(this);
    this.hideAlertWarning = this.hideAlertWarning.bind(this);
    this.switchLoader = this.switchLoader.bind(this);
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
      <div>
        {this.state.alertSuccess && (
          <div className="alert alert-success alert-dismissible" role="alert">
            <a href="#" className="close" onClick={this.hideAlertSuccess}>
              ×
            </a>
            <strong>{this.state.alertSuccessDescription}</strong>
          </div>
        )}

        {this.state.alertWarning && (
          <div className="alert alert-danger alert-dismissible" role="alert">
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

        <Menu
          switchLoader={this.switchLoader}
          showAlertSuccess={this.showAlertSuccess}
          showAlertWarning={this.showAlertWarning}
          store={this.props.store}
          animationSteps={animationSteps}
          appPath={appPath}
        />
      </div>
    );
  }
}

export default Main;
