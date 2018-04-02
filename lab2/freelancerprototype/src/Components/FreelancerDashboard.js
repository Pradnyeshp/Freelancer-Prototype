import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './userhome.css'
import image from '../Image/freelancerlogo.png'
import Pagination from "./Pagination";

class FreelancerDashboard extends Component {
    
    constructor() {
        super();
        this.state = {
            projects: [],
            employerButton: false,
            userid : '',
            searchtext : '',
            pageOfItems: [],
            temp : []
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    handleSearch= (e) => {
        e.preventDefault()
        let search = {
            search : this.state.searchtext,
            username: localStorage.getItem('username')
        }

        axios.post('http://localhost:3001/searchtextfreelancer', search)
            .then( (response) => {
                console.log('Receive Projects from Db :', response.data)
                if( response.data.toString() ===  'No Project found in database' ) {
                    this.setState ({
                        projects : [],
                        temp : []
                    })
                }
                else {
                    this.setState({
                        projects : response.data,
                        temp : response.data
                    })
                }
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        }, () => {
            console.log("After entering Text in Searchbar", this.state.searchtext )
        })
    }

    componentWillMount() {

        console.log('In Freelancer Dashboard');
        const userDetails = {
            username : localStorage.getItem('username'),
            userid : localStorage.getItem('userid')
        }

        axios.post('http://localhost:3001/getmybiddedprojects', userDetails )
            .then((response) => {
                console.log("Your Bidded Projects : ", response.data);
                if (response.data === 'ERROR') {
                    let temp = [];
                    temp.push('No projects');
                    this.setState({
                        projects: temp
                    })
                } else {
                    this.setState({
                        projects: response.data,
                        temp : response.data
                    }, () => {
                        console.log(this.state); 
                    })
                }
            }
        )
    }

    handleEmployer() {
        this.setState({
            employerButton: true
        })
    }

    handleSubmit = () => {
        localStorage.removeItem('username');
    }

    handleCheck = () => {
        let array = []

        if( document.getElementById('open').checked && document.getElementById('closed').checked ) {
            this.setState({
                projects : this.state.temp
            })
        }
        else if( document.getElementById('open').checked ) {
            console.log("Open Checkbox selected")
            for(let i=0; i< this.state.projects.length ; i++) {
                if(this.state.projects[i].status === 'Open') {
                    array.push(this.state.projects[i])
                    console.log(array);
                }
            }
            this.setState({
                projects : array
            })
        }
        else if( document.getElementById('closed').checked ) {
            console.log("Closed Checkbox selected")
            for(let i=0; i< this.state.projects.length ; i++) {
                if(this.state.projects[i].status === 'closed') {
                    array.push(this.state.projects[i])
                    console.log(array);
                }
            }
            this.setState({
                projects : array
            })
        }
        else {
            console.log('No checkbox Selected')
            this.setState({
                projects : this.state.temp
            })
        }
    }

    render() {

        if (this.state.employerButton === true)
            this.props.history.push('/dashboard');

        let projects = this.state.pageOfItems.map( p => {
            console.log(p)
            return (

                <tr key={p.id}>
                    <td className='text-left' >
                        <p><Link to={`/projectdetails/${p.id }`}> {p.projectname} </Link></p>
                        <p> {p.desc} </p>
                        <span> {p.skillsreq} </span>
                    </td>
                    <td>
                        <div>
                            <p> $ {p.average.toFixed(2)} </p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p><Link to={`/profile/${p.employer}`}>{p.employer}</Link></p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{p.bid}</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{p.status}</p>
                        </div>
                    </td>
                </tr>
            );
        });

        return (
            <div className="dashboard">
                <div className="container-fluid" >
                    <nav className="navbar navbar-inverse" >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"> <img src={image} alt="Freelancer Logo" /> </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li> <Link to={`/profile/${localStorage.getItem('username')}`}
                                    className="btn btn-primary"> Profile </Link> &nbsp;
                                <Link to="/signin" className='btn btn-danger' onClick={this.handleSubmit}>
                                        Sign Out </Link></li>
                            </ul>
                        </div>
                    </nav>
                </div> <br />

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/userhome'
                                      className="nav-link" > All Projects <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/relevantprojects' className="nav-link" href=""> Relevant Projects </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/dashboard' className="nav-link" href=""> Dashboard </Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                <Link to='/addproject' > Post a Project </Link>
                            </button>
                        </form>
                    </div>
                </nav><br />

                <div className='EmployerOrFreelancer'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => this.handleEmployer()} 
                            type="button" className="btn btn-dark">Employer</button>
                        <button type="button" className="btn btn-dark">Freelancer</button>
                    </div>
                </div><br />

                <div className="col-lg-12">
                    <div className="input-group">
                        <input type="text" className="form-control" name='searchtext'
                               placeholder="Search by Project Name ..."
                               onChange={this.handleChange} /> &nbsp;&nbsp;&nbsp;
                        <div className="input-group-btn">
                            <button className="btn btn-outline-primary" type="button" onClick={this.handleSearch}> Search </button>
                        </div>
                    </div>
                </div>
                <br/>

                <div className='container-fluid text-right'>
                    <div className='container-fluid btn-group-sm text-left' >
                        <label className="btn btn-outline-dark ">
                            <input type="checkbox" name="options" id="option1"
                                   id='open' onClick={this.handleCheck.bind(this)}
                            /> Status (Open)
                        </label> &nbsp;
                        <label className="btn btn-outline-dark">
                            <input type="checkbox" name="options" id="option2"
                                   id='closed' onClick={this.handleCheck.bind(this)}
                            /> Status (Closed)
                        </label>
                    </div>
                </div>
                <br/>

                <div className='dashboardprojecttable'>
                    <table className='table table-hover'>
                        <thead className="thead-dark">
                            <tr>
                                <th className='text-left'>Project Name</th>
                                <th>Average Bid</th>
                                <th>Employer Name</th>
                                <th>Your Bid</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects}
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className="container">
                        <div className="text-center">
                            <Pagination items={this.state.projects} onChangePage={this.onChangePage} />
                        </div>
                    </div>
                </div>
                <br/>

            </div>
        );
    }
}

export default FreelancerDashboard;
