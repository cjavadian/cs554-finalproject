import React, { Component } from 'react'
import { Redirect } from 'react-router'

export class isAuthenticated extends Component {
    state = {}

    componentWillMount() {
        this.checkAuth()
    }

    checkAuth = () => {
        // check if a user is logged into firebase
        // check if there is a "user" key in localstorage
        const userKey = localStorage.getItem("user")
        console.log("userKey", userKey)
        if (userKey) {
            // user is logged in
            this.setState({ isLoggedIn: true })
            console.log("is authenticated!")
        } else {
            // use is not logged in
            this.setState({ isLoggedIn: false })
        }
    }


    render() {
        const { isLoggedIn } = this.state
        if (isLoggedIn === true) {
            return <>
                {this.props.children}
            </>
        } else if (isLoggedIn === false) {
            return <Redirect to="/" />
        }
    }
}

export default isAuthenticated
