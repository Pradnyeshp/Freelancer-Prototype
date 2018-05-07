import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListAllBids extends Component {

    constructor() {
        super();
        this.state = ({
            userid : '',
            projectid : '',
            bids : [],
            display: "none"
        })
    }

    componentWillMount() {
        console.log('In List All Bids: ', this.props.id );
        let pid = ({
            projectid : this.props.id
        });
        axios.post('http://localhost:3001/bid/getallbids', pid)
            .then((response) => {
                console.log('In getallbids :', response.data);
                    this.setState({
                        bids: response.data
                    }, () => {
                        console.log("Bids array ", this.state.bids);
                    }
                )
            }
        )
    }

    handleClick(freelancer) {
        console.log("Hire button click and freelancer is :" + freelancer, this.props.id);
        const details = {
            pid: this.props.projectid,
            freelancer: freelancer
        };
        axios.post('http://localhost:3001/setworkerforproject', details )
            .then((response) => {
                console.log("In hire button handle click", response.data);
                alert('Freelancer hired...check in your dashboard now...thanks');
            }
        )
    }

    render() {

        let allbids = [];

        var displayStyle = this.state.display;
        const divStyle = {
            display: displayStyle
        };

        allbids = this.state.bids.map( b => {
            return (
                <tr key={b.id} >
                    <td className="text-left">
                        <b> Profile Image Here </b> 
                    </td>
                    <td> <Link to={`/profile/${b.freelancer}`}> {b.freelancer} </Link> </td>
                    <td> {b.bidamount} </td>
                    <td> {b.period} </td>
                    <td> 
                            <input type="button" id="btnHire" 
                                className='btn btn-success' value="Hire Now" 
                                onClick={this.handleClick.bind(this, b.freelancer)} />
                    </td>
                </tr>
            )
        });

        return (
            <div className="listallbids"><br />
                <div className="projects">
                    <div className="table-responsive">
                        <div id='divListHeader'>
                            <h3 className="text-left" > List of all bids on this project </h3>
                        </div>
                        <table className="table">
                            <thead className="thead-dark">
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