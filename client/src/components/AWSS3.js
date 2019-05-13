import React, { Component } from "react";
import axios from "axios";
import "./AWSS3.css";
import LoggedinNavbar from "./LoggedinNavbar";
import Footer from "./Footer";
class AWSS3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: ""
    };
  }

  handleChange = ev => {
    this.setState({ success: false, url: "" });
  };
  // Perform the upload
  handleUpload = ev => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post("http://localhost:7050/sign_s3", {
        fileName: fileName,
        fileType: fileType
      }).then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);

        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            "Content-Type": fileType
          }
        };
        axios.put(signedRequest, file, options)
          .then(result => {
            console.log("Response from s3");
            this.setState({ success: true });
          }).catch(error => {
            alert("ERROR " + JSON.stringify(error));
          });
      }).catch(error => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    const Success_message = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br />
      </div>
    );
    return (
     
      <div className="App">
        <LoggedinNavbar />
        <center className="magic-upload">
          <div className="card awss3card">
            <div className="card-body">
              <h5 className="card-title">Upload Course Material</h5>
              {this.state.success ? <Success_message /> : null}
              <label for = "myinput"></label>
              <input id = "myinput"
                onChange={this.handleChange}
                ref={ref => {
                  this.uploadInput = ref;
                }}
                type="file"
              />
              <br />
             {this.uploadInput && <button className="btn btn-outline-primary"onClick={this.handleUpload} >Upload</button>}
              
            </div>
          </div>
        </center>

        <div className="sky">
          <div className="moon" />
          <div className="clouds_two" />
          <div className="clouds_one" />
          <div className="clouds_three" />
        </div>
        <Footer />
      </div>
    );
  }
}
export default AWSS3;
