import React, { Component } from 'react';
import axios from 'axios'
import url from '../serverurl';

class SubmissionPanel extends Component {

    handleChange= (e) =>{

        this.setState({
            [e.target.name] : e.target.value
        }, ()=> {
           console.log(this.state)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let pid = { pid : this.props.pid,
            comment : this.state.comment
        }
        console.log(pid);

        axios.post( url + '/postcomment', pid, {withCredentials : true})
            .then((response) => {
                console.log(response.data)
            })
    }

    render() {
        return (
            <div className="submissionpanel">
                <form>
                    <h2>Submission Panel : Upload Files and Comments here</h2><br/>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile04" />
                                <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                        </div>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit"
                            onClick={this.handleSubmit.bind(this)} >Upload</button>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Comments</label>
                        <textarea className="form-control" rows="3" name='comment'
                                  placeholder="Enter Details about Uploaded Files"
                                   onChange={this.handleChange.bind(this)}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SubmissionPanel;
