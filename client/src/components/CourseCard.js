import React, { Component } from "react";
import Stevens from '../sit-logo.jpg'
import './CourseCard.css';

class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course
    };
  }
  render() {
    return (
      <div>
        <div className="card" >
          <img className="card-img-top courseimg" src={Stevens} alt="card" />
          <div className="card-body">
            <p className="card-text">
              COURSE TITLE : {this.state.course.title}
            </p>
            <p className="card-text">
              ON CAMPUS : {this.state.course.campus.toString()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseCard;
