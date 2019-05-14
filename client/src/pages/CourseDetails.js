import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import CourseCard from '../components/CourseCard';
import CourseReviewStatistics from '../components/CourseReviewStatistics';
import CourseReviewList from '../components/CourseReviewList';
import {GET_COURSE_BY_ID} from "../queries/queries";
import { Query } from 'react-apollo';
import './CourseDetails.css';
import Footer from '../components/Footer'
 
class CourseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: this.props.email,
        course_id: "",
    }
  }
  
  getUrl(url){
  	for(let i = url.length - 1; i >= 0; i--){
  		if(url[i] ==='/') return url.substring(i+1,);
  	}
  }

  render() {
  	const id = this.getUrl(window.location.href);
    console.log("course_details",this.props);
    console.log(this.props.id);
    return (
      
      <div className="courseconatiner">
        <LoggedinNavbar email={this.props.email}/>
        <br/>

        <Query query={GET_COURSE_BY_ID} variables={{ id: id }}>
          {({ data }) => {
            console.log(`course info: ${JSON.stringify(data)}`);
            const {course} = data;
            if(!course) {
              return null;
                  }
            return (
              <div className="cc">
                <div className="row">
                    <div className="col-6">
                      <CourseCard course = {course} />
                    </div>
                    <div className="col-5">
                        <CourseReviewStatistics course = {course} />
                  </div>
                </div>
                  <br/>
                  <div className="description">
                  <p className="ldesc">COURSE DESCRIPTION</p>
                    <p className="course-desc">{course.description}</p>
                    </div>
                    <hr/>
                  <div className="review-container">
                    <CourseReviewList course = {course} email = {this.props.email}/>
                  </div>
                </div>
            );
          }}
        </Query>
<Footer/>
      </div>
    );
  }
}

export default CourseDetails;
