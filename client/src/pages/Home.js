import React, {Component} from 'react';
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js';
class Home extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <div className = "container">
                <h2>Welcome to Home</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum ipsum purus, eget accumsan nibh ultrices et. Sed molestie consequat elit a tempus. Phasellus malesuada tincidunt malesuada. Suspendisse scelerisque tellus in justo rhoncus vehicula. Suspendisse id blandit leo. Ut et purus massa. Suspendisse dapibus placerat metus, in feugiat libero molestie nec. Nulla id turpis tincidunt, dapibus magna vitae, pretium quam. Vestibulum non mollis quam, quis molestie leo. Duis vitae porttitor mauris.</p>
                </div>
            <Footer/>
            </div>
        );
    }
}

export default Home;