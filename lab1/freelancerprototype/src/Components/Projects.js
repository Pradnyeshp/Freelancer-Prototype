import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom' ;

class Projects extends Component {
    
    constructor() {
        super();
        this.state = ({
            projects : [] 
        })
    }

    componentWillMount() {
        // let id = this.props.id
        axios.post('http://localhost:3001/getprojects')
            .then((response) => {
                console.log(response.data);
                this.setState ({
                    projects : response.data
                }, () => {
                    console.log("After Component will mount", this.state.projects);
                })
            })

    }
    
    render() {

        let projects = this.state.projects.map(project => {
            return(
                <tr key={project.ProjectId} >
                    <td className="text-left"> 
                        <b> <Link to='/ProjectDetails'> {project.Title} </Link>
                        </b> <br/> 
                            {project.Description} <br/> 
                            {project.SkillsReq}
                    </td>
                    <td> {project.Name} </td>
                    <td> {project.Bids} </td>
                    <td> {project.BudgetMin} </td>
                    <td> <button className="btn btn-success">Bid Now</button> </td>
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
                                {projects}
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}



export default Projects;