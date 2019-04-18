import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
//import Home from "./pages/Home.js";
import Navbar from "./components/Navbar.js";
import About from "./pages/About.js";
import Firebase from "./components/Firebase/firebase";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }
  authListener() {
    Firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  // render() {
  //   return (
  //     <Router>
  //       <div>
  //         {this.state.user ? <About /> : <Login />}
  //         <Route exact path ="/" component = {Home}/>
  //         <Route exact path = "/About" component = {About}/>
  //       </div>
  //     </Router>
  //   );
  // }

  render() {
    return (
      <Router>
        <div>{this.state.user ? <About /> : <Navbar />}</div>
      </Router>
    );
  }
}

export default App;
