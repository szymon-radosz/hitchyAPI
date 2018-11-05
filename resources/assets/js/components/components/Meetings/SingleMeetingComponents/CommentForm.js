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

  componentDidMount() {
    this.setState({
      loggedInUserNickname: this.props.loggedInUserNickname,
      meetingId: this.props.meetingId
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async submitComment(event) {
    event.preventDefault();

    const savedComment = await axios.post(`http://127.0.0.1:8000/api/comment`, {
      userId: sessionStorage.getItem("userId"),
      userEmail: this.props.loggedInUserEmail,
      meetingId: this.props.meetingId,
      commentBody: this.state.commentBody
    });

    if (savedComment.status == "200") {
      this.props.addCommentToState(
        this.props.loggedInUserEmail,
        savedComment.data.created_at,
        this.state.commentBody
      );
      this.props.showAlertSuccess("Dodałeś komentarz.");
    } else {
      this.props.showAlertWarning(
        "Nie udało się dodać komentarza."
      );
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitComment}>
          <div className="form-group">
            <label htmlFor="commentBody">
              Napisz komentarz jako {this.props.loggedInUserEmail}
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

          <button type="submit" className="btn btn-default">
            Dodaj
          </button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
