import React, { Component } from 'react';


class SubmissionPanel extends Component {
    render() {
        return (
            <div className="submissionpanel">
                <form>
                    <h2>Submission Panel</h2><br/>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile04" />
                                <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                        </div>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit">Upload</button>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Comments</label>
                        <textarea className="form-control" rows="3" placeholder="Enter Details about Uploaded Files"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SubmissionPanel;
