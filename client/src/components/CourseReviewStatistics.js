import React, { Component } from "react";

class CourseReviewStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course
    };
  }
  render() {
    const quality = this.state.course.ratings/5 * 100;

    return (
      <div>
        <div className="row">
          <div className="col-6 col-sm-3">Overall Quality
          <p>{quality.toString()}%</p>
          </div>
        
          <div className="col-6 col-sm-3">Level Of difficulty
          <p>{this.state.course.difficulty}</p>
          </div>

          {/* <!-- Force next columns to break to new line --> */}
          <div className="w-100" />

          <div className="col-6 col-sm-3">Tags:
          <p>flexible Cool Professor</p></div>
        </div>
      </div>
    );
  }
}

export default CourseReviewStatistics;
