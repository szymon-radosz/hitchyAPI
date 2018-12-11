import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/userActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailOrNickname: "",
      userId: 0,
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const userCredentials = {
      emailOrNickname: this.state.emailOrNickname,
      password: this.state.password
    };

    this.props.loginUser(userCredentials);
  }

  render() {
    return (
      <div className="login row loginRow">
        <div className="col-sm-6 col-sm-offset-3 loginCol">
          <h2>Logowanie</h2>

          <form>
            <div className="form-group">
              <label htmlFor="emailOrNickname">Email lub nick:</label>
              <input
                type="text"
                className="form-control"
                id="emailOrNickname"
                name="emailOrNickname"
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Hasło:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                required
              />
            </div>

            <div
              onClick={this.handleSubmit}
              className="btn btn-default defaultBtn"
              id="loginBtn"
            >
              Login
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.result
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
