import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import Firebase from '../components/Firebase/firebase'
import { FaUser} from 'react-icons/fa';
import EditProfile from '../pages/EditUserProfile';
import { withRouter } from "react-router";
import "./LoggedinNavbar.css";

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
                <h1 className="navbar-brand">CourseReview</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/dashboard">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/courses">Courses</Link>
                    </li>
                    <li className="nav-item active">
                    <Link className="nav-link" to="/chat">Chat</Link>
                    </li>
                    <div class="dropdown">
                        <button aria-label="FaUser" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FaUser />
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="/editprofile">Edit Profile</a>
                            <a class="dropdown-item" href="/editpassword">Update Password</a>
                            <a class="dropdown-item" href="/" onClick={this.onLogOut}>Logout</a>
                        </div>
                    </div>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <Link className="btn btn-outline-success my-2 my-sm-0" to="/courses">Search Courses</Link>
                </form>
            </div>
        </nav>
    </div>

</div>

        );
    }
}

export default withRouter (LoggedinNavbar);
