import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom' ;
import image from '../Image/freelancerlogo.png'
import proimage from '../Image/PassportPhoto.jpg'
import proimage1 from '../Image/Sample.jpg'
import ImageUpload from './ImageUpload'
import Navigator from "./Navigator";

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
        console.log(this.props.match.params);
        
        let username = this.props.match.params.value ;
        const usernameJSON = {
            username : username
        };
        axios.post('http://localhost:3001/user/getprofile', usernameJSON )
            .then((response)=>{
                console.log("User Details from Database :", response.data[0]);
                // console.log(response.data[0].Email);
                this.setState ({
                        username : response.data[0].username,
                        name : response.data[0].name,
                        email : response.data[0].email,
                        phone: response.data[0].phone,
                        aboutme: response.data[0].aboutme,
                        skills: response.data[0].skills,
                        // image: response.data[0].Image
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
            [e.target.name] : e.target.value
        })
    };

    handleSave = (e) => {

        e.preventDefault();
        
        const profile = {
            username : this.state.username,
            name : this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            aboutme: this.state.aboutme,
            skills: this.state.skills,
            image: this.state.image
        };
        
        // this.props.profileUpdate(profile);
        console.log(profile);

        axios.post('http://localhost:3001/user/updateprofile', profile)
            .then((response) => {
                console.log("After Updating Profile", response.data);
                    this.setState ( { isEditing : !this.state.isEditing });
                    console.log("Profile Updated");
            }
        )
    };

    handleEdit = (e) => {
        e.preventDefault();
        this.setState (
                { isEditing : !this.state.isEditing }
        );
    };

    render() {

        let bar = null;

        if (localStorage.getItem('username') === null) {
            bar = ( <Navigator /> )
        }
        else {
            bar = (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to={`/profile/${localStorage.getItem('username')}`}
                              className="btn btn-primary"> Profile </Link> &nbsp; &nbsp;
                        <Link to="/signin"
                              className='btn btn-danger' onClick={this.handleSubmit}>
                            Sign Out </Link>
                    </li>
                </ul>
            )
        }

        if(this.state.isEditing)
        {   
            return (
                <div className="profile">
                    <div className="profilenavbar container-fluid" >
                        <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand"> <img src={image} alt="Freelancer Logo" /> </a>
                                </div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <Link to="/userhome" className='btn btn-danger'>
                                            Back to Home </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to='/userhome'
                                          className="nav-link" > Home <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/dashboard' className="nav-link" href=""> Dashboard </Link>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <button className="postproject btn " type="submit">
                                    <Link id='postproject' to='/addproject' > Post a Project </Link>
                                </button>
                            </form>
                        </div>
                    </nav>
                    <br/>

                    <div className="container-fluid ">
                        <br /><br />
                        <div className="row content ">
                            <div className="col-sm-3 divStyle">
                                <img className="img-rounded" src={proimage} alt="Insert Photo here"></img>
                                <label> Profile Image :
                                <input style={ {marginTop : 5} } type="file"
                                        className="form-control-file"
                                        name="avatar" />
                                </label>
                            </div>
                            <div className="col-sm-6 divStyle">
                                <div className='text-left' disabled='true' >
                                    <h5> <label> Name : &nbsp;
                                        <input style={ {marginTop : 5} } type="text" ref="name"
                                            className="profilename form-control"
                                            name= "name"
                                            value={this.state.name}
                                            onChange={this.handleChange}  />
                                        </label></h5>
                                    <h5> <label> Email : &nbsp;
                                        <input style={ {marginTop : 5} } type="text" ref="email"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange} />
                                        </label></h5>
                                    <h5> Phone : &nbsp;
                                        <input style={ {marginTop : 5} } type="text" ref="phone"
                                            className="form-control"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange} />
                                    </h5>
                                    <h5> About Me : 
                                        <textarea style={ {marginTop : 5} } type="text-area" ref="aboutme"
                                            className="form-control"
                                            name="aboutme"
                                            value={this.state.aboutme}
                                            onChange={this.handleChange} />
                                         </h5>
                                    <h5> Skills :
                                        <input style={ {marginTop : 5} } type="text" ref="email"
                                            className="form-control"
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
                    <div className="profilenavbar container-fluid" >
                        <nav className="navbar navbar-inverse" >
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand"> <img src={image} alt="Freelancer Logo" /> </a>
                                </div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li> <Link to="/userhome" className='btn btn-danger' onClick={this.handleSubmit}>
                                            Back to Home </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to='/userhome'
                                          className="nav-link" > Home <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/dashboard' className="nav-link" href=""> Dashboard </Link>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <button className="postproject btn " type="submit">
                                    <Link id='postproject' to='/addproject' > Post a Project </Link>
                                </button>
                            </form>
                        </div>
                    </nav>

                    <br/>

                    <div className="container-fluid ">
                        <br /><br />
                        <div className=" row content ">
                            <div className=" col-sm-3 divStyle">
                                <img className="img-rounded" src={proimage} alt="Insert Photo here"/>
                            </div>
                            <div className="profileinfo col-sm-6 divStyle">
                                <div className='text-left'>
                                    <h3> {this.state.name}</h3>
                                    <h5> Username : {this.state.username}</h5>
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

// function mapStateToProps(state) {
//     return {
//         profile_updation: state.profile_updation
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         profileUpdate : (profile) => {
//             console.log('Updated User', profile);
//
//         }
//     }
// }

export default Profile;
