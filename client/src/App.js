import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import Firebase from "./components/Firebase/firebase";
import CourseDetails from "./pages/CourseDetails";
import CourseContainer from './components/CourseContainer';
import IsAuthenticated from "./components/isAuthenticated";
import EditUserProfile from "./pages/EditUserProfile";
import EditPassword from "./pages/EditPassword";
import Chat from "./pages/Chat";
import AWSS3 from "./components/AWSS3";
import { InMemoryCache } from 'apollo-cache-inmemory';
//import UserReview from "./pages/UserReview"

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
      if (!this.state.user) {
        this.setState({ user: user.email});
        localStorage.setItem("user", user.uid);
        localStorage.setItem("user_email", user.email);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("user_email");

      }
    });
  }

  render() {
    
    return (
      <ApolloProvider client={client}>
      	<script src="./tota11y.min.js"></script>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard/" exact render={() => <IsAuthenticated><Dashboard email={this.state.user}/></IsAuthenticated>} />
          <Route path="/courses/" exact render={() => <IsAuthenticated><CourseContainer email={this.state.user}/></IsAuthenticated>} />     
          <Route path="/coursedetails/:id" exact render={() => <IsAuthenticated><CourseDetails email={this.state.user}/></IsAuthenticated>} />
          <Route path="/editprofile" exact render={() => <IsAuthenticated><EditUserProfile email={this.state.user}/></IsAuthenticated>} />
          <Route path="/editpassword" exact render={() => <IsAuthenticated><EditPassword email={this.state.user}/></IsAuthenticated>} />
          <Route path="/uploadfile" exact render={() => <IsAuthenticated><AWSS3 email={this.state.user}/></IsAuthenticated>} />
         {/* <Route path="/userreview" exact render={() => <IsAuthenticated><UserReview email={this.state.user}/></IsAuthenticated>} />*/}
          <Route path="/chat" exact render={() => <IsAuthenticated><Chat email={this.state.user}/></IsAuthenticated>} />
        </Router>
      </ApolloProvider>
    );
    }    

}

export default App;
