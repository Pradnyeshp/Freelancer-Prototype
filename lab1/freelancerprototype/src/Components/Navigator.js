import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom'
import './navigator.css'

class Navigator extends Component {
    render() {
        return (
            <div className="container-fluid" >
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> Freelancer Logo </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right" >
                                <li>
                                    <Link to="/SignIn"><font color="black"> Login </font></Link>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link to="/SignUp"><font color="black"> Sign Up </font></Link>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link to="/AddProject" className="btn btn-primary"> Post a Project </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
            </div>
        );
    }
}

export default Navigator;