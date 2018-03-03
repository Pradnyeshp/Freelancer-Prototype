import React, { Component } from 'react';
import './App.css';

class AddProject extends Component {
    render() {
        return (
            <div className="project">
                <form>
                    <label>Project Name :
                        <input type="text" ref="projectname" required />
                    </label>
                    <label>Description :
                        <input type="text" ref="projectdesc" required />
                    </label>
                    <label>Files Upload:
                        <input type="text" ref="fileupload" required />
                    </label>
                    <label>Skills Required:
                        <input type="text" ref="skillsreq" required />
                    </label>
                    <label>Budget Required:
                        <input type="text" ref="budget" required />
                    </label>
                    <button>Post</button>
                </form>
            </div>
        );
    }
}

export default AddProject;
