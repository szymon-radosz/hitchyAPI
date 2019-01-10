import React, { Component } from "react";
import axios from "axios";
import SingleMeetingDetails from "./SingleMeetingDetails.js";

class MeetingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingData: [],
      meetingID: ""
    };
  }

  async componentDidMount() {
    var meetingId = this.props.match.params.id;

    this.setState({ meetingID: meetingId });

    const getMeeting = await axios.get(
      `${this.props.appPath}/api/events/${meetingId}`
    );

    const meeting = getMeeting.data[0];

    console.log(meeting);

    this.setState(prevState => ({
      meetingData: [...prevState.meetingData, meeting]
    }));
  }

  render() {
    return (
      <div>
        {this.state.meetingData.map((item, i) => {
          return (
            <SingleMeetingDetails
              key={i}
              item={item}
              showAlertSuccess={this.props.showAlertSuccess}
              showAlertWarning={this.props.showAlertWarning}
              switchLoader={this.props.switchLoader}
              animationSteps={this.props.animationSteps}
              appPath={this.props.appPath}
            />
          );
        })}
      </div>
    );
  }
}
export default MeetingDetails;
