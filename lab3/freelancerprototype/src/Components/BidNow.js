import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert'


class BidNow extends Component {

    constructor(){
        super();
        this.state = ({
            bid: '',
            deliveryDays: '',
            projectid : ''
        })
    }

    componentWillMount() {
        // let username = localStorage.getItem('username');
        // const usernameJSON = {
        //     username: username
        // };
        //
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
    };

    handleClick = (e) => {
        localStorage.setItem("ProjectId", e.target.dataset.id);
        let pid = localStorage.getItem("ProjectId");
        console.log("Project ID : ", pid);
        this.setState({
            projectid : pid
        }, () => {
            const pid = {
                id : Number(this.state.projectid)
            };
            console.log(pid);
            axios.post('http://localhost:3001/project/getproject', pid)
                .then( (response) => {
                    console.log("In project details : ", response.data);
                    this.setState({
                        projectid : response.data[0].id,
                        averagebid : response.data[0].averagebid,
                        number_of_bids : response.data[0].number_of_bids
                    }, () => {
                        console.log(this.state);
                    })
                })
        })
};

    handleBid = (e) => {
        e.preventDefault();
        let averagebid =  this.state.averagebid;
        if( averagebid === 0 ) {
            console.log("Average Bid is 0  ");
            const bid = {
                projectid : Number(this.state.projectid),
                freelancer : localStorage.username,
                period : Number(this.state.deliveryDays),
                bidamount : Number(this.state.bid),
                averagebid : Number(this.state.bid),
                number_of_bids : 1
            };
            console.log(bid);
            axios.post('http://localhost:3001/bid/updatebid', bid)
                .then((response) => {
                        console.log(response);
                        alert('Your bid is placed successfully...');
                        window.location.reload(true);
                    }
                );
        }
        else {
            console.log("Average Bid is not 0 ", this.state.averagebid );
            console.log("Number of Bids : ", this.state.number_of_bids );
            let averagebid = (this.state.averagebid + Number(this.state.bid))/( this.state.number_of_bids + 1 );
            console.log(averagebid);
            const bid = {
                averagebid : averagebid,
                projectid : Number(this.state.projectid),
                freelancer : localStorage.username,
                period : Number(this.state.deliveryDays),
                bidamount : Number(this.state.bid),
                number_of_bids : Number(this.state.number_of_bids + 1 )
            };
            console.log(bid);

            axios.post('http://localhost:3001/bid/updatebid', bid)
                .then((response) => {
                        console.log(response);
                        alert('Your bid is placed successfully...');
                        window.location.reload(true);
                    }
                );

        }
    


    };

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
                            <div className="modal-body">
                                <div className='form-group'>
                                    Enter your Bid (USD) : 
                                    <input type='text' onChange={this.handleChange} className='form-control' 
                                        id='txtBid' name='bid' required />
                                </div>
                                <div className='form-group'>
                                    Deliver in (Days) :
                                    <input type='text' onChange={this.handleChange} className='form-control' 
                                        id='txtDays' name='deliveryDays' required />
                                </div><br/>
                                <div className='form-group'>
                                    <input type='submit' value='Place Bid' className='form-control btn btn-success' 
                                        id='btnSubmitBid' name='submitBid' onClick={this.handleBid} />
                                </div>
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

// function mapStateToProps(state) {
//     return {
//
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         bidUpdate: (bid) => {
//             console.log('In Bid dispatcher', bid);
//             axios.post('http://localhost:3001/updatebid', bid)
//                 .then((response) => {
//                     console.log(response);
//                     if (response.data === 'BID_PLACED') {
//                         alert('Your bid is placed successfully...');
//                         window.location.reload(true);
//                     }
//                     else {
//                         alert('You can bid only once for one project');
//                     }
//                 }
//             );
//         }
//     }
// }

export default BidNow;