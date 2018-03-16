import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './navigator.css'
import {Redirect} from 'react-router'

class Navigator extends Component {
    render() {
        let profile = null;

        if (sessionStorage.getItem('username') !== null) {
            profile = <Redirect to="/userhome" />
        }

        return (
            <div className="container-fluid" > <br/>
                {profile}
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> Freelancer Logo </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right" >
                                <li>
                                    <Link to="/signIn"><font color="black"> Login </font></Link> &nbsp;
                           
                                    <Link to="/signUp"><font color="black"> Sign Up </font></Link> &nbsp;

                                    <Link to="/addproject" className="btn btn-primary"> Post a Project </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
            </div>
        );
    }
}

export default Navigator;