import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Projects from './Projects';

class ProjectDetails extends Component {
    render() {
        return (
                <div className="userhome">
                    <div className="container-fluid" >
                        <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand"> Freelancer Logo </a>
                                </div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/Profile" className="btn btn-primary"> Profile </Link> &nbsp;
                                <Link to="/signin" className='btn btn-danger' onClick={this.handleSubmit}>
                                            Sign Out </Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div> <br />
                
                

            </div>
        );
    }
}

export default ProjectDetails;