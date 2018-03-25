import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import Projects from './Projects';
import Navigator from './Navigator'
import image from '../Image/freelancerlogo.png'

class Userhome extends Component {

    handleSubmit = () => {
        localStorage.removeItem('username');
    }

    render() {
        let bar = null

        if (localStorage.getItem('username') === null) {
            bar = ( <Navigator /> )
        }
        else {
            bar = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to={`/profile/${localStorage.getItem('username')}`}
                        className="btn btn-primary"> Profile </Link> &nbsp;
                    <Link to="/signin"
                        className='btn btn-danger' onClick={this.handleSubmit}>
                        Sign Out </Link>
                </li>
            </ul>
            )
        }

        return (
            <div className="userhome">
                <div className="container-fluid" >
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> <img src={image} alt="Freelancer Logo" /> </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                {bar}
                            </ul>
                        </div>
                    </nav>
                </div> <br/>
            
                <nav className="navbar navbar-expand-lg navbar-light bg-light">               
                    <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/userhome' 
                                    className="nav-link" > Home <span className="sr-only">(current)</span>
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard' className="nav-link" href=""> Dashboard </Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                    <Link to='/addproject' > Post a Project </Link>
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
    return{

    }

}

function mapDispatchToProps(dispatch) {
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Userhome);