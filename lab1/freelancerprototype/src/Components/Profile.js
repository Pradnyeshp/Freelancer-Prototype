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
                                <Link to="/userhome" className='btn btn-danger'>
                                            Sign Out </Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="container-fluid ">
                        <br /><br />
                        <div className="row content ">
                            <div className="col-sm-3 divStyle">
                                <img className="img-rounded imageStyle" alt="Insert Photo here"></img>
                                <label>Profile Image :
                                <input type="file"
                                        className="form-control-file"
                                        name="avatar" />
                                </label>
                            </div>
                            <div className="col-sm-6 divStyle">
                                <div className='text-left' disabled='true' >
                                    <h3> <label> Name : &nbsp;
                                        <input type="text" ref="name"
                                            name= "name"
                                            value={this.state.name}
                                            onChange={this.handleChange}  />
                                        </label></h3>
                                    <h5> <label> Email : &nbsp;
                                        <input type="text" ref="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange} />
                                        </label></h5>
                                    <h5> Phone : &nbsp;
                                        <input type="text" ref="phone"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange} />
                                    </h5>
                                    <h5> About Me : 
                                        <input type="text" ref="aboutme"
                                            name="aboutme"
                                            value={this.state.aboutme}
                                            onChange={this.handleChange} />
                                         </h5>
                                    <h5> Skills :
                                        <input type="text" ref="email"
                                            name="skills"
                                            value={this.state.skills}
                                            onChange={this.handleChange} />
                                    </h5>
                                </div>
                            </div>
                            <div className="col-sm-2 div3Style">
                                <button className='btn btn-primary'
                                    onClick={this.handleEdit} > Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <form>
                        <br />
                        <button className='btn btn-primary'
                            onClick={this.handleSave} > Save 
                        </button> &nbsp;
                        <button className='btn btn-danger'> 
                            <Link to='/profile' onClick={this.handleEdit} ><font color="white">Cancel</font></Link>
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

                    <div className="container-fluid ">
                        <br /><br />
                        <div className="row content ">
                            <div className="col-sm-3 divStyle">
                                <img className="img-rounded imageStyle" alt="Insert Photo here"></img>      
                            </div>
                            <div className="col-sm-6 divStyle">
                                <div className='text-left'>
                                    <h3> {this.state.name}</h3>
                                    <h5> Email : {this.state.email}</h5>
                                    <h5> Phone : {this.state.phone}</h5>
                                    <h5> About Me : {this.state.aboutme} </h5>
                                    <h5> Skills : {this.state.skills} </h5>
                                </div>
                            </div>
                            <div className="col-sm-2 div3Style">
                                <button className='btn btn-primary'
                                    onClick={this.handleEdit} > Edit
                                </button>
                            </div>
                        </div>
                    </div>
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
