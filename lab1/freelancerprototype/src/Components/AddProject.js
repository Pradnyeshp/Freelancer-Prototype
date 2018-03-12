import React, { Component } from 'react';
import './App.css';

class AddProject extends Component {

    constructor() {
        super();
        this.state = ({
            projectname : "",
            projectdesc : "",
            skillsreq : "",
            budget : ""
        })
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = () => {

    }

    handleChange = () => {

    }

    render() {
        return (
            <div className="project">
                <form><br />
                    <h2>Tell us what you need done</h2>
                    <p>Get free quotes from skilled freelancers within minutes</p><br/>
                    <label>Choose a name for your project <br/>
                        <input type="text" 
                            name="projectname" 
                            placeholder="build me a website" 
                            onChange={this.handleChange} required />
                    </label><br/>
                    <label>Tell us more about your project <br />
                        <textarea class="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3" name="projectdesc"
                            onChange={this.handleChange} required>
                        </textarea>
                    </label><br />
                    <label>Upload your Files here <br/>
                        <input type="file" class="form-control-file" 
                            id="exampleFormControlFile1"
                            name="fileupload" />
                    </label><br />
                    <label>What skills are required? <br/>
                        <input type="text" name="skillsreq" 
                            placeholder="What skills are required?" 
                            onChange={this.handleChange}required />
                    </label><br />
                    <label> What is your estimated budget? <br/>
                        <input type="text" name="budget" 
                            onChange={this.handleChange} required />
                    </label> <br /> <br/>
                    <button className="btn btn-primary" onSubmit={this.handleSubmit} >Post My Project</button>
                </form>
            </div>
        );
    }
}

export default AddProject;
