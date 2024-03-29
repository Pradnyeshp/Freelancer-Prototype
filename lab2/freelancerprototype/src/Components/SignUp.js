import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './signin.css';
import { Link } from 'react-router-dom';
import image from '../Image/freelancerlogo.png'
import { Helmet } from 'react-helmet'
import url from '../serverurl';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            name : "",
            username: "",
            password: "",
            email: "",
            error : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    handleChange = (events) => {

        this.setState({
            [events.target.name]: events.target.value
        })

    };

    createUser = (events) => {
        events.preventDefault();

        const userDetails = {
            name : this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };
        this.props.insertUser(userDetails);
    };

    render() {
        let validUser = null;

        if (this.props.signupSuccess === 'SIGNUP_SUCCESS') {
            validUser = <Redirect to='/SignIn' />
        }

        return (
            <div className="signup">
                {validUser}
                <div id="mainDiv">
                    <Helmet>
                        <style>{'body { background-color: rgb(220,220,220); }'}</style>
                    </Helmet>
                    <div className="center">
                        <div><br />
                        </div>
                        <div id="divSignupForm">
                            <div className="form">
                                <h1> <img src={image} alt="Freelancer Logo" /> <br/> <br/> </h1>
                                <div className='alert-danger'>
                                    {this.props.error}
                                </div>
                                <br/>
                                <form className="login-form" onSubmit={this.createUser}>
                                    <input type="text" 
                                        onChange={this.handleChange} 
                                        className="form-control"
                                        id="txtFirstName" 
                                        placeholder="Name" 
                                        name="name" required />
                                    <input type="email" 
                                        onChange={this.handleChange} 
                                        className="form-control"
                                        id="txtemail" 
                                        placeholder="Email" 
                                        name="email" required />
                                    <input type="text" 
                                        onChange={this.handleChange} 
                                        className="form-control"
                                        id="txtUserName" 
                                        placeholder="Username" 
                                        name="username" required/>
                                    <input type="password" 
                                        onChange={this.handleChange} 
                                        className="form-control"
                                        id="txtPassword" 
                                        placeholder="Password" 
                                        name="password" required />
                                    <button className="form-control btn btn-primary" 
                                        id="btnSubmitSignUpForm" 
                                        value="Create Account"> Create Account
                                    </button>
                                    <dt className="message"> Already have an account &nbsp; 
                                        <Link to='/SignIn'> Sign In </Link>
                                    </dt>
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
        name : state.name,
        username: state.username,
        password: state.password,
        email: state.email,
        signupSuccess: state.signup_success,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        insertUser: (newUser) => {
            console.log(newUser);
            axios.post( url + '/signup', newUser)
                .then((response) => {
                    if( response.data === 'Username') {
                        // alert("Username already exists, try your luck with another")
                        dispatch({ type: 'SIGNUP_ERROR', payload: response })
                    }
                    else {
                        alert("Account Created Successfully");
                        console.log(response.data);
                        dispatch({ type: 'SIGNUP_SUCCESS', payload: response })
                    }
                }
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);