import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom' ;
import { connect } from 'react-redux';

class Projects extends Component {
    
    constructor() {
        super();
        this.state = ({
            projects : [],
            bid : '' ,
            userid : '' ,
            projectid : ''
        })
    }

    componentWillMount() {
        // let id = this.props.id
        let username = sessionStorage.getItem('username');
        const usernameJSON = {
            username: username
        }

        axios.post('http://localhost:3001/getuserid', usernameJSON)
            .then((response => {
                console.log(response.data);
                this.setState({
                    userid: response.data[0].UserId
                })
                console.log(this.state);
            }))

        axios.post('http://localhost:3001/getprojects')
            .then((response) => {
                console.log(response.data);
                this.setState ({
                    projects : response.data
                }, () => {
                    console.log("After Component will mount in getprojects", this.state.projects);
                })
            })

        axios.post('http://localhost:3001/getprojectid', usernameJSON)
            .then((response => {
                console.log(response.data);
                this.setState({
                    userid: response.data[0].UserId
                })
                console.log(this.state);
            }))
    }

    handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value);        
        this.setState({
            [e.target.name] : [e.target.value]
        },()=>{
            console.log(this.state);       
        })
    }

    handleBid = () => {
        
        const bid = {
            bid : this.state.bid,
            projectid : this.state.projectid,
            userid : this.state.userid
        }
        this.props.bidUpdate(bid);
        console.log(bid);
    }
    
    render() {

        let projects = this.state.projects.map(project => {
            return(
                <tr key={project.ProjectId} >
                    <td className="text-left"> 
                        <b> <Link to='/ProjectDetails'> {project.Title} </Link>
                        </b> <br/> 
                            {project.Description} <br/> 
                            {project.SkillsReq}
                    </td>
                    <td> {project.Name} </td>
                    <td> {project.Bids} </td>
                    <td> {project.BudgetMin} </td>
                    <td> <button className="btn btn-success" data-toggle="modal" data-target="#myModal" >Bid Now</button> </td>
                </tr>
            )
        })

        return (
            <div className="projects"><br/>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-left" >Project Name</th>
                                <th>Employer</th>
                                <th>Number of Bids</th>
                                <th>Budget Range</th>
                                <th>Bid Now</th>
                            </tr>
                        </thead>
                        <tbody>
                                {projects}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Place your Bid</h4>
                            </div>
                            <div className="modal-body">
                                <label> Enter your Bid : &nbsp;
                                        <input type="text"
                                        name="bid"
                                        value={this.state.value}
                                        onChange={this.handleChange} />
                                </label> <br/>
                                <button className='btn btn-success' onClick={this.handleBid} >Bid </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bidUpdate: (bid) => {
            console.log('Bid', bid);
            axios.post('http://localhost:3001/updatebid', bid)
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

export default connect(mapStateToProps,mapDispatchToProps) (Projects);