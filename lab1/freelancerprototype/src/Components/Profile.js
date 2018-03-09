import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'

class Profile extends Component {

    constructor() {
        super();

        this.state={
            name : "",
            email : "",
            phone : "",
            aboutme : "",
            skills : "", 
            image : ""
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState=({
            [e.target.name] : [e.target.value]
        })
    }

    handleSave = () => {
        const profile = {
            name : this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            aboutme: this.state.aboutme,
            skills: this.state.skills,
            image: this.state.image
        }
        this.props.profileUpdate(profile);
    }

    render() {
        return (
            <div className="profile">
                <form>
                    <label>Name :
                        <input type="text" ref="name"
                            value={this.state.value}
                            onChange={this.handleChange}  />
                    </label><br/>
                    <label>Email :
                        <input type="text" ref="email"
                            value={this.state.value}
                            onChange={this.handleChange}  />
                    </label><br />
                    <label>Phone Number :
                        <input type="text" ref="phone" 
                            value={this.state.value}
                            onChange={this.handleChange} />
                    </label><br />
                    <label>About Me :
                        <input type="text" ref="aboutme" 
                            value={this.state.value}
                            onChange={this.handleChange} />
                    </label><br />
                    <label>Skills :
                        <input type="text" ref="email"
                            value={this.state.value}
                            onChange={this.handleChange}  />
                    </label><br />
                    <label>Profile Image :
                        <input type="text" ref="email"  />
                    </label><br />
                    <button className='btn btn-primary'
                        onClick={this.handleSave} > Save 
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile_updation: state.profile_updation
    }
}

function mapDispatchToProps(dispatch) {
    return {
        profileUpdate : (profile) => {
            console.log("In profile Updation", profile);
            axios.post('http://localhost:3001/profile', profile)
                .then((response) => {
                    console.log(response.data[0].Username);
                    if (response.data === 'ERROR')
                        dispatch({ type: 'ERROR', payload: response })
                    else {
                        sessionStorage.setItem('username', response.data[0].username)
                        dispatch({ type: 'PROFILE_UPDATE', payload: response })
                    }
                }
                );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);
