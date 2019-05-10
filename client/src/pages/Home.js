import React, {Component} from 'react';
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js';

class Home extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <div className = "home-container">
                <h2>Welcome to Home</h2>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>
                    <div className = "carousel-container">
                        <div class="carousel-inner bg-info">
                            <div class="carousel-item active">
                            <img class="h-100 w-100" src={require("../images/stevens.jpg")} alt="First slide" />
                            </div>
                            <div class="carousel-item">
                            <img class="h-100 w-100" src={require("../images/davis.jpg")} alt="Second slide" />
                            </div> 
                            <div class="carousel-item">
                            <img class="h-100 w-100" src={require("../images/logo.jpg")} alt="Third slide" />
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
                </div>
                </div>
            <Footer/>
            </div>
        );
    }
}

export default Home;