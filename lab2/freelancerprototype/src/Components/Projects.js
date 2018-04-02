import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom' ;
import BidNow from './BidNow'
import Pagination from "./Pagination";

class Projects extends Component {
    
    constructor() {
        super();
        this.state = ({
            projects : [],
            searchtext : '',
            pageOfItems: [],
            temp : []
        })
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
            search : this.state.searchtext
        }

        axios.post('http://localhost:3001/searchtext', search)
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
        axios.post('http://localhost:3001/getprojects', null , { withCredentials : true } )
            .then((response) => {
                console.log("Response from DB", response.data);
                this.setState ({
                    projects : response.data,
                    temp : response.data
                }, () => {
                    console.log("After Component will mount in getprojects", this.state.projects);
                })
            }
        )
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
        let projectsArray = this.state.pageOfItems.map( p => {
            return(
                <tr key={p._id} >
                    <td className="text-left">
                        <b> <Link to={`/projectdetails/${p._id}`}> {p.projectname} </Link>
                        </b> <br/>
                            {p.desc} <br/>
                            {p.skillsreq}
                    </td>
                    <td className='text-center'> <Link to={`/profile/${p.employer}`}> {p.employer} </Link> </td>
                    <td> {p.bids} </td>
                    <td> {p.budget} </td>
                    <td> <BidNow id={p._id}  employer={p.employer}  />
                     </td>
                </tr>
            )
        })

        return (
            <div className="projects"><br/>
                <div className='container-fluid'>
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

                    <div>
                    <div className='container-fluid text-left' >
                        <input className='form-group' type="checkbox" id='open' onClick={this.handleCheck.bind(this)} /> &nbsp;
                        <label > Open Projects </label>&nbsp;
                        <input type="checkbox" id='closed' onClick={this.handleCheck.bind(this)} /> &nbsp;
                        <label > Closed Projects </label>
                    </div>
                    </div>


                </div>
                <div className='container-fluid'>
                <div className='table-bordered table-striped'>
                <div className="table-responsive">
                    <table className='table table-hover'>
                        <thead className="thead-dark" >
                            <tr>
                                <th className="text-left" >Project Name</th>
                                <th>Employer</th>
                                <th>Number of Bids</th>
                                <th>Budget Range</th>
                                <th>Bid Now</th>
                            </tr>
                        </thead>
                        <tbody>
                                {projectsArray}
                        </tbody>
                    </table>
                </div>
                </div>
                </div>
                <br/>
                <div>
                    <div className="container">
                        <div className="text-center">
                            <Pagination items={this.state.projects} onChangePage={this.onChangePage} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Projects;