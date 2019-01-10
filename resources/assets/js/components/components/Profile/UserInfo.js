import React from "react";
import Animate from "react-smooth";
import userImage from "./../../images/user.png";

const UserInfo = props => {
  return (
    <Animate steps={props.animationSteps}>
      <div className="panel-group userContainer">
        <div className="panel panel-default">
          <div className="panel-body">
            <img className="userImage" src={userImage} />
            <div className="userData">
              <p>
                <strong>Profil {props.nickName}</strong>
              </p>
              <p>
                {props.firstName} {props.lastName}
              </p>
              <p>{props.description}</p>
              <p>
                {props.age}, {props.location}
              </p>
            </div>
          </div>
        </div>

        <div className="panel-group userEventTable">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title bold">Lista Twoich wyjazdów</h4>
            </div>
            <div className="panel-body">
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Nazwa
                    </th>
                    <th scope="col" className="text-center">
                      Data rozpoczęcia
                    </th>
                    <th scope="col" className="text-center">
                      Autor wydarzenia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.userEventsHistory.map((event, i) => {
                    return (
                      <tr key={i}>
                        <th className="text-center">{event.title}</th>
                        <th className="text-center">{event.created_at}</th>
                        <th className="text-center">{event.nickName}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
};

export default UserInfo;
