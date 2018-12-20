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
      `http://127.0.0.1:8000/api/events/${meetingId}`
    );

    //console.log(getMeeting);

    const meeting = getMeeting.data[0];

    let meetingObject = {
      id: meeting.id,
      title: meeting.title,
      description: meeting.description,
      author: meeting.authorNickName,
      startPlaceLattitude: meeting.startPlaceLattitude,
      startPlaceLongitude: meeting.startPlaceLongitude,
      stopPlaceLattitude: meeting.stopPlaceLattitude,
      stopPlaceLongitude: meeting.stopPlaceLongitude,
      limit: meeting.limit,
      date: meeting.startDate
    };

    this.setState(prevState => ({
      meetingData: [...prevState.meetingData, meetingObject]
    }));
  }

  render() {
    return (
      <div>
        {this.state.meetingData.map((item, i) => {
          return (
            <SingleMeetingDetails
              key={i}
              id={item.id}
              title={item.title}
              description={item.description}
              author={item.author}
              startPlaceLattitude={item.startPlaceLattitude}
              startPlaceLongitude={item.startPlaceLongitude}
              stopPlaceLattitude={item.stopPlaceLattitude}
              stopPlaceLongitude={item.stopPlaceLongitude}
              limit={item.limit}
              date={item.date}
              meetingId={this.state.meetingID}
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
