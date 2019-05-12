import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import "./Dashboard.css";
import { graphql, compose } from "react-apollo";
import { getUser, UPDATE_USER } from "../queries/queries";
import Footer from "../components/Footer";
import './EditUserProfile.css';
import {withRouter} from 'react-router-dom';

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: this.props.email,
      password: "",
      username: "",
      old_username: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async onUpdate(event) {
    event.preventDefault();
    await this.props.UPDATE_USER({
      variables: {
        user_old_name: this.state.old_username,
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        user_name: this.state.username
      }
    })
    this.props.history.push("/dashboard");
  }

  async componentDidMount() {
    const user_info = await this.props.getUser({
      variables: {
        e_mail: this.state.email
      }
    })
    this.setState({
      firstname: user_info.data.user.first_name,
      lastname: user_info.data.user.last_name,
      username: user_info.data.user.user_name,
      old_username: user_info.data.user.user_name
    })
  }

   render() {
    return (
      <div>
        <LoggedinNavbar />
        <div class="card-container d-flex h-100">
          <div class="row align-self-center w-100">
          <div class="col-6 mx-auto">
              <div class="card h-100 w-100">
              <div class="card-header"><h1>Edit User's Profile</h1></div>
              <div class="card-body text-dark">
                <p class="card-text">
                <form className="form-edit" onSubmit={this.onUpdate}>
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
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      <Footer />
      </div>
    );
  }
}
export default compose(
  graphql(getUser, {name: "getUser"}),
  graphql(UPDATE_USER, { name: "UPDATE_USER"})
)(withRouter(EditUserProfile));