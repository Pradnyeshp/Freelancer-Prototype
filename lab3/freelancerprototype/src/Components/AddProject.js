import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'
import swal from 'sweetalert';
import './userhome.css'

class AddProject extends Component {

    constructor() {
        super();
        this.state = ({
            employer : '',
            projectname : '',
            projectdesc : '',
            skillsreq : '' ,
            budgetrange: 'Micro Project ($10 - 30 USD)' ,
            startdate : '' ,
            compdate : '',
            projectpost_success : ''
        });
        this.postProject = this.postProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
        
        this.setState({
            employer : localStorage.username
        });

    }

    postProject = (e) => {
        e.preventDefault();

        const projectDetails = {
            employer : this.state.employer,
            title : this.state.projectname,
            description : this.state.projectdesc,
            skills_required : this.state.skillsreq,
            budgetrange : this.state.budgetrange,
            startdate : this.state.startdate,
            compdate : this.state.compdate,
        };

        axios.post('http://localhost:3001/project/addproject', projectDetails)
            .then((response) =>
                {
                    if (response.data === 'ERROR') {
                        alert("Incorrect values");
                    }
                    else {
                        console.log("Receive response in after add project", response.data);
                        swal('Add Project','Project Posted Successfully','success');
                        this.props.history.push('/Userhome');
                    }
                }
            );
    };

    handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        }, () => {
            console.log(this.state);
        })
    };

    render() {

        return (
            <div className="project">
                <Helmet>
                    <style>{'body { background-color: #cccc; }'}</style>
                </Helmet>
                <div className='container' >
                <form onSubmit={this.postProject} ><br />
                    <h2>Tell us what you need done</h2>
                    <h5>Get free quotes from skilled freelancers within minutes</h5><br/>
                    <hr/>
                    <br/>
                    <div className='form-group' >
                        <label className='addprojectform text-left' ><h5>Choose a name for your project</h5> <br/>
                            <input type="text" 
                                className="form-control"
                                name="projectname" 
                                placeholder="Build me a website" 
                                onChange={this.handleChange} required />
                        </label><br/>
                    </div>
                    <div className='form-group'>
                        <label className='addprojectform text-left' ><h5>Tell us more about your project</h5> <br />
                            <textarea className="form-control" 
                                rows="4" name="projectdesc"
                                placeholder = 'Describe your Project here...'
                                onChange={this.handleChange} required>
                            </textarea>
                        </label><br />
                    </div>
                    <div className='form-group'>
                        <label className='addprojectform text-left' ><h5>Upload your Files here </h5><br/>
                            <input type="file" 
                                className="form-control" 
                                name="fileupload" />
                        </label><br />
                    </div> 
                    <div className='form-group' >   
                        <label className='addprojectform text-left'><h5>What skills are required?</h5> <br/>
                            <input type="text" 
                                className="form-control"
                                name="skillsreq" 
                                placeholder="What skills are required?" 
                                onChange={this.handleChange}required />
                        </label><br />
                    </div>
                    <div className='form-group' >
                        <label className='addprojectform text-left'> <h5> What is your estimated budget? </h5> <br/>
                                <select className="form-control" defaultValue="Micro Project ($10 - 30 USD)" name="budgetrange" onChange={this.handleChange} required>
                                    <option value="Micro Project ($10 - 30 USD)">
                                        Micro Project ($10 - 30 USD)</option>
                                    <option value="Simple project ($30 - 250 USD)">
                                        Simple project ($30 - 250 USD)</option>
                                    <option value="Very small project ($250 - 750 USD)">
                                        Very small project ($250 - 750 USD)</option>
                                    <option value="Small project ($750 - 1500 USD)">
                                        Small project ($750 - 1500 USD)</option>
                                    <option value="Large project ($3000 - 5000 USD)">
                                        Large project ($3000 - 5000 USD)</option>
                                    <option value="Larger project ($5000 - 10000 USD)">
                                        Larger project ($5000 - 10000 USD)</option>
                                    <option value="Huge project ($20000 - 50000 USD)">
                                        Huge project ($20000 - 50000 USD)</option>
                                </select>
                        </label> <br /><br/>
                    </div>
                    {/*<div className='form-group' >*/}
                        {/*<label className='addprojectform'> <h5>Starting Date</h5> <br />*/}
                            {/*<input type="date" */}
                                {/*className="form-control"*/}
                                {/*name="startdate"*/}
                                {/*onChange={this.handleChange} required />*/}
                        {/*</label> <br />*/}
                    {/*</div>*/}
                    {/*<div className='form-group' >*/}
                        {/*<label> <h5> Completion Date </h5> <br />*/}
                            {/*<input type="date" */}
                                {/*className="form-control"*/}
                                {/*name="compdate"*/}
                                {/*onChange={this.handleChange} required />*/}
                        {/*</label> <br />*/}
                    {/*</div>*/}
                    <br/> 
                    <button className="btn btn-success" onSubmit={this.handleSubmit} >Post My Project</button> 
                </form>
                <br/> <br/>
                    <br/><br/>
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         userid : state.userid,
//         freelancer : state.freelancer,
//         projectname: state.projectname,
//         projectdesc: state.projectdesc,
//         skillsreq: state.skillsreq,
//         budgetrange: state.budgetrange,
//         startdate: state.startdate,
//         compdate: state.compdate,
//         projectpost_success : state.projectpost_success
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         addProject : (project) => {
//             console.log(project);
//             axios.post('http://localhost:3001/addproject', project)
//                 .then((response) =>
//                 {
//                     if (response.data === 'ERROR') {
//                         alert("Incorrect datetime value");
//                         dispatch({ type: 'ERROR', payload: response })
//                     }
//                     else {
//                         console.log("Receive response in after add project", response);
//                         dispatch({ type: 'PROJECTPOST_SUCCESS', payload: response })
//                     }
//                 }
//
//             );
//         }
//     }
// }


export default AddProject;
