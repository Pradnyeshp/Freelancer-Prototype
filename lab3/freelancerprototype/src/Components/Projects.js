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

        axios.post('http://localhost:3001/project/getprojects')
            .then((response) => {
                console.log(response.data);
                this.setState ({
                    projects : response.data
                }, () => {
                    console.log("After Component will mount in getprojects", this.state.projects);
                    
                })
            })

    }

    handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value);        
        this.setState({
            [e.target.name] : [e.target.value]
        }, () => {
            console.log(this.state);       
        })
    }
    
    render() {
        let projectsArray = [];
        projectsArray = this.state.projects.map( p => {
            return(
                <tr key={p.ProjectId} >
                    <td className="text-left"> 
                        <b> <Link to={`/projectdetails/${p.id}`}> {p.title} </Link>
                        </b> <br/> 
                            {p.description} <br/>
                            {p.skills_required}
                    </td>
                    <td> <Link to={`/projectdetails/${p.id}`}> {p.employer} </Link> </td>
                    <td> {p.number_of_bids} </td>
                    <td> {p.budget_range} </td>
                    <td> <BidNow id={p.id}  />
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