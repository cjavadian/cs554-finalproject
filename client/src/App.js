import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Firebase from "./components/Firebase/firebase";
import CourseDetails from "./pages/CourseDetails";
import CourseContainer from './components/CourseContainer';
import Course from "./components/Course"
import IsAuthenticated from "./components/isAuthenticated"
import { withRouter } from "react-router";
import CourseList from "./components/CourseList";
import EditUserProfile from "./pages/EditUserProfile";
import Chat from "./pages/Chat";
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:7050/graphql',
  cache
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onAuthStateChanged(user => {
      console.log("user:", user);
      console.log("user:", user.email);
      if (user.email && !this.state.user) {
        this.setState({ user: user.email });
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
          <Route path="/" exact component={Home} />
          <Route path="/about/" exact render={() => <IsAuthenticated><About /></IsAuthenticated>} />
          <Route path="/courses/" exact render={() => <IsAuthenticated><CourseContainer /></IsAuthenticated>} />     
          <Route path="/coursedetails/:id" exact render={() => <IsAuthenticated><CourseDetails /></IsAuthenticated>} />
          {/* <Route path="/course" exact render={() => <IsAuthenticated><CourseList /></IsAuthenticated>} /> */}
          <Route path="/editprofile" exact render={() => <IsAuthenticated><EditUserProfile/></IsAuthenticated>} />
          <Route path="/chat" exact render={() => <IsAuthenticated><Chat/></IsAuthenticated>} />
        </Router>
      </ApolloProvider>
    );
    }    

}

export default App;
