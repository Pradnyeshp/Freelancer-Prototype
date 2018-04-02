import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import Projects from './Projects';
import Navigator from './Navigator'
import image from '../Image/freelancerlogo.png'
import NavigationBar from "./NavigationBar";
// import axios from 'axios'

class Userhome extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e) => {
        e.preventDefault()
        window.location.reload(true)
    }

    handleSubmit = () => {
        localStorage.removeItem('username');
    }

    render() {
        let bar = null
        if (localStorage.getItem('username') === null ) {
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
                <NavigationBar/>
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