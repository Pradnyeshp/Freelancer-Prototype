import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom' ;

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
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
                        email : response.data[0].Email,
                        phone: response.data[0].Phone,
                        aboutme: response.data[0].AboutMe,
                        skills: response.data[0].Skills,
                        image: response.data[0].Image
                    }, () => {
                        console.log('After setState :', this.state)
                    }
                )        
            }
        )
    }

    handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState ({
            [e.target.name] : [e.target.value]
        })
    }

    handleSave = () => {
        
        const profile = {
            username : this.state.username,
            name : this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            aboutme: this.state.aboutme,
            skills: this.state.skills,
            image: this.state.image
        }
        
        this.props.profileUpdate(profile);
        console.log(profile);
    }

    handleEdit = (e) => {
        e.preventDefault()
        this.setState ( {isEditing : !this.state.isEditing });
        
    }

    render() {
        if(this.state.isEditing)
        {   
            return (
                <div className="profile">
                    <div className="container-fluid" >
                        <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand"> Freelancer Logo </a>
                                </div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/Profile" className="btn btn-primary"> Profile </Link> &nbsp;
                                <Link to="/" className='btn btn-danger' onClick={this.handleSubmit}>
                                            Sign Out </Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <form>
                        <label> Name :
                            <input type="text" ref="name"
                                name= "name"
                                value={this.state.value}
                                onChange={this.handleChange}  />
                        </label><br/>
                        <label> Email :
                            <input type="text" ref="email"
                                name = "email"
                                value={this.state.value}
                                onChange={this.handleChange}  />
                        </label><br />
                        <label> Phone Number :
                            <input type="text" ref="phone" 
                                name = "phone"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </label><br />
                        <label>About Me :
                            <input type="text" ref="aboutme"
                                name = "aboutme"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </label><br />
                        <label>Skills :
                            <input type="text" ref="email" 
                                name = "skills"
                                value={this.state.value}
                                onChange={this.handleChange}  />
                        </label><br />
                        <label>Profile Image :
                            <input type="text" ref="email"  />
                        </label><br />
                        <button className='btn btn-primary'
                            onClick={this.handleSave} > Save 
                        </button>
                        <button className='btn'
                        > <Link to='/profile' onClick={this.handleEdit} > Cancel </Link>
                        </button>
                    </form>
                </div>
            )}

        else {
            return(
                < div className = "profile" >
                    <div className="container-fluid" >
                        <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand"> Freelancer Logo </a>
                                </div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/Profile" className="btn btn-primary"> Profile </Link> &nbsp;
                                <Link to="/" className='btn btn-danger' onClick={this.handleSubmit}>
                                            Sign Out </Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <form>
                        <label >Name : {this.state.name}
                        </label><br />
                        <label>Email :  {this.state.email}             
                        </label><br />
                        <label>Phone Number :  {this.state.phone}      
                        </label><br />
                        <label>About Me :  {this.state.aboutme}
                        </label><br />
                        <label>Skills :  {this.state.skills}
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
            console.log('Updated User', profile);
            
            axios.post('http://localhost:3001/updateprofile', profile)
                .then((response) => {
                    console.log(response);
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
