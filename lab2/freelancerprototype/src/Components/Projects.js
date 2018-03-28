import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom' ;
import BidNow from './BidNow'

class Projects extends Component {
    
    constructor() {
        super();
        this.state = ({
            projects : []
        })
    }

    componentWillMount() {

        axios.post('http://localhost:3001/getprojects', null , { withCredentials : true } )
            .then((response) => {
                console.log("Response from DB", response.data);
                this.setState ({
                    projects : response.data
                }, () => {
                    console.log("After Component will mount in getprojects", this.state.projects);
                })
            }
        )
    }

    render() {
        // let projectsArray = [];
        let projectsArray = this.state.projects.map( p => {
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
            <div className="projects"><br/>
                <div className="table-responsive">
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
                                {projectsArray}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Projects;