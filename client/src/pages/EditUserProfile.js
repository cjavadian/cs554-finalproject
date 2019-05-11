import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import "./Dashboard.css";
import Firebase from '../components/Firebase/firebase'
import { graphql, compose } from "react-apollo";
import { GET_USER } from "../queries/queries";
import Footer from "../components/Footer";
import './EditUserProfile.css';

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
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleUpdate(event) {

  }

   render() {
    return (
      <div>
        <LoggedinNavbar />
        <div class="card h-100 w-50">
        <div class="card-header"><h1>Edit User's Profile</h1></div>
        <div class="card-body text-dark">
          <p class="card-text">
          <form className="form-edit" onSubmit={this.handleUpdate}>
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
              placeholder="Enter Username"
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
          </p>
        </div>
      </div>
      <Footer />
      </div>
    );
  }
}
export default compose(
  graphql(GET_USER, {name: GET_USER})
)(EditUserProfile);