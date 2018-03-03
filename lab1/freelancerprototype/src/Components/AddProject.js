import React, { Component } from 'react';
import './App.css';

class AddProject extends Component {
    render() {
        return (
            <div className="project">
                <form><br />
                    <label>Project Name :
                        <input type="text" ref="projectname" required />
                    </label><br/>
                    <label>Description :
                        <input type="text" ref="projectdesc" required />
                    </label><br />
                    <label>Files Upload:
                        <input type="text" ref="fileupload" required />
                    </label><br />
                    <label>Skills Required:
                        <input type="text" ref="skillsreq" required />
                    </label><br />
                    <label>Budget Required:
                        <input type="text" ref="budget" required />
                    </label><br />
                    <button className="btn btn-primary" >Post</button>
                </form>
            </div>
        );
    }
}

export default AddProject;
