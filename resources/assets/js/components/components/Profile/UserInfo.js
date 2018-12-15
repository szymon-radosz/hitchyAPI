import React from "react";

const UserInfo = (props) => {
    return (
        <div>
            <p>Profil {props.nickName}</p>
            <p>
            {props.firstName} {props.lastName}
            </p>
            <p>{props.description}</p>
            <p>
            {props.age}, {props.location}
            </p>
        </div>
    )
};

export default UserInfo