import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux' ;

class SignUp extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            username: '',
            pwd: '',
            radioResponce: ''
        }
        this.handleChange.bind(this)
        this.handleSubmit.bind(this)
    }

    handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name] : value
        })
        // console.log(this.state.email);
    }

    handleSubmit = (e) => {
        e.preventDefault(); 

        const userData = {
            username : this.state.username,
            email : this.state.email,
            pwd : this.state.pwd,
            radioResponce : this.state.radioResponce
        }

        console.log(userData);
        //console.log(userData);
    
    }
    
    render() {
        return (
            <div className="signup">
                <form onSubmit={this.handleSubmit}><br/>
                    <h2>Please enter your details</h2><br/><br/>
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
                    </div>    <br/>
                    <button className="btn btn-primary"> Create Account</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps() {
    return{

    };
}

function mapDispatchToProps(dispatch) {
    return{

    };

}

export default connect(mapStateToProps, mapDispatchToProps) (SignUp);
