import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import "./Dashboard.css";
import Firebase from '../components/Firebase/firebase'
import { graphql, compose } from "react-apollo";
import { GET_USER } from "../queries/queries";
import Footer from "../components/Footer";

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmpassword:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handlePasswordUpdate(event) {
    event.preventDefault();
    Firebase.auth().currentUser.updatePassword(this.state.password);
    alert("Password updated, please login again")
  }

  render() {
    const isInvalid = this.state.password !== this.state.confirmpassword;
    return (
      <div>
        <LoggedinNavbar />
        <div class="card h-100 w-50">
        <div class="card-header"><h1>Update Password</h1></div>
        <div class="card-body text-dark">
          <p class="card-text">
          <form className="form-edit" onSubmit={this.handlePasswordUpdate}>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  minLength={6}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  minLength={6}
                  className="form-control"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-dark" disabled={isInvalid}>
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
export default EditPassword;