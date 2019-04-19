import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Firebase from './Firebase/firebase';
import SignUp from '../components/SignUp';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            show:false,
            error :{
                message:''
            }
        };
       
        this.onLogin = this.onLogin.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    showModal = ()=>{
        this.setState({
        show:!this.state.show
        });
    }
   

    onLogin(e) {
        e.preventDefault();
        Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        
        }).catch((error) => {
            console.log(error);
            this.setState({error})
          });
      }
      onSignup(e){
        e.preventDefault();
        Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
           
        }).then((u)=>{console.log(u)
            this.props.history.push("/about")})
        .catch((error) => {
            console.log(error);
            this.setState({error})
          })
      }
      
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg  navbar-dark  justify-content-end">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="#">Course Review</Link>  
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <form className="form-inline my-2 my-lg-0 justify-content-end" >
                            <input className="form-control mr-sm-2" type="text" placeholder="Email" aria-label="Username" id="email" value={this.state.email} onChange={this.handleChange} />
                            <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" id="password" value={this.state.password} onChange={this.handleChange} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onLogin}>Login</button>
                            <div class="divider"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="button" name="signup" id="signup"
                            data-toggle="modal" data-target="#modalRegisterForm" onClick={this.showModal}>SignUp</button>
                            <SignUp  show={this.state.show} onClick={this.onSignup}/>
                        </form>
                    </div>
                </nav>
                <div id="indexError">{this.state.error.message}</div>
                
            </div>

        );
    }
}


export default Navbar;