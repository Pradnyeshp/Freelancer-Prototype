import React, { Component } from 'react';
import { Link } from 'react-router-dom' ;
import axios from 'axios';
import './userhome.css'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            projects: [],
            freelancerButton: false
        }
    }

    componentWillMount() {
        console.log('In Dashboard');
        const userDetails = {
            username : localStorage.getItem('username')
        }
        axios.post('http://localhost:3001/getmypostedprojects', userDetails)
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
                        projects: response.data
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

    render() {

        if (this.state.freelancerButton === true)
            this.props.history.push('/freelancerdashboard');

        let projects = [];
        projects = this.state.projects.map( p => {
            // var finalDate = null
            // if (p.estimated_completion_date !== null) {
            //     finalDate = p.estimated_completion_date.slice(0, 10);
            // }
            return (
                <tr key={p.ProjectId}>
                    <td className='text-left' >
                        <p><Link to={`/projectdetails/${p.ProjectId}`}> {p.Title} </Link></p>
                        <p> {p.Description} </p>
                        <span> {p.SkillsReq} </span>
                    </td>
                    <td>
                        <div>
                            <p> {p.Average} </p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p><Link to={`/profile/${p.Freelancer}`}>{p.Freelancer}</Link></p>
                        </div>
                    </td>
                    <td>
                        <div>
                            {/* <p> {finalDate} </p> */}
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{p.Bids}</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{p.open}</p>
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
                                <a className="navbar-brand"> Freelancer Logo </a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/profile" className="btn btn-primary"> Profile </Link> &nbsp;
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
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                <Link to='/addproject' > Post a Project </Link>
                            </button>
                        </form>
                    </div>
                </nav><br/>

                <div className='EmployerOrFreelancer'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => this.componentWillMount()} type="button" className="btn btn-secondary">Employer</button>
                        <button onClick={() => this.handleFreelancer()} type="button"  className="btn btn-secondary">Freelancer</button>
                    </div>
                </div><br/>
                <div className='dashboardprojecttable'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Project Name</th>
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
