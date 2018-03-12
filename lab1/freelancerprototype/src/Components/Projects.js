import React, { Component } from 'react';

class Projects extends Component {
    
    constructor() {
        super();
        this.state = ({
            projectname: '',
            projectdesc: '',
            skillsreq: '',
            employer: '',
            budgetrange: '',
            bids: ''
        })

    }
    
    render() {
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

                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;