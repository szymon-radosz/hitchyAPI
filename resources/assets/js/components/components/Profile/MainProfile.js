import React, { Component } from "react";
import axios from "axios";
import UserInfo from "./UserInfo";

class MainProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      description: "",
      nickName: "",
      location: "",
      userExist: false,
      userEventsHistory: []
    };

    this.getUserEventsHistory = this.getUserEventsHistory.bind(this);
  }

  async getUserEventsHistory(userId) {
    let response;

    try {
      response = await axios.post(
        `${this.props.appPath}/api/findUserEventsHistory`,
        {
          id: userId
        },
        {
          headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
        }
      );

      this.setState({ userEventsHistory: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    const allUsers = await axios.get(`${this.props.appPath}/api/users`);

    for (let i = 0; i < allUsers.data.length; i++) {
      //console.log([allUsers.data[i].nickName, nickname]);
      if (
        allUsers.data[i].nickName == this.props.userNick ||
        allUsers.data[i].email == this.props.userEmail
      ) {
        this.setState({
          userExist: true,
          firstName: allUsers.data[i].firstName,
          lastName: allUsers.data[i].lastName,
          nickName: allUsers.data[i].nickName,
          age: allUsers.data[i].age,
          description: allUsers.data[i].about,
          location: allUsers.data[i].city
        });
      }
    }

    this.getUserEventsHistory(this.props.userId);
  }

  render() {
    return (
      <div className="col-sm-8 col-sm-offset-2">
        {this.state.userExist && (
          <UserInfo
            nickName={this.state.nickName}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            age={this.state.age}
            location={this.state.location}
            userEventsHistory={this.state.userEventsHistory}
            animationSteps={this.props.animationSteps}
          />
        )}
      </div>
    );
  }
}

export default MainProfile;
