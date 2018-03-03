import React, { Component } from 'react';
import './App.css';

class SignUp extends Component {

    constructor(){
        super();
        this.state={
            email: '',
            username: '',
            pwd: ''
        }
        this.handleChange.bind(this)
    }

    handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name] : value
        })

        console.log(this.state);
        
    }

    handleSubmit(e){
        
    }
    
    render() {
        return (
            <div className="signup">
                <form onSubmit={this.handleSubmit}>
                    <h2>Please enter you details</h2><br/><br/>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" className="form-control" name="email" placeholder='Email Address' 
                            onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" name="username" placeholder='Username' 
                            onChange={this.handleChange} required />
                    </div>
                        <div className="form-group">
                            <label>Password:</label>
                        <input type="password" className="form-control" name="pwd" placeholder='Password' 
                            onChange={this.handleChange} required/>
                    </div>    
                    <label className="radio-inline"><input type="radio" name="hire" /> Hire </label> &nbsp;&nbsp;
                    <label className="radio-inline"><input type="radio" name="work"/> Work </label> <br/> <br/>
                    <button className="btn btn-primary"> Create Account</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
