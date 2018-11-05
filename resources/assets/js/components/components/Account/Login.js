import React, { Component } from "react";
import axios from "axios";
import _ from "underscore";

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

  async handleSubmit(event) {
    event.preventDefault();

    const loginUser = await axios.post(`http://127.0.0.1:8000/api/login`, {
      emailOrNickname: this.state.emailOrNickname,
      password: this.state.password
    });

    console.log(loginUser);

    if (loginUser.status == 200 && loginUser.data.userId != null) {
      sessionStorage.setItem("userId", "");
      sessionStorage.setItem("userNickName", "");
      sessionStorage.setItem("userId", loginUser.data.userId);
      sessionStorage.setItem("userNickName", loginUser.data.userNickName);
      this.props.loginUser(loginUser.data.userNickName);
      this.props.showAlertSuccess("Poprawnie zalogowano.");
    } else {
      this.props.showAlertWarning("Złe hasło.");
    }
  }

  render() {
    return (
      <div className="login row loginRow">
        <div className="col-sm-6 col-sm-offset-3 loginCol">
          <h2>Logowanie</h2>

          <form onSubmit={this.handleSubmit}>
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

            <input
              type="submit"
              className="btn btn-default defaultBtn"
              id="loginBtn"
              value="Login"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
