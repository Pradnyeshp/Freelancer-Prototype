import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import url from '../serverurl';

class BidNow extends Component {

    constructor(){
        super();
        this.state = ({
            bid: '',
            userid: '',
            username : '',
            deliveryDays: '',
            pname : '',
            projectid : ''
        })
    }

    componentWillMount() {

        let username = localStorage.getItem('username');
        this.setState({
            username: username
        })
        //getuserid request for mysql db
        // axios.post('http://localhost:3001/getuserid', usernameJSON)
        //     .then((response => {
        //         console.log(response.data);
        //         this.setState({
        //             userid: response.data[0].UserId
        //         })
        //         console.log(this.state);
        //     }))
        }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })       
    }

    handleClick = (e) => {
        if(this.state.username === this.props.employer){
            alert("You cannot Bid on your own Project");
            window.location.reload(true)
        }

        localStorage.setItem("ProjectId", e.target.dataset.id);
        let pid = localStorage.getItem("ProjectId");
        console.log(pid);
        this.setState({
            projectid : pid
        }, () => {
            const pid = {
                projectid : this.state.projectid
            };
            axios.post( url + '/getprojectdetails', pid, { withCredentials : true } )
                .then( (response) => {
                    console.log("In project details : ", response.data);
                    this.setState({
                        pname : response.data[0].projectname,
                    }, () => {
                        console.log(this.state.pname);
                    })
                })
        })
}

    handleBid = (e) => {
        e.preventDefault()

        let pid = localStorage.getItem("ProjectId");
        console.log( "In HandleBid pid = ", pid );

        const bid = {
            username : this.state.username,
            bid: this.state.bid,
            projectid : pid,
            userid : this.state.userid,
            deliveryDays : this.state.deliveryDays
        }
        this.props.bidUpdate(bid);
        console.log(bid);
    }

    render() {
        return (
            <div className="bidnow">
                <button className="btn btn-success" data-toggle="modal" data-id = {this.props.id}
                    data-target="#myModal" onClick={this.handleClick} > Bid Now 
                </button>

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"> Placing your Bid </h4>
                            </div>
                            <form onSubmit={this.handleBid}>
                            <div className="modal-body">
                                <div className='form-group'>
                                    Enter your Bid (USD) : 
                                    <input type='text' onChange={this.handleChange} className='form-control' 
                                        id='txtBid' name='bid' required pattern='[0-9]*' title='Enter Valid Amount'/>
                                </div>
                                <div className='form-group'>
                                    Deliver in (Days) :
                                    <input type='text' onChange={this.handleChange} className='form-control' 
                                        id='txtDays' name='deliveryDays' required pattern='[0-9]*' title='Enter valid number of days' />
                                </div><br/>
                                <div className='form-group'>
                                    <input type='submit' value='Place Bid' className='form-control btn btn-success' 
                                        id='btnSubmitBid' name='submitBid'  />
                                </div>
                            </div>
                            </form>
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
            console.log('In Bid dispatcher', bid);
            axios.post( url + '/updatebid', bid, { withCredentials:true } )
                .then((response) => {
                    console.log("Response from DB ", response);
                    if (response.data === 'BID_PLACED') {
                        alert('Your bid is placed successfully...');
                        window.location.reload(true);
                    } 
                    else {
                        alert('You can bid only once for one project');
                    }
                }
            );
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (BidNow);