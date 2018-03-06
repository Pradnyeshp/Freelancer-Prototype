import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Signup extends Component {
    
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: ""
        }

        this.handleChange = this.handleChange.bind(this);
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

            <div className="Signup">
                {validUser}
                <div id="mainDiv">
                    <div className="center">
                        <div>
                            <h1> Freelancer logo here </h1>
                            <h3> SignUp for free today </h3>
                            <hr />
                        </div>
                        <div id="divSignupForm">
                            <form onSubmit={this.createUser.bind(this)}>
                                <div className="form-group">
                                    <input type="email" ref="email" onChange={this.handleChange} className="form-control" id="txtemail" placeholder="Enter Email" name="email" />
                                </div>
                                <div className="form-group">
                                    <input type="text" ref="username" onChange={this.handleChange} className="form-control" id="txtUserName" placeholder="Enter Username" name="username" />
                                </div>
                                <div className="form-group">
                                    <input type="password" ref="password" onChange={this.handleChange} className="form-control" id="txtPassword" placeholder="Enter Password" name="password" />
                                </div>
                                <div className="form-group">
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="form-control btn btn-primary" id="btnSubmitSignUpForm" value="Create Account" />
                                </div>

                            </form>
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