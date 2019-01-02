import React, { Component } from "react";
import axios from "axios";
import UserInfo from "./UserInfo";
import { store } from "./../../store";

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
        `http://phplaravel-226937-693336.cloudwaysapps.com/api/findUserEventsHistory`,
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
    let nickname;
    let userId;

    let storeData = store.getState();

    if (storeData.user.user.userNickName) {
      nickname = storeData.user.user.userNickName;
      userId = storeData.user.user.userId;
    } else if (storeData.user.user == "") {
      nickname = "";
      userId = "";
    }

    const allUsers = await axios.get(
      `http://phplaravel-226937-693336.cloudwaysapps.com/api/users`
    );

    for (var i = 0; i < allUsers.data.length; i++) {
      if (allUsers.data[i].nickName == nickname) {
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

    await this.getUserEventsHistory(userId);
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
