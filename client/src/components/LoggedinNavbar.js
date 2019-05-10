import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import Firebase from '../components/Firebase/firebase'
import { FaUser} from 'react-icons/fa';
import EditProfile from '../pages/EditUserProfile';
import { withRouter } from "react-router";

class LoggedinNavbar extends Component {
    constructor(props) {
        super(props);
        this.onLogOut = this.onLogOut.bind(this);
    }

    
      onLogOut() {
        Firebase.auth().signOut();
        this.props.history.push("/")

    }

    render() {
        return (
            <div>
                <div>
                <nav className="navbar navbar-expand-lg  navbar-dark  justify-content-end">
                <Link className="navbar-brand" to="#">CourseReview</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/About">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/course">CourseList</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FaUser/>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/about">View Profile</Link>
                            <Link className="dropdown-item" to="/editprofile" onClick={this.editProfile}>Edit Profile</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#" onClick={this.onLogOut}>LogOut</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        {/* <Link className="nav-link " to="#">Disabled</Link> */}
                        {/* <button className ="btn btn-outline-success my-2 my-sm-0" onClick={this.onLogOut}>LogOut</button> */}
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/> */}
                    <Link className="btn btn-outline-success my-2 my-sm-0" to="/shows">Search</Link>
                </form>
            </div>
        </nav>
    </div>

</div>

        );
    }
}

export default withRouter (LoggedinNavbar);
