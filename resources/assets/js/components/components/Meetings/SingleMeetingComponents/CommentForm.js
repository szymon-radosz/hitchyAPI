import React, { Component } from "react";
import axios from "axios";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentBody: "",
      loggedInUserNickname: "",
      meetingId: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async submitComment(event) {
    event.preventDefault();

    const savedComment = await axios.post(`${this.props.appPath}/api/comment`, {
      userId: this.props.userId,
      userEmail: this.props.loggedInUserEmail,
      eventId: this.props.meetingId,
      commentBody: this.state.commentBody
    });

    if (savedComment.status == "201") {
      this.props.addCommentToState(
        savedComment.data.user_email,
        savedComment.data.created_at,
        savedComment.data.comment_body
      );
      this.props.showAlertSuccess("Dodałeś komentarz.");
    } else {
      this.props.showAlertWarning("Nie udało się dodać komentarza.");
    }
  }

  componentDidMount() {
    this.setState({
      loggedInUserNickname: this.props.loggedInUserNickname,
      meetingId: this.props.meetingId
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitComment}>
          <div className="form-group">
            <label htmlFor="commentBody">
              Napisz komentarz jako {this.props.loggedInUserEmail}:
            </label>
            <textarea
              maxLength="150"
              className="form-control"
              name="commentBody"
              id="commentBody"
              rows="3"
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-default btnBlue btnCircled">
            Dodaj
          </button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
