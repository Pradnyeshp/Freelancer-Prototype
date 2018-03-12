import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
//import axios from 'axios';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Projects from './Projects';

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
                </div> <br/>
              
                <nav class="navbar navbar-expand-lg navbar-light bg-light">               
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#"> Home <span class="sr-only">(current)</span></a> 
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Dashboard</a>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                                    <Link to='/AddProject' > Post a Project </Link>
                                </button>
                        </form>
                    </div>
                </nav>
                <Projects/>
            </div>
        );
    }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps) (Userhome);