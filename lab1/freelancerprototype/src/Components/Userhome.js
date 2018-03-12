import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
//import axios from 'axios';
import { connect } from 'react-redux';
import Navbar from './Navbar';

class Userhome extends Component {

    handleSubmit = () => {
        sessionStorage.removeItem('username');
    }

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
                                <Link to="/" className='btn btn-danger' onClick={this.handleSubmit}> 
                                Sign Out </Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav"> &nbsp;

                            <li className="active"><Link to="#">Home</Link> &nbsp; &nbsp;
                                <Link to="#">Dashboard</Link>
                            </li>
                        </ul>
                        <div className="navbar-btn">
                            <Link to='/AddProject' 
                                className='btn btn-warning' > Post a Project
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps) (Userhome);