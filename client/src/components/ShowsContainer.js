import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ShowList from './ShowList';
import Show from './Show';
import './ShowList.css'
import LoggedInNavbar from '../components/LoggedinNavbar';
import CourseDetails from '../pages/CourseDetails';
class ShowsContainer extends Component {
   render() {
      return (
         <div>
            <LoggedInNavbar/>
            <br/>
            <Switch>
               <Route path="/shows" exact component={ShowList} />
               <Route path="/course/:id" exact component={CourseDetails} />
            </Switch>
         </div>
      );
   }
}

export default ShowsContainer;
