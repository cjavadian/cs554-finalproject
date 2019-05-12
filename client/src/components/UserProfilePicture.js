import React, { Component } from "react";
import { FaCamera } from "react-icons/fa";
import "./UserProfilePicture.css";
import { GET_USER } from "../queries/queries";
import { Query } from "react-apollo";
import '../../node_modules/croppie/croppie.css';
import croppie from "croppie";

class UserProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      email: this.props.useremail,
      src:"https://placeimg.com/444/445"
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
      localStorage.setItem("prpic",reader.result);
      
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
    // let pic = localStorage.getItem("prpic");
    // profilePic.setAttribute("src",pic);
    // this.setState({src: pic});
    // console.log("src:" +this.state.src);
    console.log("exit handleimage")
    
  }


  hydrateStateWithLocalStorage() {
 
        let value = localStorage.getItem("prpic");
        if(value){
          this.setState({ src: value });
        } 
        else {
          // handle empty string
          this.setState({ src:"https://placeimg.com/444/445" });
        }
      }
      componentDidMount() {
        this.hydrateStateWithLocalStorage();
     }
  
     
  render() {
    console.log("pic",this.props.useremail);
    return (
      <div >
        <div className="row">
          <div className="col-3 center-block">
          <div className="card d-flex w-100 h-100">
          <div className="card-header">
          <div className="profile-pic">
            <img
              className="text-center avatar rounded-circle m-auto"
              id="prpic"
              src={this.state.src}
              alt="Card cap"
            />
          </div>
          <div className="p-image">
            {/* <FaCamera upload-button /> */}
            <form onSubmit={this.handleSubmit}>
              <input aria-label="upload"
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
          </div>
            <Query query={GET_USER} variables ={{e_mail: this.props.useremail}}>
              {({data}) => {
                const userInfo = data;
                if(!userInfo || userInfo.user === undefined || userInfo.user === null ){
                  return null;
                }
                console.log(userInfo.user);
                return (
                    <div>
                      <div className="card-body">
                        <h2 className="card-title text-left">{userInfo.user.first_name} {userInfo.user.last_name}</h2>
                        <hr />
                        <dl className="text-secondary">
                          <dt>Username: </dt>
                          <dd>{userInfo.user.user_name}</dd>
                          <dt>Email: </dt>
                          <dd>{userInfo.user.email}</dd>
                        </dl>
                        </div>
                    </div>
                  )
                }
              }
            </Query>
          </div>
          </div>
          <div className="col-9">
              <br />
              <Query query={GET_USER} variables ={{e_mail: this.props.useremail}}>
              {({data}) => {
                const userInfo = data;
                if(!userInfo || userInfo.user === undefined || userInfo.user === null ){
                  return null;
                }
                console.log(userInfo.user);
                return (
                    <div>
                      <h1>Welcome, {userInfo.user.first_name}! </h1>
                    </div>
                  )
                }
              }
            </Query>
              <hr />
            <img className="cycle" src={require('../images/course-review-process.png')} alt="cycle"/>
              <h2>Signing up for classes and don't know what to take?</h2>
              <hr />
              <p>You've come to the right place. CourseReview is a website for Stevens students to review courses offered.
                This gives students an idea of what to expect when taking certain courses from other students
                who have taken the course before.
              </p>
              <p>
                You can search and view ratings about courses from other students and add your own as well.
                As a user, you can also like comments if they're helpful!
              </p>
              <p>
                Feel free to chat with other Stevens students online as well!
              </p>
          </div>
          </div>
      </div>
    );
  }
}

export default UserProfilePicture;
