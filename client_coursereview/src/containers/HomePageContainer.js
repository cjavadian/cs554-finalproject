import React from "react";
import Login from '../components/Login';
import Register from '../components/Register';

class HomePageContainer extends React.Component {
    submitHandler(username,password) {
        console.log(username+"-"+password);
    }
  render() {
      return(
          <div>
              <Login />
              <Register/>
          </div>
      ) 
  }
}

export default HomePageContainer;
