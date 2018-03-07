import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './signin.css';
import { Link } from 'react-router-dom';


class Signup extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    handleChange = (events) => {

        this.setState({
            [events.target.name]: events.target.value
        })

    }

    createUser = (events) => {
        events.preventDefault();

        const userDetails = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        this.props.insertUser(userDetails);
    }

    render() {
        let validUser = null;

        if (this.props.signupSuccess === 'SIGNUP_SUCCESS') {
            validUser = <Redirect to='/SignIn' />
        }

        return (
            <div className="signup">
                {validUser}
                <div id="mainDiv">
                    <div className="center">
                        <div><br />
                        </div>
                        <div id="divSignupForm">
                            <div className="form">
                                <h1> Freelancer logo </h1>
                                <form className="login-form" onSubmit={this.createUser}>
                                    <input type="text" onChange={this.handleChange} className="form-control"
                                        id="txtemail" placeholder="Enter Email" name="email" required />
                                    <input type="text" onChange={this.handleChange} className="form-control"
                                        id="txtUserName" placeholder="Enter Username" name="username" required/>
                                    <input type="password" onChange={this.handleChange} className="form-control"
                                        id="txtPassword" placeholder="Enter Password" name="password" required />
                                    <button className="form-control btn btn-primary" id="btnSubmitSignUpForm" 
                                        value="Create Account">Create Account</button>
                                    <p className="message">Already have an account <Link to='/SignIn'>Sign In</Link></p>
                                </form>
                            </div>
                        </div>
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
        email: state.email,
        signupSuccess: state.signup_success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        insertUser: (newUser) => {
            console.log(newUser);
            axios.post('http://localhost:3001/signup', newUser)
                .then((response) => {
                    console.log(response);
                    dispatch({ type: 'SIGNUP_SUCCESS', payload: response })
                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);