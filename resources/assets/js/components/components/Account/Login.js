import React, { Component } from "react";
import { connect } from "react-redux";
import Animate from "react-smooth";
import axios from "axios";

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

    if (!this.state.emailOrNickname || !this.state.password) {
      this.props.showAlertWarning("Proszę wypełnić wszystkie pola");
    } else {
      //this.props.loginUser(userCredentials);

      axios
        .post(
          `${this.props.appPath}/api/login`,
          {
            emailOrNickname: this.state.emailOrNickname,
            password: this.state.password
          },
          {
            headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
          }
        )
        .then(response => {
          console.log(response.data);

          if (!response.data.error) {
            this.props.setLoginUserInfo(
              response.data.userId,
              response.data.userEmail,
              response.data.userNickName
            );

            this.props.showAlertSuccess("Poprawnie zalogowano użytkownika.");
          } else {
            this.props.showAlertWarning("Sprawdź swoje dane");
          }
        });
    }
  }

  render() {
    return (
      <div className="login row loginRow">
        <div className="col-sm-6 col-sm-offset-3 loginCol">
          <Animate steps={this.props.animationSteps}>
            <div>
              <h2>Logowanie</h2>

              <form>
                <div className="form-group">
                  <label htmlFor="emailOrNickname">Email lub Nick:</label>
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
                  className="btn btn-default btnBlue btnCircled"
                  id="loginBtn"
                >
                  Zatwierdź
                </div>
              </form>
            </div>
          </Animate>
        </div>
      </div>
    );
  }
}
export default Login;
