import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import Navigator from './Navigator'
import image from '../Image/freelancerlogo.png'
import axios from "axios/index";
import BidNow from './BidNow'

class RelevantProjects extends Component {

    constructor() {
        super();
        this.state = ({
            relevantProjects : []
        })
    }

    componentWillMount() {

        const username = ({
            username : localStorage.getItem('username')
        })
        console.log(username);

        axios.post('http://localhost:3001/getrelevantprojects', username, { withCredentials:true } )
            .then((response) => {
                console.log(response.data);
                this.setState({
                    relevantProjects : response.data
                }, ()=> {
                    console.log("After getting relevant projects from DB",this.state.relevantProjects)
                } )
            })
    }

    render() {
        let bar = null;
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

        let relevantProjectsArray = this.state.relevantProjects.map( p => {
            return(
                <tr key={p._id} >
                    <td className="text-left">
                        <b> <Link to={`/projectdetails/${p._id}`}> {p.projectname} </Link>
                        </b> <br/>
                        {p.desc} <br/>
                        {p.skillsreq}
                    </td>
                    <td> <Link to={`/profile/${p.employer}`}> {p.employer} </Link> </td>
                    <td> {p.bids} </td>
                    <td> {p.budget} </td>
                    <td> <BidNow id={p._id}  />
                    </td>
                </tr>
            )
        })

        return (
            <div className="relevantprojects">
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
                                      className="nav-link" > All Projects <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/relevantprojects' className="nav-link" href=""> Relevant Projects </Link>
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
                <br/>
                <div className='container-fluid'>
                <div className="table-responsive table-striped table-bordered">
                    <table className='table table-hover'>
                        <thead className="thead-dark" >
                        <tr>
                            <th className="text-left" >Project Name</th>
                            <th>Employer</th>
                            <th>Number of Bids</th>
                            <th>Budget Range</th>
                            <th>Bid Now</th>
                        </tr>
                        </thead>
                        <tbody>
                        {relevantProjectsArray}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        );
    }
}

export default RelevantProjects;
