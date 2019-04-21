import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Firebase from './Firebase/firebase';
import { FaUser, FaLock, FaAt, FaAddressBook, FaSteamSymbol } from 'react-icons/fa';
import {graphql,compose} from "react-apollo";
import {addUserMutation} from "../queries/queries";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            show: false,
            error: {
                message: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    async onLogin(e) {
        e.preventDefault();
        try {
            const user = await Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log(user);
        }catch(error) {
            console.log(error);
            this.setState({error:error})
        }
    }

    async onSignup(e) {
        e.preventDefault();
        try {
            const user = await Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            this.props.addUserMutation({
                variables:{
                    first_name: this.state.firstname,
                    last_name: this.state.lastname,
                    user_name: this.state.username,
                    email: this.state.email
                }
            });
            console.log(user);
            window.location.reload();
            //this.props.history.push("/")

        }catch(error) {
            console.log(error);
            this.setState({error:error})
        }
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
                            <div class="divider" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" name="signup" id="signup"
                                data-toggle="modal" data-target="#modalRegisterForm" onClick={(event) => { event.preventDefault() }}>SignUp</button>
                            <div className="modal fade" id="modalRegisterForm" tabIndex="-1" role="dialog"
                                aria-labelledby="myModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header btn-outline-success text-center">
                                            <h4 className="modal-title w-100 font-weight-bold">Sign up</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body mx-3">
                                            <div class="registration-form">
                                                <form onSubmit={this.onSignup}>
                                                    <div class="form-group mb-4">
                                                        <FaUser />
                                                        <input required type="text" id="firstname" className="form-control validate" minLength={3} placeholder="First Name" value={this.state.firstname} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group mb-4">
                                                        <FaUser />
                                                        <input required type="text" id="lastname" className="form-control validate" minLength={3} placeholder="Last Name" value={this.state.lastname} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group mb-4">
                                                        <FaAddressBook />
                                                        <input required type="text" id="username" className="form-control validate" minLength={3} placeholder="username" value={this.state.username} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group mb-4">
                                                        <FaAt />
                                                        <input required type="email" id="email" className="form-control validate" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group mb-4">
                                                        <FaLock />
                                                        <input required type="password" id="password" className="form-control validate" minLength={6} placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                                    </div>
                                                    <div className="modal-footer d-flex justify-content-center">
                                                        <div className="form-group mb-4">
                                                            <button className="btn btn-outline-success" type="submit" >Sign up</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </nav>
                <div id="indexError">{this.state.error.message}</div>

            </div>

        );
    }
}


export default compose(graphql(addUserMutation,{name:"addUserMutation"}))(Navbar);