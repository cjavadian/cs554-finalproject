import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js'
import About from './pages/About.js'

class App extends Component {
  Firebase
  render() {
    return (
      <Router>
     <div>
      <Route exact path ="/" component = {Home}/>
      <Route exact path = "/About" component = {About}/>
     </div> 
     </Router>
    );
  }
}

export default App;
