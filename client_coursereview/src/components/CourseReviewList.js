import React, { Component } from "react";

class CourseReviewList extends Component {
  render() {
    return (
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Rating</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="rating">
                <div className="date">Date: </div>
                <div className="rating-block-awesome">
                  <div className="rating-wrapper">
                    <div className="icon awesome-icon" />
                    <span class="rating-type">awesome</span>
                  </div>
                  <div className="courseclass">
                    <span className="attendance">
                      Attendance:
                      <span class="response">Not Mandatory</span>
                    </span>
                    <span className="grade">
                      Grade Recieved:
                      <span class="response">A+</span>
                    </span>
                    <span className="textbook">
                      Textbook Used:
                      <span class="response">No</span>
                    </span>
                  </div>
                </div>
              </td>
              <td colspan="2" className="comments">
                <p className="commentsParagrah">
                  CS-554 is well structured, teaches new treding web
                  technologies
                </p>
                <div className="helpful-links-thumbs">
                  <a href="#" className="helpful">
                    <span className="count">0</span>
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td colspan="2">Jacob</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CourseReviewList;
