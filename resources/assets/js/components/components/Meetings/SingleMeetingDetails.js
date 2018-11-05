import React, { Component } from "react";
import axios from "axios";
import _ from "underscore";
import Comment from "./SingleMeetingComponents/Comment";
import CommentForm from "./SingleMeetingComponents/CommentForm";
import MapComponent from "./../Map/MapComponent.js";

class SingleMeetingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersEmails: [],
      resignedUsersEmails: [],
      loggedInUserEmail: "",
      loggedInUserNickname: "",
      displayTakPartBtn: false,
      displayResignBtn: false,
      displayCommentsContainer: false,
      startLat: "",
      startLng: "",
      stopLat: "",
      stopLng: "",
      comments: [],
      commentBody: "",
      centerCoord: []
    };

    this.setNewCenterCoords = this.setNewCenterCoords.bind(this);

    this.takePartClick = this.takePartClick.bind(this);
    this.resignClick = this.resignClick.bind(this);
    this.addCommentToState = this.addCommentToState.bind(this);
  }

  setNewCenterCoords(lat, lng) {
    this.setState({ centerCoord: [lat, lng] });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async componentDidMount() {
    this.props.switchLoader(true);
    this.setState({
      startLat: this.props.startPlaceLattitude,
      startLng: this.props.startPlaceLongitude,
      stopLat: this.props.stopPlaceLattitude,
      stopLng: this.props.stopPlaceLongitude
    });

    console.log(this.props.meetingId);

    const getUser = await axios.get(
      `http://127.0.0.1:8000/api/user/${sessionStorage.getItem("userId")}`
    );

    this.setState({ loggedInUserEmail: getUser.data[0].email });
    this.setState({ loggedInUserNickname: getUser.data[0].nickName });

    const getCurrentMeetingInfo = await axios.get(
      `http://127.0.0.1:8000/api/events/${this.props.meetingId}`
    );

    let meetingLimit = getCurrentMeetingInfo.data[0].limit;

    let usersIDs = [];

    const allMatches = await axios.get(
      `http://127.0.0.1:8000/api/matchUserWithMeetings`
    );

    let meetingMatched = 0;

    allMatches.data.map((singleMatch, i) => {
      if (singleMatch.eventId == this.props.meetingId) {
        console.log(singleMatch);

        usersIDs.push(singleMatch.userId);

        meetingMatched++;

        if (
          singleMatch.userId == sessionStorage.getItem("userId") &&
          this.state.loggedInUserEmail != getCurrentMeetingInfo.author
        ) {
          this.setState({ displayTakPartBtn: false });
          this.setState({ displayCommentsContainer: true });
          this.setState({ displayResignBtn: true });
        }
      }
    });

    if (meetingMatched < meetingLimit) {
      this.setState({ displayTakPartBtn: true });
    }

    usersIDs.map(async (userId, i) => {
      const allUsers = await axios.get(`http://127.0.0.1:8000/api/users`);

      for (var i = 0; i < allUsers.data.length; i++) {
        if (allUsers.data[i].id == parseInt(userId)) {
          let userObject = {
            email: allUsers.data[i].email,
            id: allUsers.data[i].id
          };

          console.log(allUsers.data[i].email);

          this.setState(prevState => ({
            usersEmails: [...prevState.usersEmails, userObject]
          }));
        } else {
          console.log("cant map user id");
        }
      }
    });

    let ResignedUsersIDs = [];

    const allDeleted = await axios.get(
      `http://127.0.0.1:8000/api/deleteUserFromMeeting/${this.props.meetingId}`
    );

    for (var i = 0; i < allDeleted.data.length; i++) {
      ResignedUsersIDs.push(allDeleted.data[i].email);

      console.log(allDeleted.data[i]);

      this.setState(prevState => ({
        resignedUsersEmails: [
          ...prevState.resignedUsersEmails,
          allDeleted.data[i][0].email
        ]
      }));
    }

    const allComments = await axios.get(`http://127.0.0.1:8000/api/comments`);

    for (var i = 0; i < allComments.data.length; i++) {
      if (allComments.data[i].meetingId == this.props.meetingId) {
        let commentObject = {
          userID: allComments.data[i].userId,
          userEmail: allComments.data[i].userEmail,
          date: allComments.data[i].date,
          commentBody: allComments.data[i].commentBody
        };

        this.setState(prevState => ({
          comments: [...prevState.comments, commentObject]
        }));
      }
    }

    this.props.switchLoader(false);
  }

  async takePartClick() {
    let takePart = true;

    const allMatches = await axios.get(
      `http://127.0.0.1:8000/api/matchUserWithMeetings`
    );

    for (var i = 0; i < allMatches.data.length; i++) {
      console.log(allMatches.data[i].userId);
      console.log(this.props.meetingID);
      if (
        allMatches.data[i].userId == sessionStorage.getItem("userId") &&
        allMatches.data[i].eventId == this.props.meetingID
      ) {
        takePart = false;
      }
    }

    if (takePart == false) {
      this.props.showAlertWarning(
        "Użytkownik " + this.state.loggedInUserEmail + " wziął już udział!"
      );
    } else {
      const savedMatchUserWithMeeting = await axios.post(
        `http://127.0.0.1:8000/api/matchUserWithMeeting`,
        {
          userId: sessionStorage.getItem("userId"),
          eventId: this.props.meetingId
        }
      );

      if (savedMatchUserWithMeeting.status == "200") {
        //if successful then find user and add him/her to userId array/ update state
        const user = await axios.get(
          `http://127.0.0.1:8000/api/user/${sessionStorage.getItem("userId")}`
        );

        if (user.status == 200) {
          console.log(user.data[0]);
          let userObject = {
            email: user.data[0].email,
            id: user.data[0].id
          };

          this.setState(prevState => ({
            usersEmails: [...prevState.usersEmails, userObject]
          }));
          this.setState({
            displayTakPartBtn: false,
            displayResignBtn: true,
            displayCommentsContainer: true
          });
          this.props.showAlertSuccess(
            "Wziąłeś udział w wydarzeniu. Możesz dodawać komentarze."
          );
        } else {
          this.props.showAlertWarning(
            "Nie można dodać użytkownika do spotkania."
          );
        }
      } else {
        this.props.showAlertWarning(
          "Błąd. Nie można dodać użytkownika do spotkania."
        );
      }
    }
  }

  async resignClick() {
    const allMatches = await axios.get(
      `http://127.0.0.1:8000/api/matchUserWithMeetings`
    );

    for (var i = 0; i < allMatches.data.length; i++) {
      if (
        allMatches.data[i].userId == sessionStorage.getItem("userId") &&
        allMatches.data[i].eventId == this.props.meetingId
      ) {
        console.log("id: " + allMatches.data[i].id);
        const deleteUser = await axios.delete(
          `http://127.0.0.1:8000/api/deleteMatchUserWithMeeting/${
            allMatches.data[i].id
          }`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        if (deleteUser.status == "200") {
          const savedDeleteUserFromMeeting = await axios.post(
            `http://127.0.0.1:8000/api/deleteUserFromMeeting`,
            {
              userId: sessionStorage.getItem("userId"),
              meetingId: this.props.meetingId
            }
          );

          if (savedDeleteUserFromMeeting.status == "200") {
            this.props.showAlertSuccess("Szkoda, że rezygnujesz.");

            this.setState({
              displayTakPartBtn: true,
              displayResignBtn: false,
              displayCommentsContainer: false
            });
          } else {
            this.props.showAlertWarning(
              "Problem z usunięciem użytkownika ze spotkania."
            );
          }
        } else {
          this.props.showAlertWarning(
            "Problem z usunięciem użytkownika z tabeli match_user_with_meeting."
          );
        }
      }
    }
  }

  addCommentToState(userNickname, commentDate, commentBody) {
    let commentObject = {
      userNickname: userNickname,
      date: commentDate,
      commentBody: commentBody
    };

    this.setState(prevState => ({
      comments: [...prevState.comments, commentObject]
    }));
  }

  render() {
    return (
      <div className="register row singleMeetingDetailsDataRow">
        <div className="col-sm-6 singleMeetingDetailsDataCol">
          <h2>
            {this.props.title} - {this.props.date}{" "}
          </h2>
          <div
            className="btn locateBtn"
            onClick={() => {
              this.setNewCenterCoords(this.state.startLat, this.state.startLng);
            }}
          >
            Punkt Startowy
          </div>
          <div
            className="btn locateBtn"
            onClick={() => {
              this.setNewCenterCoords(this.state.stopLat, this.state.stopLng);
            }}
          >
            Punkt Końcowy
          </div>
          <p>Opis: {this.props.description}</p>
          <p>Stworzone przez: {this.props.author}</p>
          <p>
            Limit uczestników: {this.props.limit}{" "}
            {this.state.usersEmails.length == this.props.limit
              ? " (osiągnięto limit)"
              : ""}
            {/*{this.state.usersEmails.length}/{this.props.limit})*/}
          </p>
          <p>
            <strong>Wezmą udział:</strong>
          </p>
          {this.state.usersEmails.map((user, i) => {
            return <p key={i}>{user.email}</p>;
          })}
          <p>
            <strong>Users which resigned in the past:</strong>
          </p>
          {this.state.resignedUsersEmails.map((userEmail, i) => {
            return <p key={i}>{userEmail}</p>;
          })}
          {this.state.displayTakPartBtn ? (
            <div className="btn btn-default" onClick={this.takePartClick}>
              Weź udział
            </div>
          ) : (
            ""
          )}

          {this.state.displayResignBtn ? (
            <div className="btn btn-default" onClick={this.resignClick}>
              Zrezygnuj
            </div>
          ) : (
            ""
          )}
          <p>
            <strong>Komentarze</strong>
          </p>

          {/* in db comments are stored from the oldest to the newest, render reverse*/}
          {this.state.displayCommentsContainer
            ? this.state.comments
                .slice(0)
                .reverse()
                .map((comment, i) => {
                  return (
                    <Comment
                      key={i}
                      userNickname={this.state.loggedInUserNickname}
                      date={comment.date}
                      commentBody={comment.commentBody}
                    />
                  );
                })
            : ""}

          {this.state.displayCommentsContainer ? (
            <CommentForm
              loggedInUserEmail={this.state.loggedInUserEmail}
              loggedInUserNickname={this.state.loggedInUserNickname}
              meetingId={this.props.meetingId}
              addCommentToState={this.addCommentToState}
              showAlertSuccess={this.props.showAlertSuccess}
              showAlertWarning={this.props.showAlertWarning}
            />
          ) : (
            ""
          )}
        </div>

        <div className="col-sm-6 mainMeetingsMap">
          <MapComponent
            latCenter={this.props.startPlaceLattitude}
            lngCenter={this.props.startPlaceLongitude}
            allowDragableMarker={false}
            displayFirstMarker={true}
            displaySecondMarker={true}
            secondLatCenter={this.props.stopPlaceLattitude}
            secondLngCenter={this.props.stopPlaceLongitude}
            centerCoord={this.state.centerCoord}
          />
        </div>
      </div>
    );
  }
}
export default SingleMeetingDetails;
