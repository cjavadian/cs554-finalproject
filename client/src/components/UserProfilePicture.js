import React, { Component } from "react";
import { FaCamera } from "react-icons/fa";
import "./UserProfilePicture.css";
import { GET_USER } from "../queries/queries";
import { Query } from "react-apollo";

class UserProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      email: this.props.useremail
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleSubmit(e) {
    e.preventDefault();
    console.log("handle uploading-", this.state.file);
  }

  async foo(base64url) {

  }

   handleImageChange(event) {
    var profilePic = document.getElementById("prpic");
    console.log(profilePic.src);
     var baseUrl;
     console.log("inside handleimage")
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", function () {
      profilePic.src = reader.result;

      //let updatProfilePic = await foo();

      
    }, false);
    //  reader.onloadend = (data) => {
    //   baseUrl = data.target.result;
    //   profilePic = data.target.result;
    //   // console.log(baseUrl);
    //   //  console.log("data os ::")
    //   //  console.log(data.target.result);
    //   //    this.setState({
    //   //   file: data.target.result
    //   // });
    // };
    // console.log(baseUrl);
    console.log("exit handleimage")
    
  }

  render() {
    console.log("pic",this.props.useremail);
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <div className="profile-pic">
              <img
                className="text-center avatar rounded-circle m-auto"
                id="prpic"
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
            <br />
            <br />
            <Query query={GET_USER} variables ={{e_mail: this.props.useremail}}>
              {({data}) => {
                const userInfo = data;
                if(!userInfo || userInfo.user === undefined){
                  return null;
                }
                console.log(userInfo.user);
                return (
                    <div>
                    <h4 className="card-title text-left">{userInfo.user.first_name} {userInfo.user.last_name}</h4>
                    
                    <dl className="text-secondary">
                      <dt>Username: </dt>
                      <dd>{userInfo.user.user_name}</dd>
                      <dt>Email: </dt>
                      <dd>{userInfo.user.email}</dd>
                    </dl>
                    </div>
                  )
                }
              }
            </Query>
            

          </div>
          <div className="col-9">
          <img className="laptop" src={require('../images/laptop.png')} alt="laptop image"/>
          </div>
          </div>
      </div>
    );
  }
}

export default UserProfilePicture;
