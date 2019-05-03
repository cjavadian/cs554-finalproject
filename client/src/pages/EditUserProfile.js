import React, { Component } from 'react'

export class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            password:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleUpdate(event) {
        
    }
  render() {
    return (
      <div>
          <form onSubmit={this.handleUpdate}>
            <div className="form-group">
            <label for="firstname">First Name</label>
            <input type="text" className="form-control" id="firstname" aria-describedby="firstName" placeholder="Enter First name" value={this.state.firstname} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
            <label for="lastname">Last Name</label>
            <input type="text" className="form-control" id="lastname" aria-describedby="lastName" placeholder="Enter Last name" value={this.state.lastname} onChange={this.handleChange}/>
            </div>
            <div class="form-group">
            <label for="email">Email address</label>
            <input read-only type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />  
            </div>
            <div className="form-group">
            <label for="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default EditUserProfile
