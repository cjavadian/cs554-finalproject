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
		console.log(`About user email  ${this.props.user_mail}`);
		this.state = {
			user_email: this.props.user_mail
		};

	}
  render() {
    return (
      <div>
        <LoggedinNavbar />
        <div className="container-fluid">
          <UserProfilePicture user_email={this.state.user_email}/>
          </div>
          
        <Footer /> 
      </div>
    );
  }
}

export default About;
