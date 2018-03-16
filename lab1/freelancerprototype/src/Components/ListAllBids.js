import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListAllBids extends Component {

    constructor() {
        super()
        this.state = ({
            userid : '',
            projectid : '',
            bids : []
        })
    }

    componentWillMount() {
        console.log('In List All Bids: ' + this.props.id );
        let pid = ({
            projectid : this.props.id
        })
        axios.post('http://localhost:3001/getallbids', pid)
            .then((response) => {
                console.log('In getallbids :', response.data);
                if (response.data.length === 0) {
                    let temp = [];
                    temp.push('No projects to show');
                    this.setState ({
                        bids: []
                    })
                } 
                else 
                {
                    this.setState({
                        bids: response.data
                    }, () => {
                        console.log("Bids array ", this.state.bids);
                    })
                }
            }
        )
    }

    render() {

        let allbids = []

        allbids = this.state.bids.map( b => {
            return (
                <tr key={b.Date} >
                    <td className="text-left">
                        <b> Profile Image Here </b> 
                    </td>
                    <td> <Link to={`/profile/${b.Username}`}> {b.Username} </Link> </td>
                    <td> {b.Bid} </td>
                    <td> {b.DeliveryDays} </td>
                    <td> <button className='btn btn-success' >Hire Now</button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="listallbids"><br />
                <div className="projects">
                    <div className="table-responsive">
                        <div id='divListHeader'>
                            <h3 className="text-left" > List of all bids on this project </h3>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-left" > Profile Image </th>
                                    <th> Freelancer Name </th>
                                    <th> Bid Price </th>
                                    <th> Period(In Days) </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allbids}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListAllBids;