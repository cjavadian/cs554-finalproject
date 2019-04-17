import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.callBackFromParent(this.state.username,this.state.password);
    }
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
                            <input className="form-control mr-sm-2" type="text" placeholder="Username" aria-label="Username" value={this.state.username} onChange={event => this.setState({ username: event.target.value })} />
                            <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Login</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">SignUp</button>
                        </form>

                    </div>
                </nav>
            </div>

        );
    }
}


export default Navbar;