import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './signin.css';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: "",
            signin_success: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignIn = (e) => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(userData);
        this.props.loginUser(userData);
    }

    render() {
        let profile = null;
         
        if (sessionStorage.getItem('username') !== null ) {
            profile = <Redirect to="/Userhome" />
        }

        return (
            <div className="Login">
            {profile}
                <div className="login-page">
                    <div className="form">
                        <form className="login-form" onSubmit={this.handleSignIn.bind(this)}>
                            <input type="text" 
                                placeholder="Email or Username" 
                                value={this.state.username} 
                                onChange={this.handleChange} 
                                className="form-control" 
                                id="txtUserName" 
                                name="username" required />
                            <input type="password" 
                                placeholder="Password" 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                                className="form-control" 
                                id="txtPassword" 
                                name="password" required/>
                            <button className="form-control btn btn-primary" 
                                value="Login">login
                            </button>
                            <p className="message"> 
                                Don't have an account? 
                                <Link to="/SignUp"> 
                                    Create an account 
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        password: state.password,
        signin_success: state.signin_success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (userData) => {
            console.log("In Login dispatch", userData);
            axios.post('http://localhost:3001/signin', userData)
                .then((response) => {
                    console.log(response.data[0].Username);
                    console.log("After login dispatch", response.data);
                    if (response.data === 'ERROR')
                        dispatch({ type: 'ERROR', payload: response })
                    else {                        
                        sessionStorage.setItem('username', response.data[0].Username)
                        console.log(sessionStorage.username);
                        dispatch({ type: 'SIGNIN_SUCCESS', payload: response })
                    }
                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);