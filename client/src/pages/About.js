import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import Footer from "../components/Footer.js";
import "./About.css";
import UserProfilePicture from "../components/UserProfilePicture";

class About extends Component {
  render() {
    return (
      <div>
        <LoggedinNavbar />
        <div className="container-fluid">
          <UserProfilePicture/>
          
          </div>
          
        <Footer /> 
      </div>
    );
  }
}

export default About;
