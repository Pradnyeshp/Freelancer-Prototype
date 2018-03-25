import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './navigator.css'
import {Redirect} from 'react-router'
import image from '../Image/freelancerlogo.png'
import { Helmet } from 'react-helmet'

class Navigator extends Component {
    render() {
        let profile = null;

        if (localStorage.getItem('username') !== null) {
            profile = <Redirect to="/userhome" />
        }

        return (
            <div className="container-fluid" > <br/>
                {profile}
                    <nav className="navbar navbar-inverse" >
                    <Helmet>
                        <style>{'body { background-color: lightblue; }'}</style>
                    </Helmet>
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> <img src={image} alt="Freelancer Logo"/> </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right" >
                                <li>
                                <Link to="/signIn"><font color="black">Log In</font></Link> &nbsp;&nbsp;&nbsp;           
                                <Link to="/signUp"><font color="black">Sign Up</font></Link> &nbsp;&nbsp;&nbsp;
                                <Link to="/addproject" className="btn btn-primary"> Post a Project </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                <div className='ftext' >
                    <div className='text-left' ><br /><br /><br /><br /><br />
                        <h1> Hire expert freelancers for any </h1>
                        <h1> job, online </h1> <br/>
                        <h6> Millions of small businesses use Freelancer to turn their ideas </h6>
                        <h6> into reality. </h6>
                        </div>
                </div>
            </div>
        );
    }
}

export default Navigator;