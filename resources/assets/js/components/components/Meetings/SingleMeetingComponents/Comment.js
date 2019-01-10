import React from "react";

const Comment = props => (
  <div>
    <div className="panel panel-default">
      <div className="panel-body">
        <p>
          {props.item.user_email} napisał/a {props.item.created_at}:{" "}
        </p>

        <p>{props.item.comment_body}</p>
      </div>
    </div>
  </div>
);

export default Comment;
