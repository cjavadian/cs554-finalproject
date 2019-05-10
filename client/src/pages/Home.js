import React, {Component} from 'react';
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js';
import "./Home.css";
class Home extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <div className = "container">
                <h2>Welcome to Home</h2>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img class="d-block w-100" src={require("../images/stevens.jpg")} alt="First slide" />
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src={require("../images/gate.jpg")} alt="Second slide" />
                        </div> 
                        <div class="carousel-item">
                        <img class="d-block w-100" src={require("../images/logo.jpg")} alt="Third slide" />
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src={require("../images/seal.jpeg")} alt="Fourth slide" />
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum ipsum purus, eget accumsan nibh ultrices et. Sed molestie consequat elit a tempus. Phasellus malesuada tincidunt malesuada. Suspendisse scelerisque tellus in justo rhoncus vehicula. Suspendisse id blandit leo. Ut et purus massa. Suspendisse dapibus placerat metus, in feugiat libero molestie nec. Nulla id turpis tincidunt, dapibus magna vitae, pretium quam. Vestibulum non mollis quam, quis molestie leo. Duis vitae porttitor mauris.</p>
                </div>
            <Footer/>
            </div>
        );
    }
}

export default Home;