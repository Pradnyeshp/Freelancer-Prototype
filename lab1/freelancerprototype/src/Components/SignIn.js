import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: ""
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
        if (this.props.loginData !== null) {
            profile = <Redirect to="/Profile" />
        }

        return (
            <div className="Login">
                {profile}
                <div id="mainDiv">
                    <div className="center">
                        <div>
                            <h1> Login  </h1>
                        </div>
                        <div id="divLoginForm">
                            <form onSubmit={this.handleSignIn.bind(this)}>
                                <div className="form-group">
                                    <input type="text" value={this.state.username} onChange={this.handleChange} className="form-control" id="txtUserName" placeholder="Email or Username" ref="uname" name="username" required />
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="txtPassword" placeholder="Enter Password" ref="pass" name="password" required />
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="form-control btn btn-primary" id="btnSubmitSignUpForm" value="Login" />
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
        loginData: state.login_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (userData) => {
            console.log("In Login dispatch", userData);
            axios.post('http://localhost:3001/signin', userData)
                .then((response) => {
                    //console.log(response);
                    console.log("After login dispatch", response.data);
                    if (response.data === 'ERROR')
                        dispatch({ type: 'ERROR', payload: response })
                    else {
                        //sessionStorage.setItem('username', response.data[0].username)
                        dispatch({ type: 'SIGNIN_SUCCESS', payload: response })
                    }

                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);