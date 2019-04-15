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
    <div>
        <div className="col-sm-6 left d-flex justify-content-center flex-wrap">
            <div className="content">
                <h1>Course Review</h1>
                <div className="signup">
                    <h3>Don't have an account?</h3>
                    <button data-toggle="modal" data-target="#signUpModal" className="btn btn-lg btn-primary btn-block mt-1">Sign Up</button>
                </div>
            </div>
        </div>
        <div className="modal fade" id="signUpModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Account</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
					    <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
					        <div className="form-group">
                                <label htmlFor="user-name" className="col-form-label">Username:</label>
                                <input required minLength="3" name="username" type="text" className="form-control" id="user-name"
                                value={this.state.username}
                                onChange= {event =>this.setState({username:event.target.value})}/>
                                <p className="help_text_style">Username should be at least 3 characters long.</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user-password" className="col-form-label">Password:</label>
                                <input required minLength="8" name="password" type="password" className="form-control" id="user-password"
                                value={this.state.password}
                                onChange={event =>this.setState({ password: event.target.value })}/>
                                <p className="help_text_style">Password should be at least 8 characters long.</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="repeat-user-password" className="col-form-label">Repeat Password:</label>
                                <input required equalto="#user-password" minLength="8" type="password" className="form-control" id="repeat-user-password"
                                value={this.state.password}
                                onChange={event =>this.setState({ password: event.target.value })}/>/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="next-btn" type="button" className="btn btn-primary">Next</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
        );
    }
}

export default Register;