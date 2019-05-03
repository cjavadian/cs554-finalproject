import React, { Component } from "react";

export class CourseReviewStatistics extends Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col-6 col-sm-3">Overall Quality</div>
          <div class="col-6 col-sm-3">Level Of difficulty</div>

          {/* <!-- Force next columns to break to new line --> */}
          <div class="w-100" />

          <div class="col-6 col-sm-3">Recommended</div>
          <div class="col-6 col-sm-3">Tags</div>
        </div>
      </div>
    );
  }
}

export default CourseReviewStatistics;
