import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import Footer from "../components/Footer.js";
import "./About.css";
import UserProfilePicture from "../components/UserProfilePicture";
import Home from './Home'
import {Route, Redirect} from "react-router"

class About extends Component {
  constructor(props) {
		super(props);
		this.state = {
			email: this.props.email
		};

  }
  render() {
    console.log("about",this.props.email);
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

export default About;
