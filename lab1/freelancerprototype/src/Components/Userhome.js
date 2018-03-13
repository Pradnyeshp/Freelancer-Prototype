import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
//import axios from 'axios';
import { connect } from 'react-redux';

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
              
                <nav className="navbar navbar-expand-lg navbar-light bg-light">               
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href=""> Home <span className="sr-only">(current)</span></a> 
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">Dashboard</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                    <Link to='/AddProject' > Post a Project </Link>
                                </button>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{

    }

}

function mapDispatchToProps(dispatch) {
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Userhome);