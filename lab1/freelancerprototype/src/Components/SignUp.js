import React, { Component } from 'react';
import './App.css';

class SignUp extends Component {
    render() {
        return (
            <div className="signup">
                <form>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="text" class="form-control" ref="email" required/>
                    </div>
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" class="form-control" ref="name" required />
                    </div>
                        <div class="form-group">
                            <label>Password:</label>
                        <input type="password" class="form-control" ref="pwd" required/>
                    </div>    
                    <label class="radio-inline"><input type="radio" name="hire" />Hire</label> &nbsp;&nbsp;
                    <label class="radio-inline"><input type="radio" name="work"/>Work</label> <br/> <br/>
                    <button className="btn btn-primary">Create Account</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
