import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

class Userhome extends Component {

    handleSubmit=()=>{
        sessionStorage.removeItem('username');
    }

    render() {
        return (
            <div className="userhome"><br/>
                <div className="container-fluid" >
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> Freelancer Logo </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/Profile" className="btn btn-primary"> Profile </Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/" className='btn btn-danger' onClick={this.handleSubmit}> 
                                Sign Out </Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <body className="news">
                    <header>
                        <div className="nav">
                            <ul>
                                <li className="Home"><a href="#">Home</a></li>
                                <li className="Dashboard"><a className="active" href="#">Dashboard</a></li>
                                <li></li><li></li>
                                <li className="contact" className="btn btn-warning">
                                    <Link to="/Project" >Post a Project</Link></li>
                            </ul>
                        </div>
                    </header>
                </body>
                
            </div>
        );
    }
}

export default Userhome;