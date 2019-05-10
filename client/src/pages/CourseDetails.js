import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import CourseCard from '../components/CourseCard';
import CourseReviewStatistics from '../components/CourseReviewStatistics';
import CourseReviewList from '../components/CourseReviewList';
import {GET_COURSE_BY_ID} from "../queries/queries";
import { Query, Mutation } from 'react-apollo';

 
class CourseDetails extends Component {
  constructor(props) {
    super(props);
    console.log(`CourseDetails: ${this.props.email}`);
    console.log(`CourseDetails: ${this.props.params}`)
    this.state = {
        email: this.props.email,
        course_id: "97f5ccdc-5965-4ec3-8857-59047ae027a2"
    }
  }

  render() {
    console.log("course_details",this.props)
    return (
      
      <div>
        <LoggedinNavbar/>
        <br/>

        <Query query={GET_COURSE_BY_ID} variables={{ id: this.state.course_id }}>
          {({ data }) => {
            console.log(`course info: ${JSON.stringify(data)}`);
            const {course} = data;
            if(!course) {
              return null;
                  }
            return (
              <div>
                <h5>{course.title}</h5>
                <br/>
        
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <CourseCard course = {course} />
                    </div>
                    <div className="col-8">
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
