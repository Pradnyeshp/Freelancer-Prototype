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

        axios.post('http://localhost:3001/getprojects')
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
                        <b> <Link to={`/ProjectDetails/${p.ProjectId}`}> {p.Title} </Link>
                        </b> <br/> 
                            {p.Description} <br/> 
                            {p.SkillsReq}
                    </td>
                    <td> {p.Name} </td>
                    <td> {p.Bids} </td>
                    <td> {p.BudgetMin} </td>
                    <td> <BidNow id={p.ProjectId} /> 
                     </td>
                </tr>
            )
        })

        return (
            <div className="projects"><br/>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
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