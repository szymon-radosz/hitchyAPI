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

    //console.log(getMeeting);

    const meeting = getMeeting.data[0];

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
            />
          );
        })}
      </div>
    );
  }
}
export default MeetingDetails;
