import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Firebase from "./components/Firebase/firebase";
import CourseDetails from "./pages/CourseDetails";
import ShowsContainer from './components/ShowsContainer';
import Show from "./components/Show"
import IsAuthenticated from "./components/isAuthenticated"
import { withRouter } from "react-router";
import ShowList from "./components/ShowList";
import EditUserProfile from "./pages/EditUserProfile";

const client = new ApolloClient({
  uri: 'http://localhost:7050/graphql'
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
      console.log("user:", user);
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
      <ApolloProvider client={client}>
        <Router>
          {/* {<div>{this.state.user ? <About/> : <Home />}</div>    */}
          <Route path="/" exact component={Home} />
          <Route path="/about/" exact render={() => <IsAuthenticated><About /></IsAuthenticated>} />
          <Route path="/shows/" exact render={() => <IsAuthenticated><ShowsContainer /></IsAuthenticated>} />     
          <Route path="/course/:id" exact exact render={() => <IsAuthenticated><CourseDetails /></IsAuthenticated>} />
          <Route path="/course" exact exact render={() => <IsAuthenticated><CourseDetails /></IsAuthenticated>} />
          <Route path="/editprofile" exact exact render={() => <IsAuthenticated><EditUserProfile/></IsAuthenticated>} />
          {/* <div>{this.state.user ? <CourseDetails/> : <Home />}</div> */}

        </Router>





      </ApolloProvider>
    );
  }
}

export default App;
