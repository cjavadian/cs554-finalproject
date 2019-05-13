import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import Footer from "../components/Footer.js";
import "./Dashboard.css";
import UserProfilePicture from "../components/UserProfilePicture";
import axios from 'axios'

class Dashboard extends Component {
  constructor(props) {
		super(props);
		this.state = {
			email: this.props.email
		};
  }
  async pushUser(){
    const users = await axios.post('http://localhost:7050/userlog/userin', {
          username: this.state.email
        })
        console.log(users);
  }
  async componentDidMount() {
    await this.pushUser();
  }
  render() {
    return (
      <div>
        <LoggedinNavbar email={this.props.email}/>
        <div className="container-fluid">
          <UserProfilePicture useremail={this.props.email}/>
          </div>
      {/*  <Footer /> */}
      </div>
    );
  }
}

export default Dashboard;
