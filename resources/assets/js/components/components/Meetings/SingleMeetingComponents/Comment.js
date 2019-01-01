import React from "react";

const Comment = props => (
  <div className="panel panel-default">
    <div className="panel-body">
      <p>
        {props.userNickname} napisał/a {props.date}:{" "}
      </p>

      <p>{props.commentBody}</p>
    </div>
  </div>
);

export default Comment;
