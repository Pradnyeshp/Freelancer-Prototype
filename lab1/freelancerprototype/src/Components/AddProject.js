import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AddProject extends Component {

    constructor() {
        super();
        this.state = ({
            userid : '',
            projectname : '',
            projectdesc : '',
            skillsreq : '' ,
            budgetrange : '' ,
            startdate : '' ,
            compdate : '',
            projectpost_success : ''
        })
        this.postProject = this.postProject.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount () {
        
        let username = sessionStorage.getItem('username');
        const usernameJSON = {
            username: username
        }

        axios.post('http://localhost:3001/getuserid', usernameJSON )
            .then((response => {
                console.log(response.data);
                this.setState( {
                    userid: response.data[0].UserId
                })
                console.log(this.state);   
            })) 
    }

    postProject = (e) => {
        e.preventDefault

        const projectDetails = {
            userid : this.state.userid,
            projectname: this.state.projectname,
            projectdesc: this.state.projectdesc,
            skillsreq: this.state.skillsreq,
            budgetrange: this.state.budgetrange,
            startdate: this.state.startdate,
            compdate: this.state.compdate,
        }
        this.props.addProject(projectDetails)
    }

    handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            [e.target.name]: [e.target.value]
        })
        console.log(this.state);
        
    }

    render() {
        let projectpost = null;

        if (this.props.projectpost_success === 'PROJECTPOST_SUCCESS') {
            projectpost = <Redirect to='/Userhome' />
        }

        return (
            <div className="project">
                {projectpost}
                <form onSubmit={this.postProject} ><br />
                    <h2>Tell us what you need done</h2>
                    <p>Get free quotes from skilled freelancers within minutes</p><br/>
                    <label><h5>Choose a name for your project</h5> <br/>
                        <input type="text" 
                            name="projectname" 
                            placeholder="Build me a website" 
                            onChange={this.handleChange} required />
                    </label><br/><br/>
                    <label><h5>Tell us more about your project</h5> <br />
                        <textarea className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3" name="projectdesc"
                            placeholder = 'Describe your Project here...'
                            onChange={this.handleChange} required>
                        </textarea>
                    </label><br /><br/>
                    <label><h5>Upload your Files here </h5><br/>
                        <input type="file" className="form-control-file" 
                            id="exampleFormControlFile1"
                            name="fileupload" />
                    </label><br /><br />    
                    <label><h5>What skills are required?</h5> <br/>
                        <input type="text" name="skillsreq" 
                            placeholder="What skills are required?" 
                            onChange={this.handleChange}required />
                    </label><br />
                    <label> What is your estimated budget? <br/>
                        <input type="text" name="budgetrange" 
                            onChange={this.handleChange} required />
                    </label> <br />
                    <label> Starting Date <br />
                        <input type="date" name="startdate"
                            onChange={this.handleChange} required />
                    </label> <br />
                    <label> Completion Date <br />
                        <input type="date" name="compdate"
                            onChange={this.handleChange} required />
                    </label> <br />
                    <br/> <br/>
                    <button className="btn btn-primary" onSubmit={this.handleSubmit} >Post My Project</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userid : state.userid,
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
            axios.post('http://localhost:3001/addproject', project)
                .then((response) => {
                    console.log(response);
                    dispatch({ type: 'SIGNUP_SUCCESS', payload: response })
                }
            );
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (AddProject);
