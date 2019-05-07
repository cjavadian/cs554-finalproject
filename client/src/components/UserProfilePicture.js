import React, { Component } from "react";
import { FaCamera } from "react-icons/fa";
import "./UserProfilePicture.css";
import UserStatisticsGraph from "../components/UserStatisticsGraph";
import UserChat from "../components/Chat";

class UserProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handle uploading-", this.state.file);
  }

   handleImageChange(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
     reader.onloadend = async() => {
        await this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    
  }

  render() {
    return (
      <div>
      <div class="row">
        <div className="col-3">
          <div className="profile-pic">
            <img
              className="text-center avatar rounded-circle m-auto"
              src="https://placeimg.com/444/445"
              alt="Card cap"
            />
          </div>
          <div className="p-image">
            {/* <FaCamera upload-button /> */}
            <form onSubmit={this.handleSubmit}>
              <input
                className="file-upload"
              type="file"
              accept="image/*"
              onChange={this.handleImageChange}
              />
            </form>
          </div>
          <br />
          <h4 className="card-title text-left">First Name Last Name</h4>
          <hr />
          <dl className="text-secondary">
            <dt>Username: </dt>
            <dd>User's user name</dd>
            <dt>Email: </dt>
            <dd>User's email</dd>
          </dl>
        </div>
        <div className="col-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                User's Course Review Statisitics
              </h5>
              <h6 className="card-subtitle cols-6">
                Card subtitle
              </h6>
              <UserStatisticsGraph />
              <p className="card-text">
                Some quick example text to build on the card title and
                make up the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="useruseful">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Useful Statisitics</h5>
                <h6 className="card-subtitle md-2 text-muted col-6">
                  Card subtitle
                </h6>
                <UserStatisticsGraph />
                <p className="card-text">
                  Some quick example text to build on the card title and
                  make up the bulk of the card's content.
                </p>
              </div>
            </div>
        </div>
        <div className="col-2">
          <div className="chat-container">
            <UserChat />
          </div>
        </div> 
        </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePicture;
