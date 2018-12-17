import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./../../actions/userActions";

class LogoutBtn extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.logoutUser();
  }
  
  render() {
    return (
      <div>
        <a onClick={this.logout}>Wyloguj się</a>
      </div>
    );
  }
}
const mapStateToProps = state => ({
    user: state.payload
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(LogoutBtn);
