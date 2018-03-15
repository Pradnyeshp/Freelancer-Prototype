import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BidNow from './BidNow';

class ProjectDetails extends Component {

    constructor() {
        super()
        this.state = ({
            projectid: '',
            title: '',
            desc: '',
            skillsreq: '',
            employer: '',
            employee: '',
            budgetrange: '',
            bids: '',
            avg: '',
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
            axios.post('http://localhost:3001/getproject', pid)
                .then( (response) => {
                    console.log("In project details : ",response.data);
                    this.setState({
                        title: response.data[0].Title,
                        desc: response.data[0].Description,
                        skillsreq: response.data[0].SkillsReq,
                        employer : response.data[0].Employer,
                        employee : response.data[0].Employee,
                        budgetrange: response.data[0].BudgetMin,
                        bids : response.data[0].Bids,
                        avg : response.data[0].average
                    })
                })
        })
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
                                <Link to="/signin" className='btn btn-danger' onClick={this.handleSubmit}>
                                            Sign Out </Link></li>
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
                                <h5>Bids</h5>
                                <p>
                                    {this.state.bids}
                                </p>
                            </div>
                            <div id='div1' >
                                <h5>Average Bid</h5>
                                <p>
                                    {this.state.avg}
                                </p>
                            </div>
                            <div id='div1' >
                                <BidNow id={this.state.projectid} />
                            </div>
                        </div>
                        {/* <ListAllBids id={this.state.projectId} owner={this.state.employer} /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectDetails;