import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'
import url from '../serverurl';

class AddProject extends Component {

    constructor() {
        super();
        this.state = ({
            username: '',
            userid : '',
            freelancer : '',
            projectname : '',
            projectdesc : '',
            skillsreq : '' ,
            budgetrange: 'Micro Project ($10 - 30 USD)' ,
            startdate : '' ,
            compdate : '',
            projectpost_success : ''
        });
        this.postProject = this.postProject.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount () {
        
        let user = localStorage.getItem('username');
        const usernameJSON = {
            username : user
        }
        console.log(usernameJSON);
        this.setState({
                username : user
        }, () => {
            console.log('In componentWillMount', this.state)
        })
        // axios.post('http://localhost:3001/checksession', null, { withCredentials : true } )
        //     .then((response => {
        //         console.log('In CheckSession ', response.data);
        //         this.setState( {
        //             freelancer : response.data[0].username
        //         }, () => {
        //             console.log( 'After check Session ' , this.state );
        //         })
        //     }))
    }

    postProject = (e) => {
        e.preventDefault();

        const projectDetails = {
            username : this.state.username,
            userid : this.state.userid,
            freelancer : this.state.freelancer,
            projectname: this.state.projectname,
            projectdesc: this.state.projectdesc,
            skillsreq: this.state.skillsreq,
            budgetrange: this.state.budgetrange,
            startdate: this.state.startdate,
            compdate: this.state.compdate,
        };
        this.props.addProject(projectDetails)
    };

    handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            [e.target.name] : [e.target.value]
        }, () => {
            console.log(this.state);
        })
    };

    render() {
        let projectpost = null;
        if (this.props.projectpost_success === 'PROJECTPOST_SUCCESS') {
            console.log(this.state.projectpost_success); 
            alert('Project Posted Successfully')    
            projectpost = <Redirect to="/Userhome" />
        }

        return (
            <div className="project">
                <Helmet>
                    <style>{'body { background-color: lightblue; }'}</style>
                </Helmet>
                {projectpost}
                <div className='container-fluid col-lg-12' >
                <form onSubmit={this.postProject} className=''><br />
                    <h2>Tell us what you need done</h2>
                    <p>Get free quotes from skilled freelancers within minutes</p><br/>
                    <div className='' >
                        <label><h5>Choose a name for your project</h5> <br/>
                            <input type="text" 
                                className="form-control"
                                name="projectname" 
                                placeholder="Build me a website" 
                                onChange={this.handleChange} required />
                        </label><br/>
                    </div>
                    <div className=''>
                        <label><h5>Tell us more about your project</h5> <br />
                            <textarea className="form-control" 
                                rows="4" name="projectdesc"
                                placeholder = 'Describe your Project here...'
                                onChange={this.handleChange} required>
                            </textarea>
                        </label><br />
                    </div>
                    <div className=''>
                        <label><h5>Upload your Files here </h5><br/>
                            <input type="file" 
                                className="form-control" 
                                name="fileupload" />
                        </label><br />
                    </div> 
                    <div className='' >
                        <label><h5>What skills are required?</h5> <br/>
                            <input type="text" 
                                className="form-control"
                                name="skillsreq" 
                                placeholder="What skills are required?" 
                                onChange={this.handleChange}required />
                        </label><br />
                    </div>
                    <div className='' >
                        <label> <h5> What is your estimated budget? </h5> <br/>
                                <select className="form-control"
                                        defaultValue="Micro Project ($10 - 30 USD)"
                                        name="budgetrange"
                                        onChange={this.handleChange} required >
                                    <option value="Micro Project ($10 - 30 USD)">
                                        Micro Project ($10 - 30 USD)</option>
                                    <option value="Simple project ($30 - 250 USD)">
                                        Simple project ($30 - 250 USD)</option>
                                    <option value="Very small project ($250 - 750 USD)">
                                        Very small project ($250 - 750 USD)</option>
                                    <option value="Small project ($750 - 1500 USD)">
                                        Small project ($750 - 1500 USD)</option>
                                </select>
                        </label> <br />
                    </div>
                    <br/>
                    <button className="btn btn-success"
                            onSubmit={this.handleSubmit} >Post My Project</button>
                </form>
                <br/> <br/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userid : state.userid,
        freelancer : state.freelancer,
        projectname: state.projectname,
        projectdesc: state.projectdesc,
        skillsreq: state.skillsreq,
        budgetrange: state.budgetrange,
        startdate: state.startdate,
        compdate: state.compdate,
        projectpost_success : state.projectpost_success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addProject : (project) => {
            console.log(project);
            axios.post( url + '/addproject', project)
                .then((response) => 
                {
                    if (response.data === 'ERROR') {
                        // alert("Incorrect datetime value");
                        dispatch({ type: 'ERROR', payload: response })
                    }
                    else {
                        console.log("Receive response in after add project", response);
                        dispatch({ type: 'PROJECTPOST_SUCCESS', payload: response })
                    }
                }
            );
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (AddProject);
