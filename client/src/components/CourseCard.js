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
      <div claaName="cardcontainer">
        <div className="card">
          <img className="card-img-top courseimg" src={Stevens} alt="card" />
          <div className="card-body-details">
            <p className = "ltitle">COURSE TITLE :</p>
            <p className="card-text">
               {this.state.course.title}
            </p>
            <p className= "ltitle">ON CAMPUS : </p>
            <p className="card-text1">
               {this.state.course.campus === true?"Yes":"No"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseCard;
