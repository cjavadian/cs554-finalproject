import React, { Component } from 'react'
import {FaUser,FaLock,FaAt,FaAddressBook } from 'react-icons/fa';


export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            username: '',
            email:'',
            password: '',
            confirmpassword:'',
            show:false,
            error :{
                message:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(event) {
        this.setState({[event.target.id]:event.target.value});
    }

    onSignup =(e) =>{
        this.props.onSignup && this.props.onSignup(e)
    }
    render() {
        const isInvalid = password!==confirmpassword;
    return (
      <div>
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
                    <form>
                        <div className="md-form mb-4">
                            <FaUser/>
                            <input required type ="text" id="firstname" className="form-control validate" placeholder="First Name" value={this.state.firstname} onChange={this.handleChange} />
                        </div>
                        <div className="md-form mb-4">
                            <FaUser/>
                            <input required type="text" id="lastname" className="form-control validate" placeholder="Last Name" value={this.state.lastname} onChange={this.handleChange}/>
                        </div>
                        <div className="md-form mb-4">
                            <FaAddressBook/>
                            <input required type="text" id="username" className="form-control validate" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
                        </div>
                        <div className="md-form mb-4">
                            <FaAt/>
                            <input required type="email" id="email" className="form-control validate" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="md-form mb-4">
                            <FaLock/>
                            <input required type="password" id="password" className="form-control validate" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                        <div className="md-form mb-4">
                            <FaLock/>
                            <input required type="password" id="confirmpassword" className="form-control validate" placeholder="Password" value={this.state.confirmpassword} onChange={this.handleChange}/>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className="btn btn-outline-success" disabled={isInvalid} onClick = {this.onSignup}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default SignUp
