import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios'

class Profile extends Component {

    constructor() {
        super();
        this.state = ({
            isEditing : false,
            username : '',
            name : '',
            email : '',
            phone : '',
            aboutme : '',
            skills : '', 
            image : ''
        });
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentWillMount() {
        let username = sessionStorage.getItem('username');
        const usernameJSON = {
            username: username
        }
        axios.post('http://localhost:3001/getprofile', usernameJSON )
            .then((response)=>{
                console.log("User Details from Database :", response.data[0]);
                console.log(response.data[0].Email);
                
                this.setState ({
                        username : response.data[0].Username,
                        name : response.data[0].Name,
                        email : response.data[0].Email
                    }, () => {
                        console.log('After setState', this.state)
                    }
                )
                
            })
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState ({
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

    handleEdit = (e) => {
        e.preventDefault()
        this.setState ( {isEditing : true });
        
    }

    render() {
        if(this.state.isEditing)
        {
            
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
        )}

        else {
            
            return(
                < div className = "profile" >
                <form>
                    <label>Name :
                            
                    </label><br />
                    <label>Email :
                            
                    </label><br />
                    <label>Phone Number :
                            
                    </label><br />
                    <label>About Me :
                            
                    </label><br />
                    <label>Skills :
                        
                    </label><br />
                    <label>Profile Image :
                        
                    </label><br />
                    <button className='btn btn-primary'
                        onClick={this.handleEdit} > Edit
                        </button>
                </form>
                </div >
        )
    }
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
            let username = sessionStorage.getItem('username');
            console.log(sessionStorage);
            axios.post('http://localhost:3001/updateprofile', username)
                .then((response) => {
                    console.log(response.data[0].Username);
                    if (response.data === 'ERROR')
                        dispatch({ type: 'ERROR', payload: response })
                    else {
                        dispatch({ type: 'PROFILE_UPDATE', payload: response })
                    }
                }
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);
