import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
//import axios from 'axios';
import { connect } from 'react-redux';

class Userhome extends Component {

    handleSubmit=()=>{
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1" > Home
                        </div>
                        <div className="col-1" > Dashboard
                        </div>
                        {/* <div class="col-md-auto">
                            Variable width content
                        </div> */}
                        <div className="col-4 offset-6">Post a Project</div>
                    </div>
                
                
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {}

export default connect(mapStateToProps,mapDispatchToProps) (Userhome);