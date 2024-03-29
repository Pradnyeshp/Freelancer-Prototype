import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavigationBar from "./NavigationBar";
import url from '../serverurl';

class AssignedProjects extends Component {

    constructor () {
        super();
        this.state = ({
            projects : []
        })
    }

    componentWillMount = () => {
        let username = { username : localStorage.getItem('username')};
        axios.post( url + '/assignedprojects', username, { withCredentials : true })
            .then( (response) =>{
                console.log('Assigned Projects : ', response.data);
                this.setState({
                    projects : response.data
                }, () => {
                    console.log(this.state)
                } )
            } )
    };

    render() {

        let assignedProjects = this.state.projects.map( p => {
            return(
                <tr key={p._id} >
                    <td className="text-left">
                        <b> <Link to={`/projectdetails/${p._id}`}> {p.projectname} </Link>
                        </b> <br/>
                            {p.desc} <br/>
                            {p.skillsreq}
                    </td>
                    <td className='text-center'> <Link to={`/profile/${p.employer}`}> {p.employer} </Link> </td>
                </tr>
            )
        } );

        return (
            <div className="assignedprojects">
                <NavigationBar/> <br/>
                <div className='container-fluid'>
                <h2 className='text-left container-fluid'> Projects Assigned </h2> <br/>
                <div className='container-fluid'>
                    <div className='table-bordered table-striped'>
                        <div className="table-responsive">
                            <table className='table table-hover'>
                                <thead className="thead-dark" >
                                    <tr>
                                        <th className="text-left" >Project Name</th>
                                        <th>Employer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignedProjects}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        );
    }
}

export default AssignedProjects;
