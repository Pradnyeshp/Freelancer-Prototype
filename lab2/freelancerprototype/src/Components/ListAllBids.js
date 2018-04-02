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
            display: "none",
            employer : ''
        })
    }

    componentWillMount() {
        console.log('In List All Bids: ' + this.props.id );
        let usr = localStorage.getItem('username');
        let pid = ({
            projectid : this.props.id,
            username : usr
        });

        axios.post('http://localhost:3001/getemployer', pid , {withCredentials : true})
            .then( (response) => {
                console.log('Employer is', response);
                    this.setState({
                        employer : response.data
                    }, () => {
                        // console.log(this.state.employer)
                    })
            });

        axios.post('http://localhost:3001/getallbids', pid, {withCredentials:true} )
            .then((response) => {
                console.log('In getallbids :', response.data);
                if (response.data.length === 0) {
                    this.setState ({
                        bids: []
                    })
                } 
                else 
                {
                    if ( this.state.employer === localStorage.getItem('username')) {
                        this.setState({
                            display: "block"
                        })
                    }
                    this.setState({
                        bids: response.data
                    }, () => {
                        console.log("Bids array ", this.state.bids);
                    })
                }
            }
        )
    }

    handleClick(freelancer) {
        console.log("Hire button clicked and freelancer is :" + freelancer, this.props.id );
        const fdetails = ({
            pid: this.props.id,
            freelancer: freelancer
        });
        axios.post('http://localhost:3001/setworker', fdetails )
            .then((response) => {
                console.log("In hire button handle click", response.data);
            })
    }

    handleSortAsc = () => {
          let  temp = this.state.bids.sort( (a, b) => a.bid - b.bid );
          this.setState({
              bids : temp
          })
    };

    handleSortDsc = () => {
        let  temp = this.state.bids.sort( (a, b) => b.bid - a.bid );
        this.setState({
            bids : temp
        })
    };

    render() {

        let Style = this.state.display;
        const divStyle = {
            display: Style
        };

        let allbids = this.state.bids.map( b => {
            return (
                <tr key={b._id} >
                    <td className="text-left">
                        <b> Profile Image Here </b> 
                    </td>
                    <td> <Link to={`/profile/${b.freelancer}`}> {b.freelancer} </Link> </td>
                    <td> $ {b.bid} </td>
                    <td> {b.deliverydays} </td>
                    <td> 
                            <input type="button" id="btnHire" style={ divStyle }
                                className='btn btn-success' value="Hire Now" 
                                onClick={this.handleClick.bind(this, b.freelancer)} />
                    </td>
                </tr>
            )
        });

        return (
            <div className="listallbids"><br />
                <div className="projects">
                    <h3 className="text-left" > List of all bids on this project </h3>



                    <div className='container-fluid text-right '>
                        <div className="btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success"
                                onClick={this.handleSortAsc.bind(this)} > Sort by Bid (Asc)</button>&nbsp;
                            <button type="btn-group-sm" className="btn btn-success"
                                onClick={this.handleSortDsc.bind(this)} > Sort by Bid (Dsc)</button>
                        </div>
                    </div>
                    <br/>

                    <div className="table-responsive table-bordered">
                        <div id='divListHeader'>

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