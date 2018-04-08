import React, { Component } from 'react';
import { Link } from 'react-router-dom' ;
import axios from 'axios';
import './userhome.css'
import Pagination from "./Pagination";
import NavigationBar from "./NavigationBar";
import url from '../serverurl';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            projects: [],
            freelancerButton: false,
            searchtext : '',
            pageOfItems: [],
            status : '',
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

        axios.post( url + '/searchtextemployer', search)
            .then( (response) => {
                console.log('Receive Projects from Db :', response.data);
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
        console.log('In Dashboard');
        const userDetails = {
            username : localStorage.getItem('username')
        }
        axios.post( url + '/getmypostedprojects', userDetails, {withCredentials : true})
            .then((response) => {
                console.log(response.data);
                if (response.data === 'ERROR') {
                    let temp = [];
                    temp.push('No projects to show');
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

    handleFreelancer() {
        this.setState({
            freelancerButton: true
        })
    }

    handleSubmit = () => {
        localStorage.removeItem('username');
    }

    // handleOpenStatus = () => {
    //     let openProjects = [];
    //     let status = ({
    //         username : localStorage.getItem('username'),
    //         status : 'Open' })
    //     axios.post( 'http://localhost:3001/projectsbystatusdashboard', status, {withCredentials : true} )
    //         .then((response) => {
    //             console.log("Open Projects", response.data)
    //             for(let i=0; i < response.data.length ; i++)(
    //                 openProjects.push(response.data[i])
    //             )
    //
    //             this.setState({
    //                 pageOfItems : openProjects
    //             })
    //         })
    // }
    //
    // handleClosedStatus = () => {
    //     let closedProjects = [];
    //     let status = ({
    //         username : localStorage.getItem('username'),
    //         status : 'closed' })
    //     axios.post( 'http://localhost:3001/projectsbystatusdashboard', status, {withCredentials : true} )
    //         .then((response) => {
    //             console.log("Closed Projects", response.data)
    //             for(let i=0; i < response.data.length ; i++)(
    //                 closedProjects.push(response.data[i])
    //             )
    //
    //             this.setState({
    //                 pageOfItems : closedProjects
    //             })
    //         })
    // }

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

        if (this.state.freelancerButton === true)
            this.props.history.push('/freelancerdashboard');

        let projects = this.state.pageOfItems.map ( p => {
            console.log(p)
            return (
                <tr key={p.projectname}>
                    <td className='text-left' >
                        <p><Link to={`/projectdetails/${p._id.id}`}> {p.projectname} </Link></p>
                        <p> {p.desc} </p>
                        <span> {p.skillsreq} </span>
                    </td>
                    <td>
                        <div>
                            <p>$ {  p.average.toFixed(2)} </p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p><Link to={`/profile/${p.worker}`}>{p.worker}</Link></p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p> Date </p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{p.bids}</p>
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
                <NavigationBar/><br/>

                <div className='EmployerOrFreelancer'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => this.componentWillMount()} type="button" className="btn btn-dark">Employer</button>
                        <button onClick={() => this.handleFreelancer()} type="button"  className="btn btn-dark">Freelancer</button>
                    </div>
                </div>
                <br/>

                <div className="col-lg-12">
                    <div className="input-group">
                        <input type="text" className="form-control" name='searchtext'
                               placeholder="Search by Technology Stack or Project Name ..."
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
                            <input type="checkbox" name="options"
                                   id='open' onClick={this.handleCheck.bind(this)}
                            /> Status (Open)
                        </label> &nbsp;
                        <label className="btn btn-outline-dark">
                            <input type="checkbox" name="options"
                                   id='closed' onClick={this.handleCheck.bind(this)}
                            /> Status (Closed)
                        </label>
                    </div>
                </div>

                <div>
                    <div className="container">
                        <div className="text-center">
                            <Pagination items={this.state.projects} onChangePage={this.onChangePage} />
                        </div>
                    </div>
                </div>
                <br/>

                <div className='dashboardprojecttable container-fluid'>
                    <table className='table table-hover table-bordered'>
                        <thead className="thead-dark">
                            <tr>
                                <th className='text-left'>Project Name</th>
                                <th>Average Bid</th>
                                <th>Freelancer Name</th>
                                <th>Estimated Completion Date</th>
                                <th>Number of Bids</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Dashboard;
