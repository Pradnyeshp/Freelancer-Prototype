import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './signin.css';
import { Link } from 'react-router-dom';
import image from '../Image/freelancerlogo.png'
import { Helmet } from 'react-helmet'
import swal from 'sweetalert';


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
    };

    handleSignIn = (e) => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(userData);

        axios.post('http://localhost:3001/user/login', userData)
            .then((response) => {
                    console.log(response);
                    console.log("After login dispatch", response.data);
                    if (response.data.length === 0 ) {
                        swal( "User Not Found" , "Please Check Username and Password", "error" );
                    }
                    else {
                        console.log("User Found in Database");
                        localStorage.setItem('username', response.data[0].username);
                        localStorage.setItem('userid', response.data[0].id );
                        console.log(localStorage.username);
                        this.props.history.push('/userhome');
                    }
                }
            );
    };

    render() {
        let profile = null;
         
        if (localStorage.getItem('username') !== null ) {
            profile = <Redirect to="/Userhome" />
        }

        return (
            <div className="Login">
            {profile}
                <div className="login-page">
                    <Helmet>
                        <style>{'body { background-color: rgb(220,220,220); }'}</style>
                    </Helmet>
                    <div className="form">
                        <h1><img src={image} alt="Freelancer Logo" /><br /><br /> </h1>
                        <form className="login-form" onSubmit={this.handleSignIn.bind(this)}>
                            <input type="text" 
                                placeholder="Username" 
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
                            <dt className="message"> 
                                Don't have an account? &nbsp; 
                                <Link to="/SignUp"> 
                                Sign Up Here 
                                </Link>
                            </dt>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         username: state.username,
//         password: state.password,
//         signin_success: state.signin_success
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         loginUser: (userData) => {
//             console.log("In Login dispatch", userData);
//             axios.post('http://localhost:3001/signin', userData)
//                 .then((response) => {
//                     console.log(response);
//
//                     console.log("After login dispatch", response.data);
//                     if (response.data === 'ERROR') {
//                         alert("Error In Logging In, Please Check Username and Password");
//                         dispatch({ type: 'ERROR', payload: response })
//                     }
//
//                     else {
//                         localStorage.setItem('username', response.data[0].Username)
//                         localStorage.setItem('userid', response.data[0].UserId )
//                         console.log(localStorage.username);
//                         dispatch({ type: 'SIGNIN_SUCCESS', payload: response })
//                     }
//                 }
//             );
//         }
//     }
// }

export default SignIn;