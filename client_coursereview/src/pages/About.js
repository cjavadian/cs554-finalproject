import React, {Component} from 'react';
import LoggedinNavbar from '../components/LoggedinNavbar';
import Footer from '../components/Footer.js';
class About extends Component{

    render(){
        return(
            <div>
                {/* <Navbar callBackFromParent={this.onLogIn}/> */}
                <LoggedinNavbar/>
                <div className="container">
                <h2>Dashboard</h2>
                <p>Welcome User on home page. You've successfully logged in!</p>
                </div>
                <Footer/>
            </div>
        );
    }
}



export default About;