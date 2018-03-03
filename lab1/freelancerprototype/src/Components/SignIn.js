import React, { Component } from 'react';
import './App.css';

class SignIn extends Component {

    constructor(){
        super();
        this.state={
            email : '',
            pwd : ''
        }
        this.handleChange.bind(this)
        this.handleSubmit.bind(this)
    }

    handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
        console.log(this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            pwd: this.state.pwd
        }
        console.log(userData);
    }
    
    render() {
        return (
            <div className="center">
                <div>
                    <h2 className="modal-header-logo">Logo here</h2> <br />
                    <h3>Login</h3><br/>
                </div>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" className="form-control" name="email" 
                            placeholder="Email or Username" onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" name="pwd" 
                            placeholder="Password" onChange={this.handleChange} required />
                    </div>
                    <button className="btn btn-primary" >Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;
