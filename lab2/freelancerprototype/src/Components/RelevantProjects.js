import React, { Component } from 'react';
import './userhome.css'
import { Link } from 'react-router-dom'
import axios from "axios/index";
import BidNow from './BidNow'
import NavigationBar from "./NavigationBar";
import url from '../serverurl';

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

        axios.post(url + '/getrelevantprojects', username, { withCredentials:true } )
            .then((response) => {
                console.log(response.data);
                this.setState({
                    relevantProjects : response.data.finalRelevantProjectsArray
                }, ()=> {
                    console.log("After getting relevant projects from DB",this.state.relevantProjects)
                } )
            })
    }

    render() {

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
                <NavigationBar/>
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
