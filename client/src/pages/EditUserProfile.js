import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import "./About.css";
import Firebase from '../components/Firebase/firebase'
import { graphql, compose } from "react-apollo";
import { getUser, updateUser } from "../queries/queries";

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleUpdate(event) {}

  handlePasswordUpdate(event) {
    event.preventDefault();
    Firebase.auth().currentUser.updatePassword(this.state.password);
    alert("Password updated, please login again")
  }

  render() {
    return (
      <div>
        <LoggedinNavbar />
        <br />
        <h5> Edit User's Profile</h5>
        <form className="form-edit" onSubmit={this.handlePasswordUpdate}>
          <div className="form-group">
            <label for="firstname">First Name</label>
            <input
              type="text"
              minLength={3}
              className="form-control"
              id="firstname"
              aria-describedby="firstName"
              placeholder="Enter First name"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              minLength={3}
              className="form-control"
              id="lastname"
              aria-describedby="lastName"
              placeholder="Enter Last name"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label for="username">User Name</label>
            <input
              minLength={3}
              type="text"
              class="form-control"
              id="username"
              aria-describedby="username"
              placeholder="Enter Usrname"
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              minLength={6}
              className="form-control"
              id="password"
              placeholder="Enter only if you want to change"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getUser, {name: getUser}),
  graphql(updateUser, {name: updateUser})
)(EditUserProfile);
