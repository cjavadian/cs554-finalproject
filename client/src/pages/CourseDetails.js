import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import CourseCard from '../components/CourseCard';
import CourseReviewStatistics from '../components/CourseReviewStatistics';
import CourseReviewList from '../components/CourseReviewList';
import {GET_COURSE_BY_ID} from "../queries/queries";
import { Query, Mutation } from 'react-apollo';
import './CourseDetails.css'
 
class CourseDetails extends Component {
  constructor(props) {
    super(props);
    console.log(`CourseDetails: ${this.props.email}`);
    console.log(`CourseDetails: ${this.props.params}`)
    this.state = {
        email: this.props.email,
        course_id: "8ffdb2ce-2cf2-4377-8d09-bbc41c36027e",
    }
  }
  
  getUrl(url){
  	for(let i = url.length - 1; i >= 0; i--){
  		if(url[i] ==='/') return url.substring(i+1,);
  	}
  }

  render() {
  	const id = this.getUrl(window.location.href);
    console.log("course_details",this.props)
    return (
      
      <div class="courseconatiner">
        <LoggedinNavbar/>
        <br/>

        <Query query={GET_COURSE_BY_ID} variables={{ id: id }}>
          {({ data }) => {
            console.log(`course info: ${JSON.stringify(data)}`);
            const {course} = data;
            if(!course) {
              return null;
                  }
            return (
              <div>
                {/* <h5>{course.title}</h5>
                <br/> */}
        
                <div className="clsCourseContainer">
                  <div className="row">
                    <div className="col-4">
                      <CourseCard course = {course} />
                    </div>
                    <div className="col-4 clsCourseContainerCard">
                      <CourseReviewStatistics course = {course} />
                    </div>
                  </div>
                  <br/>
                  <div className="row" >
                  <CourseReviewList course = {course} email = {this.props.email}/>
                  </div>
                  
                </div>
              </div>
            );

          }}
        </Query>
      </div>
    );
  }
}

export default CourseDetails;
