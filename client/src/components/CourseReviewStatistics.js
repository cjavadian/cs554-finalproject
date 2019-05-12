import React, { Component } from "react";
import "./CourseReviewStatistics.css"
class CourseReviewStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course
    };
  }
  render() {
    const quality = this.state.course.ratings/5 * 100;
    console.log(this.props.course);
    return (
        <div className=" row">
          <div className="col-6 col-sm-12 clsindirows">OVERALL QUALITY
          <p>{quality.toFixed(2).toString()}%</p>
          </div>
        
          <div className="col-6 col-sm-12 clsindirows">LEVEL OF DIFFICULTY
          <p>{this.state.course.difficulty.toString()}</p>
          </div>
          <div className="col-6 col-sm-12 clsindirows">INSTRUCTOR:
          <p>{this.state.course.instructor}</p></div>
        </div>
    );
  }
}

export default CourseReviewStatistics;
