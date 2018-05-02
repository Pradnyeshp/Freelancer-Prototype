import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom' ;
import image from '../Image/freelancerlogo.png'
import url from '../serverurl';
import ImageUpload from './ImageUpload';
// let imagestring ;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isEditing : false,
            username : '',
            name : '',
            email : '',
            phone : '',
            aboutme : '',
            skills : '', 
            imageURL : '',
            image : ''
        });
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        // this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    // handleUploadImage = (e) => {
    //     e.preventDefault();
    //
    //     const data = new FormData();
    //     data.append('file', this.uploadInput.files[0]);
    //     // data.append('filename', this.fileName.value);
    //     data.append('username', localStorage.getItem('username'));
    //
    //     axios.post( url + '/upload', data , {withCredentials : true})
    //         .then((response) => {
    //                 console.log(response);
    //                 console.log(response.data);
    //                 this.setState({
    //                     imageURL : `${url}/${response.data.file}`
    //                 }, () => {
    //                     // imagestring = this.state.imageURL;
    //                     console.log(this.state.imageURL);
    //                     // console.log(imagestring)
    //                 })
    //             }
    //         )
    // };

    componentWillMount() {
        console.log(this.props.match.params);
        
        let username = this.props.match.params.value ;
        const usernameJSON = {
            username: username
        };

        axios.post( url + '/getprofile', usernameJSON, { withCredentials : true } )
            .then((response)=>{
                console.log("User Details from Database :", response.data[0]);
                console.log(response.data[0].email);
                
                this.setState ({
                        username : response.data[0].username,
                        name : response.data[0].name,
                        email : response.data[0].email,
                        phone: response.data[0].phone,
                        aboutme: response.data[0].aboutme,
                        skills: response.data[0].skills,
                        // imageURL : imagestring
                    }, () => {
                        console.log('In getProfile, After setState :', this.state)
                    }
                )        
            }
        );

        // axios.post( url + '/getimageurl', usernameJSON, {withCredentials:true} )
        //     .then((response) => {
        //         console.log(response);
        //         this.setState({
        //                 imageURL : `${url}/${response.data.file}`
        //             }
        //         )
        //     }
        //     )
    }

    handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState ({
            [e.target.name] : [e.target.value]
        })
    };

    handleSave = () => {

        const profile = {
            username : this.state.username,
            name : this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            aboutme: this.state.aboutme,
            skills: this.state.skills,
            // image: this.state.image
        };
        this.props.profileUpdate(profile);
        console.log(profile);
    };

    handleEdit = (e) => {
        e.preventDefault();
        this.setState ( {isEditing : !this.state.isEditing });
    };

    render() {

        let imageupload1 = null;

        if(this.state.isEditing)
        {   
            return (
                <div className="profile"><br/>
                    <div className="container-fluid" >
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
                    <div className="container-fluid ">
                        <br /><br />
                        <form onSubmit={this.handleUploadImage}>
                        <div className="row content ">
                            <div className="profileimage col-sm-3 divStyle">
                                {/*<img className="img-rounded" src={proimage} alt="Insert Photo here"></img>*/}
                                <label> Profile Image :
                                {/*<input ref={(ref) => { this.uploadInput = ref; }} type="file" />*/}
                                    {/*<input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />*/}
                                </label>
                                {/*<button>Submit</button>*/}
                                {/*<img src={this.state.imageURL} alt="img" />*/}
                                imageupload1 = <ImageUpload/>
                            </div> &nbsp;&nbsp;
                            <div className="col-sm-5 divStyle">
                                <div className='text-left' disabled='true' >
                                    <h3> <label> Name : &nbsp;
                                        <input type="text" ref="name"
                                            className="form-control"
                                            name= "name"
                                            value={this.state.name}
                                            onChange={this.handleChange}  />
                                        </label></h3>
                                    <h5> <label> Email : &nbsp;
                                        <input type="text" ref="email"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange} />
                                        </label></h5>
                                    <h5> <label> Username : &nbsp;
                                        <input type="text" ref="email"
                                               className="form-control"
                                               name="email"
                                               value={this.state.username}
                                               disabled />
                                    </label></h5>
                                    <h5> Phone : &nbsp;
                                        <input type="text" ref="phone"
                                            className="form-control"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange} />
                                    </h5>
                                    <h5> About Me : 
                                        <textarea typeof="text-area" ref="aboutme"
                                            className="form-control"
                                            name="aboutme"
                                            value={this.state.aboutme}
                                            onChange={this.handleChange} />
                                         </h5>
                                    <h5> Skills :
                                        <input type="text" ref="email"
                                            className="form-control"
                                            name="skills"
                                            value={this.state.skills}
                                            onChange={this.handleChange} />
                                    </h5>
                                </div>
                            </div>
                            <div className="col-sm-1 div3Style">
                                <button className='btn btn-primary'
                                    onClick={this.handleEdit} > Edit
                                </button>
                            </div>
                        </div>
                        </form>
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
                    <br/>
                    <div className="container-fluid" >
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

                    <div className="container-fluid ">
                        <br /><br />
                        <div className="row content ">
                            <div className="col-sm-3 divStyle">
                                {/*<img src={this.state.imageURL} alt="img" />*/}
                                {imageupload1}
                                {/*<img src = { require('/home/ec2-user/cmpe273/freelancer/freelancerServer/public/' + localStorage.getItem('username') +'.png' )} alt = "img" width={'200px'} height={'200px'}  />*/}
                                {/*<img className="img-rounded" src={proimage} alt="Insert Photo here"></img>*/}
                            </div>
                            <div className="col-sm-6 divStyle">
                                <div className='text-left'>
                                    <h3> {this.state.name}</h3>
                                    <h5> Email : {this.state.email}</h5>
                                    <h5> Username : {this.state.username}</h5>
                                    <h5> Phone : {this.state.phone}</h5>
                                    <h5> About Me : {this.state.aboutme} </h5>
                                    <h5> Skills : {this.state.skills} </h5>
                                </div>
                            </div>
                            <div className="col-sm-1 div3Style">
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
            axios.post( url + '/updateprofile', profile, { withCredentials : true })
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
