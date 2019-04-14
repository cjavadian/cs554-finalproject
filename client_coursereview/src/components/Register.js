import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            username:'',
            password:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.state);
      }
    
    render() {
        return(
        <div className="col-sm-6 left d-flex justify-content-center flex-wrap">
            <div className="content">
                <h1>Course Review</h1>
                <div className="signup">
                    <h3>Don't have an account?</h3>
                    <button data-toggle="modal" data-target="#signUpModal" className="btn btn-lg btn-primary btn-block mt-1">Sign Up</button>
                </div>
            </div>
        </div>
        );
    }
}

export default Register;