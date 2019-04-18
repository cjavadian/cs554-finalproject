import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Firebase from './Firebase/firebase';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error :{
                message:''
            }
        };
       // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]:event.target.value});
    }

    onLogin(e) {
        e.preventDefault();
        Firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((u)=>{
        }).catch((error) => {
            console.log(error);
            this.setState({error})
          });
      }

      onSignup(e){
        e.preventDefault();
        Firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then((u)=>{
        }).then((u)=>{console.log(u)})
        .catch((error) => {
            console.log(error);
            this.setState({error})
          })
      }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     this.props.callBackFromParent(this.state.username,this.state.password);
    // }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg  navbar-dark bg-dark justify-content-end">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="#">Course Review</Link>
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <form className="form-inline my-2 my-lg-0 justify-content-end" >
                            <input className="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username" id="username" value={this.state.username} onChange={this.handleChange} />
                            <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" id="password" value={this.state.password} onChange={this.handleChange} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onLogin}>Login</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onSignup}>SignUp</button>
                        </form>
                    </div>
                </nav>
                <div>{this.state.error.message}</div>
            </div>

        );
    }
}


export default Navbar;