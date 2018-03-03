import React, { Component } from 'react';
import './App.css';
import SignIn from './SignIn'
import SignUp from './SignUp'
import {Link} from 'react-router-dom'

class Navigator extends Component {
    render() {
        return (
            <div className="container-fluid" >
                <nav className="navbar navbar-inverse" >
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Freelancer Logo</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right" styles={{ float: 'right', paddingRight: '5px' }}>
                            <li><Link to="/SignIn"> Login </Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/SignUp"> Sign Up </Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="#" className="btn btn-primary"> Post a Project </Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigator;