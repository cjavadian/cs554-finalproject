import React, { Component } from "react";

class CourseReviewStatistics extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6 col-sm-3">Overall Quality
          <p>92%</p>
          </div>
        
          <div className="col-6 col-sm-3">Level Of difficulty
          <p>7/10</p>
          </div>

          {/* <!-- Force next columns to break to new line --> */}
          <div className="w-100" />

          <div className="col-6 col-sm-3">Recommended:
          <p>Yes</p>
          </div>
          <div className="col-6 col-sm-3">Tags:
          <p>flexible Cool Professor</p></div>
        </div>
      </div>
    );
  }
}

export default CourseReviewStatistics;
