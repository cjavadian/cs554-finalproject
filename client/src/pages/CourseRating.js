import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Course from '../components/Course';

import {GET_SORTED_COURSES, GET_COURSE_BY_TITLE} from "../queries/queries"
import { Query } from 'react-apollo';
import {FaSearch } from 'react-icons/fa';
import LoggedInNavbar from '../components/LoggedinNavbar';
import './CourseRating.css'


class CourseRating extends Component {
   constructor(props) {
      super(props);
      this.state = {
         
      };
   }
   
   componentDidMount() {
      
   }
   
   render() {
      
      let body = null;
      let li = null;

      
      if(this.props.email) {
         li = 
      <Query query={GET_SORTED_COURSES}>
					{({ data }) => {
						console.log(`showlist data: ${JSON.stringify(data)}`);
                  const {allRatingSortCourses} = data;
                  console.log("courses",allRatingSortCourses);
						if(!allRatingSortCourses) {
							return null;
                  }
						return (
							<div>
								{allRatingSortCourses.map((course,index) => {
									return (
                                 <li key={index}>
                                   <p className="rate-number"><strong>{"No."}{index+1}</strong><br/></p>
                                   <p>{course.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>{"Rating: "}{course.ratings.toFixed(2).toString()}</strong></p>
                                 </li>
									);
								})}
							</div>
						);
					}}
				</Query>
      }
      body = (
        <div className="review-container">
        <LoggedInNavbar email={this.props.email}/>
            <ul className="showRating">{li}</ul>
         </div>
      );

      return body;
   }

}

export default CourseRating;
