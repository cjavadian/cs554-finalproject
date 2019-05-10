import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CourseList from './CourseList';
import Show from './Course';
import './CourseList.css'
import LoggedInNavbar from './LoggedinNavbar';
import CourseDetails from '../pages/CourseDetails';
class CourseContainer extends Component {
   render() {
      return (
         <div>
            <LoggedInNavbar/>
            <br/>
            <Switch>
               <Route path="/courses" exact component={CourseList} />
               <Route path="/coursedetails/:id" exact component={CourseDetails} />
            </Switch>
         </div>
      );
   }
}

export default CourseContainer;
