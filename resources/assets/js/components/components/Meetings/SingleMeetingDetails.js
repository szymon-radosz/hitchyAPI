import React, { Component } from "react";
import axios from "axios";
import Comment from "./SingleMeetingComponents/Comment";
import CommentForm from "./SingleMeetingComponents/CommentForm";
import MapComponent from "./../Map/MapComponent.js";
import { store } from "./../../store";
import Animate from "react-smooth";
import { BrowserRouter as Router, Link } from "react-router-dom";

class SingleMeetingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTakePartBtn: true,
      displayResignBtn: false,
      isAuthor: false,
      isLimit: false,
      currentUserId: 0,
      currentUserNickName: "",
      currentUserEmail: "",
      startLat: this.props.item.startPlaceLattitude,
      startLng: this.props.item.startPlaceLongitude,
      stopLat: this.props.item.stopPlaceLattitude,
      stopLng: this.props.item.stopPlaceLongitude,
      comments: [],
      commentBody: "",
      centerCoord: [
        this.props.item.startPlaceLattitude,
        this.props.item.startPlaceLongitude
      ],
      users: this.props.item.users,
      comments: this.props.item.comments
    };

    this.setNewCenterCoords = this.setNewCenterCoords.bind(this);
    this.takePartClick = this.takePartClick.bind(this);
    this.resignClick = this.resignClick.bind(this);
    this.addCommentToState = this.addCommentToState.bind(this);
    this.checkTakePart = this.checkTakePart.bind(this);
    this.isAuthor = this.isAuthor.bind(this);
    this.isLimit = this.isLimit.bind(this);
  }

  checkTakePart() {
    this.state.users.map((user, i) => {
      if (user.id == this.state.currentUserId) {
        this.setState({ displayTakePartBtn: false, displayResignBtn: true });
      }
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  setNewCenterCoords(lat, lng) {
    this.setState({ centerCoord: [lat, lng] });
  }

  addCommentToState(userNickname, commentDate, commentBody) {
    let commentObject = {
      user_email: userNickname,
      created_at: commentDate,
      comment_body: commentBody
    };

    this.setState(prevState => ({
      comments: [...prevState.comments, commentObject]
    }));
  }

  async takePartClick() {
    const takePart = await axios.post(
      `${this.props.appPath}/api/addEventUserRelation`,
      {
        userId: this.state.currentUserId,
        eventId: this.props.item.id
      }
    );

    if (takePart.status == 200) {
      this.setState({ displayTakePartBtn: false, displayResignBtn: true });

      let newUser = {
        email: this.state.currentUserEmail,
        id: this.state.currentUserId
      };

      this.setState(prevState => ({
        users: [...prevState.users, newUser]
      }));

      this.props.showAlertSuccess("Dodano uzytkownika do spotkania");
    } else {
      this.props.showAlertWarning(
        "Nie udało się zapisać uzytkownika do wydarzenia."
      );
    }
  }

  async resignClick() {
    const resign = await axios.post(
      `${this.props.appPath}/api/removeEventUserRelation`,
      {
        userId: this.state.currentUserId,
        eventId: this.props.item.id
      }
    );

    if (resign.status == 200) {
      this.setState({ displayTakePartBtn: true, displayResignBtn: false });

      let currentUserId = this.state.currentUserId;

      const usersArrayWithoutDeletedUser = this.state.users.filter(function(
        user
      ) {
        return user.id != currentUserId;
      });

      this.setState({ users: usersArrayWithoutDeletedUser });

      this.props.showAlertSuccess("Usunięto uzytkownika do spotkania");
    } else {
      this.props.showAlertWarning(
        "Nie udało się usunąć uzytkownika do wydarzenia."
      );
    }
  }

  isAuthor() {
    if (this.props.item.users[0].id == this.state.currentUserId) {
      this.setState({
        isAuthor: true,
        displayTakePartBtn: false,
        displayResignBtn: false
      });
    }
  }

  isLimit() {
    if (this.props.item.users.length == this.props.item.limit) {
      this.setState({ isLimit: true });
    }
  }

  async componentDidMount() {
    this.props.switchLoader(true);

    let storeData = store.getState();

    if (storeData.user.user.userId) {
      await this.setState({
        currentUserId: storeData.user.user.userId,
        currentUserEmail: storeData.user.user.userEmail,
        currentUserNickName: storeData.user.user.userNickName
      });

      await this.isAuthor();
      await this.isLimit();
    } else {
      await this.setState({
        startLat: this.props.item.startPlaceLattitude,
        startLng: this.props.item.startPlaceLongitude,
        stopLat: this.props.item.stopPlaceLattitude,
        stopLng: this.props.item.stopPlaceLongitude
      });
    }

    if (!this.state.isAuthor) {
      await this.checkTakePart();
    }

    this.props.switchLoader(false);
  }

  render() {
    return (
      <div className="register row singleMeetingDetailsDataRow">
        <div className="col-sm-6 singleMeetingDetailsDataCol">
          <Animate steps={this.props.animationSteps}>
            <div>
              <h2>{this.props.item.title}</h2>

              <div
                className="btn btn-default btnBlue btnCircled"
                onClick={() => {
                  this.setNewCenterCoords(
                    this.props.item.startPlaceLattitude,
                    this.props.item.startPlaceLongitude
                  );
                }}
              >
                Punkt Startowy
              </div>

              <div
                className="btn btn-default btnBlue btnCircled"
                onClick={() => {
                  this.setNewCenterCoords(
                    this.props.item.stopPlaceLattitude,
                    this.props.item.stopPlaceLongitude
                  );
                }}
              >
                Punkt Końcowy
              </div>

              <p>
                <strong>Opis:</strong> {this.props.item.description}
              </p>

              <p>
                <strong>Stworzone przez:</strong>{" "}
                {this.props.item.users[0].nickName}
              </p>

              <p>
                <strong>Limit uczestników:</strong> {this.props.item.limit} (
                {this.state.users.length} bierze udział
                {this.state.users.length == this.props.item.limit &&
                  ", osiągnięto limit"}
                )
              </p>

              <p>
                <strong>Wezmą udział:</strong>
              </p>

              {this.state.users.map((user, i) => {
                return <p key={i}>{user.email}</p>;
              })}

              {this.props.guestUser && (
                <Link
                  to="/login"
                  className="btn btn-default btnBlue btnCircled"
                >
                  Zaloguj się, aby wziąć udział i dyskutować
                </Link>
              )}

              {this.state.displayTakePartBtn &&
                this.state.currentUserId &&
                !this.props.guestUser &&
                !this.state.isLimit && (
                  <div
                    className="btn btn-default btnBlue btnCircled"
                    onClick={this.takePartClick}
                  >
                    Weź udział
                  </div>
                )}

              {this.state.displayResignBtn &&
                this.state.currentUserId &&
                !this.props.guestUser &&
                !this.state.isLimit && (
                  <div
                    className="btn btn-default btnBlue btnCircled"
                    onClick={this.resignClick}
                  >
                    Zrezygnuj
                  </div>
                )}

              {this.state.displayResignBtn || this.state.isAuthor ? (
                <p>
                  <strong>Komentarze:</strong>
                </p>
              ) : (
                ""
              )}

              {this.state.displayResignBtn ||
                (this.state.isAuthor &&
                  this.state.comments.map((comment, i) => {
                    return (
                      <Comment
                        key={i}
                        userNickname={comment.userEmail}
                        item={comment}
                      />
                    );
                  }))}

              {this.state.displayResignBtn ||
                (this.state.isAuthor && (
                  <CommentForm
                    loggedInUserEmail={this.state.currentUserEmail}
                    loggedInUserNickname={this.state.currentUserNickName}
                    meetingId={this.props.item.id}
                    addCommentToState={this.addCommentToState}
                    showAlertSuccess={this.props.showAlertSuccess}
                    showAlertWarning={this.props.showAlertWarning}
                    appPath={this.props.appPath}
                  />
                ))}
            </div>
          </Animate>
        </div>

        <div className="col-sm-6 meetingMapContainer">
          <MapComponent
            latCenter={this.state.startLat}
            lngCenter={this.state.startLng}
            secondLatCenter={this.state.stopLat}
            secondLngCenter={this.state.stopLng}
            mapZoom={10}
            centerCoord={this.state.centerCoord}
            setNewCenterCoords={this.setNewCenterCoords}
            hideSearchBox={true}
            allowDragableMarker={false}
          />
        </div>
      </div>
    );
  }
}
export default SingleMeetingDetails;
