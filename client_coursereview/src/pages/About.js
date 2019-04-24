import React, { Component } from "react";
import LoggedinNavbar from "../components/LoggedinNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.js";
import './About.css';
import UserStatisticsGraph from '../components/UserStatisticsGraph';
class About extends Component {
  render() {
    return (
      <div>
        {/* <Navbar callBackFromParent={this.onLogIn}/> */}
        <LoggedinNavbar />
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-4">
              <br />
              <div className="userimage">
              <div className="card">
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="#" className="btn btn-primary">
                    Go somewhere
                  </Link>
                </div>
              </div>
              </div>
            </div>
            <div className="col-8">
              <div className="col-8">
              <div className="userprofilestat">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">User's Course Review Statisitics</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <UserStatisticsGraph/>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  </div>
                </div>
              </div>
              <div className="col-8">
              <div className="useruseful">
              <div className="card ">
                  <div className="card-body">
                    <h5 className="card-title">Useful Statisitics</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <UserStatisticsGraph/>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
