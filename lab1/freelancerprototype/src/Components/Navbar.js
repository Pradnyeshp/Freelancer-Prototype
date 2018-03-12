import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="userhome">
                    <div className="container-fluid" >
                        <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand"> Freelancer Logo </a>
                                </div>
                                <div className="col-md-4 ml-auto">
                                <ul className="nav navbar-nav navbar-right ">
                                    <li><Link to="/Profile" className="btn btn-primary"> Profile </Link> &nbsp;
                                <Link to="/" className='btn btn-danger' onClick={this.handleSubmit}>
                                            Sign Out </Link></li>
                                </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <nav class="navbar navbar-inverse">
                        <div class="container-fluid">
                            <ul class="nav navbar-nav"> &nbsp;
                            <li class="active"><a href="#">Home</a> &nbsp; &nbsp;
                                <a href="#">Dashboard</a>
                                </li>
                            </ul>
                            <div class="navbar-btn">
                                <Link to='/AddProject'
                                    className='btn btn-warning' > Post a Project
                            </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Navbar;