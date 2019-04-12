import React from 'react';

class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.state);
    }
    render() {
        return (
            <form className="user_form" onSubmit={this.handleSubmit}>
            <label>
                User Name: 
                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} />
            </label>
            <label>
                Password: 
                <input type="password" name="userName" value={this.state.password} onChange={this.handleChange} />
            </label>
            </form>
        )
    }
}

export default HomePageContainer;