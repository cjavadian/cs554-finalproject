import React, {Component} from 'react';
import LoggedinNavbar from '../components/LoggedinNavbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';
class About extends Component{

    render(){
        return(
            <div>
                {/* <Navbar callBackFromParent={this.onLogIn}/> */}
                <LoggedinNavbar/>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-4">
                        <br/>
                            <div className="card">
                                <img className="card-img-top" src="..." alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <Link to="#" class="btn btn-primary">Go somewhere</Link>
                                    </div>
                            </div>
                        </div>
                        <div className="col-8">
                            2 of 2
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}



export default About;