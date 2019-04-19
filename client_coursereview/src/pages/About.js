import React, {Component} from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Firebase from '../components/Firebase/firebase'
class About extends Component{
    constructor(props) {
        super(props);
        this.onLogOut = this.onLogOut.bind(this);
    }
    onLogOut() {
        Firebase.auth().signOut();
    }
    render(){
        return(
            <div>
                <Navbar callBackFromParent={this.onLogIn}/>
                <div className="container">
                <h2>Dashboard</h2>
                <p>Welcome User on home page. You've successfully logged in!</p>
                <button class ="btn btn-outline-success my-2 my-sm-0" onClick={this.onLogOut}>LogOut</button>
                </div>
                <Footer/>
            </div>
        );
    }
}



export default About;