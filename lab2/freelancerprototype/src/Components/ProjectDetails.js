import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BidNow from './BidNow';
import ListAllBids from './ListAllBids'
import image from '../Image/freelancerlogo.png'
import SubmissionPanel from "./SubmissionPanel";

class ProjectDetails extends Component {

    constructor() {
        super()
        this.state = ({
            projectid: '',
            title: '',
            desc: '',
            skillsreq: '',
            employer: '',
            worker: '',
            budgetrange: '',
            bids: '',
            avg: '',
            freelancer : '',
        })
    }

    componentWillMount() {
        console.log(this.props.match.params.value);
        this.setState({
            projectid: this.props.match.params.value
        }, () => {
            const pid = {
                projectid: this.state.projectid
            }
            axios.post('http://localhost:3001/getprojectdetails', pid, { withCredentials : true })
                .then( (response) => {
                    console.log("In project details : ", response.data);
                    this.setState({
                        title: response.data[0].projectname,
                        desc: response.data[0].desc,
                        skillsreq: response.data[0].skillsreq,
                        employer : response.data[0].employer,
                        worker : response.data[0].worker,
                        budgetrange: response.data[0].budget,
                        bids : response.data[0].bids,
                        avg : response.data[0].average,
                        // freelancer : response.data[0].freelancer
                    }, () => {
                        console.log("After setstate in getprojectdetails", this.state)
                    })
                })
        })
    }

    renderEmployer () {
        return (
            <div className="userhome">
                <div className="container-fluid" >
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> <img src={image} alt="Freelancer Logo" /> </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to={`/profile/${localStorage.getItem('username')}`}
                                          className="btn btn-primary"> Profile </Link> &nbsp; &nbsp;
                                    <Link to="/signin" className='btn btn-danger'> Sign Out </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div> <br />
                <div className="Projectdetailspage">
                    <div className='container-fluid'>
                        <div className="text-left">
                            <h3> {this.state.title} </h3>
                            <hr />
                            <div id='div1' >
                                <h5>Project Description</h5>
                                <p>
                                    {this.state.desc}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Skills Required</h5>
                                <p>
                                    {this.state.skillsreq}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Budget Range</h5>
                                <p>
                                    {this.state.budgetrange}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Total Bids</h5>
                                <p>
                                    {this.state.bids}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Average Bid Value</h5>
                                <p>
                                    $ {this.state.avg}
                                </p>
                            </div>
                            <div className='form-group'>
                                <button className='btn btn-outline-info' >Make Payment</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderWorker ()  {
        return (
            <div className="userhome">
                <div className="container-fluid" >
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> <img src={image} alt="Freelancer Logo" /> </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to={`/profile/${localStorage.getItem('username')}`}
                                          className="btn btn-primary"> Profile </Link> &nbsp; &nbsp;
                                    <Link to="/signin" className='btn btn-danger'> Sign Out </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div> <br />
                <div className="Projectdetailspage">
                    <div className='container-fluid'>
                        <div className="text-left">
                            <h3> {this.state.title} </h3>
                            <hr />
                            <div id='div1' >
                                <h5>Project Description</h5>
                                <p>
                                    {this.state.desc}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Skills Required</h5>
                                <p>
                                    {this.state.skillsreq}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Budget Range</h5>
                                <p>
                                    {this.state.budgetrange}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Total Bids</h5>
                                <p>
                                    {this.state.bids}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Average Bid Value</h5>
                                <p>
                                    $ {this.state.avg}
                                </p>
                            </div>
                            <hr/>
                            <SubmissionPanel/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderBasic () {
        return (
            <div className="userhome">
                <div className="container-fluid" >
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> <img src={image} alt="Freelancer Logo" /> </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to={`/profile/${localStorage.getItem('username')}`}
                                          className="btn btn-primary"> Profile </Link> &nbsp; &nbsp;
                                    <Link to="/signin" className='btn btn-danger'> Sign Out </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div> <br />
                <div className="Projectdetailspage">
                    <div className='container-fluid'>
                        <div className="text-left">
                            <h3> {this.state.title} </h3>
                            <hr />
                            <div id='div1' >
                                <h5>Project Description</h5>
                                <p>
                                    {this.state.desc}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Skills Required</h5>
                                <p>
                                    {this.state.skillsreq}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Budget Range</h5>
                                <p>
                                    {this.state.budgetrange}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Total Bids</h5>
                                <p>
                                    {this.state.bids}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Average Bid Value</h5>
                                <p>
                                    $ {this.state.avg}
                                </p>
                            </div>
                            <div id='div1' >
                                <BidNow id={this.state.projectid} employer={this.state.employer} />
                            </div>
                        </div>
                        <ListAllBids id={this.state.projectid} employer={this.state.employer} />
                    </div>
                </div>
            </div>
        )
    }

    render() {

        if( this.state.worker === '' || this.state.worker !== localStorage.getItem('username') )
            return this.renderBasic()

        else if(this.state.employer === localStorage.getItem('username'))
            return this.renderEmployer()

        else if(this.state.worker === localStorage.getItem('username'))
            return this.renderWorker()

    }
}

export default ProjectDetails;