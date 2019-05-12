import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import Footer from "../components/Footer.js";
import "./Dashboard.css";
import UserProfilePicture from "../components/UserProfilePicture";

class Dashboard extends Component {
  constructor(props) {
		super(props);
		this.state = {
			email: this.props.email
		};
  }
  render() {
    return (
      <div>
        <LoggedinNavbar />
        <div className="container-fluid">
          <UserProfilePicture useremail={this.props.email}/>
          </div>
        <Footer /> 
      </div>
    );
  }
}

export default Dashboard;
