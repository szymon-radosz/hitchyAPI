import React from "react";

const UserInfo = props => {
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

      <h3>Lista Twoich wyjazdów</h3>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">L.P</th>
            <th scope="col">Nazwa</th>
            <th scope="col">Data rozpoczęcia</th>
            <th scope="col">Autor wydarzenia</th>
          </tr>
        </thead>
        <tbody>
          {props.userEventsHistory.map((event, i) => {
            return (
              <tr>
                <th>{i}</th>
                <th>{event.title}</th>
                <th>{event.startDate}</th>
                <th>{event.authorNickName}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
