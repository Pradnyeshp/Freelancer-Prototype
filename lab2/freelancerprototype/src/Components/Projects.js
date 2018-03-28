import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom' ;
import BidNow from './BidNow'

class Projects extends Component {
    
    constructor() {
        super();
        this.state = ({
            projects : [],
            searchtext : ''
        })
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSearch= (e) => {
        e.preventDefault()
        let search = {
            search : this.state.searchtext
        }

        axios.post('http://localhost:3001/searchtext', search)
            .then( (response) => {
                console.log('Receive Projects from Db :', response.data)
                if( response.data.toString() == 'No Project found in database' ) {
                    this.setState ({
                        projects : []
                    })
                }
                else {
                    this.setState({
                        projects : response.data
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
                    projects : response.data
                }, () => {
                    console.log("After Component will mount in getprojects", this.state.projects);
                })
            }
        )
    }

    render() {
        let projectsArray = this.state.projects.map( p => {
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
                    <td> <BidNow id={p._id}  />
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

                </div>
                <br/>
                <div className='container-fluid'>
                <div className='table-bordered'>
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
            </div>
        );
    }
}

export default Projects;