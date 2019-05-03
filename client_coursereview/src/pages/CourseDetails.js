import React, { Component } from "react";

class CourseDetails extends Component {
  render() {
    return (
      <div>
        <LoggedinNavbar />
        <div className="container">
          <div className="row">
            <div className="col-4">
              <CourseCard />
            </div>
            <div className="col-8">
              <CourseReviewStatistics />
            </div>
          </div>
          <div className="row" >
          <CourseReviewList/>
          </div>
          <button className="add">Add Review</button>
        </div>
      </div>
    );
  }
}

export default CourseDetails;
