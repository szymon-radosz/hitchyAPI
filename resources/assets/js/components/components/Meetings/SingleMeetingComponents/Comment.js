import React from "react";
import { Link } from "react-router-dom";

const Comment = props => (
  <div className="panel panel-default">
    <div className="panel-body">
      {/*<div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Szczegoły
        </button>
        <div
          className="dropdown-menu userCommentInfoBox"
          aria-labelledby="dropdownMenuButton"
        >
          <p>{props.userNickname}</p>
          <li>
            <Link to={`/profile/${props.userNickname}`}>
              Profil użytkownika
            </Link>
          </li>
        </div>
</div>*/}

      <p>
        {props.userNickname} napisał/a {props.date}:{" "}
      </p>

      <p>{props.commentBody}</p>
    </div>
  </div>
);

export default Comment;
