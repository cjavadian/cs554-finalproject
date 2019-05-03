import React, { Component } from "react";
import { BrowserRouter as Router,Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Firebase from "./components/Firebase/firebase";

const client = new ApolloClient({
  uri:'http://localhost:7050/graphql'
})

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

  render() {
    return (
      <ApolloProvider client = {client}>
        <Router>
          <div>{this.state.user ? <About/> : <Home />}</div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
