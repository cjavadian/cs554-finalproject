import React from "react";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    return this.props.submitHandler(this.state);
  }
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="/">
            <i className="fas fa-graduation-cap text-primary" />
          </a>
          <form
            className="form-inline ml-auto mr-auto"
            onSubmit={this.handleSubmit}
          >
            <input
              required
              type="text"
              name="userName"
              placeholder="username"
              value={this.state.username}
              className="form-control mr-sm-2"
              onChange={event =>
                this.setState({ username: event.target.value })
              }
            />

            <input
              required
              type="password"
              name="userName"
              placeholder="password"
              value={this.state.password}
              className="form-control mr-sm-2"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />

            <button
              id="loginBtn"
              type="button"
              className="btn btn-outline-primary my-2 my-sm-0"
            >
              Log in
            </button>
          </form>
        </nav>
      </div>
    );
  }
}

export default HomePageContainer;
