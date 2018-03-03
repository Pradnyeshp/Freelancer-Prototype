import React, { Component } from 'react';
import './App.css';

class SignIn extends Component {
    render() {
        return (
            <div className="headerDiv">
                <div className="modal-header">
                    <h2 className="modal-header-logo">Logo here</h2><br />
                </div>
                <form>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" className="form-control" ref="email" placeholder="Email or Username" required />
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" ref="pwd" placeholder="Password" required />
                    </div>
                    <button className="btn btn-primary" >Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;
