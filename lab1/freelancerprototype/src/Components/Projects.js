import React, { Component } from 'react';
import axios from 'axios'

class Projects extends Component {
    
    constructor() {
        super();
        this.state = ({
            projects : [] 
        })
    }

    componentWillMount() {
        let id = this.props.id
        axios.post('http://localhost:3001/getprojects')
            .then((response) => {
                this.setState ({
                    projects : this.state.projects
                })
            })
    }
    
    render() {

        let projects = this.state.projects.map(project => {
            return(
                <tr>
                
                </tr>
            )
        })

        return (
            <div className="projects"><br/>
                <div>
                    Project Content will be displayed Here
                    <div className="row-1" >
                        Project Name : {this.state.projectname}
                    </div>
                    <div className="row-2">
                        Description : {this.state.projectdesc}
                    </div>
                    <div>
                        Skills Required : {this.state.skillsreq}
                    </div>
                    <div>
                        Employer : {this.state.employer}
                    </div>
                    <div>
                        Budget Range : {this.state.budgetrange}
                    </div>
                    <div>
                        Number of Bids yet : {this.state.bids}
                    </div>
                    <div>
                        <button>Bid Now</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Project Name</th>
                                <th>Employer</th>
                                <th>Number of Bids</th>
                                <th>Budget</th>
                                <th>Bid Now</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Anna</td>
                                <td>Pitt</td>
                                <td>35</td>
                                <td>New York</td>
                                <td>USA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}

export default Projects;