import React, { Component } from "react";
import Stevens from '../sit-logo.jpg'
import './CourseCard.css';

class CourseCard extends Component {
  render() {
    return (
      <div>
        <div className="card" >
          <img className="card-img-top courseimg" src={Stevens} alt="card" />
          <div className="card-body">
          <p className="card-text">
             Course Id : 
            </p>
            <p className="card-text">
             Course Title : 
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseCard;
