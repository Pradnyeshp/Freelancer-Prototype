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
            projectid : '',
            averagebid : '',
            number_of_bids : ''
        });
        this.handleChange = this.handleChange.bind(this);
    }

    // componentWillMount() {
    //     // let username = localStorage.getItem('username');
    //     // const usernameJSON = {
    //     //     username: username
    //     // };
    //     //
    //     // axios.post('http://localhost:3001/getuserid', usernameJSON)
    //     //     .then((response => {
    //     //         console.log(response.data);
    //     //         this.setState({
    //     //             userid: response.data[0].UserId
    //     //         })
    //     //         console.log(this.state);
    //     //     }))
    //     }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })       
    };

    handleClick = (e) => {
         e.preventDefault();
         // debugger
        console.log( "Bid Now Clicked for Project ID : " , e.target.dataset.id);
        localStorage.setItem("projectid", e.target.dataset.id);
        // let pid = localStorage.getItem("ProjectId");
        // console.log("Project ID : ", pid);
        // this.setState({
        //     projectid : pid
        // }, () => {
        //     const pid = {
        //         id : Number(this.state.projectid)
        //     };
            let p_id = { id : Number(e.target.dataset.id) };
            console.log(p_id);
            axios.post('http://localhost:3001/project/getproject', p_id)
                .then( (response) => {
                    console.log("In project details : ", response.data);
                    localStorage.setItem("averagebid", response.data[0].averagebid );
                    localStorage.setItem("number_of_bids", response.data[0].number_of_bids );
                    this.setState({
                        projectid : response.data[0].id,
                        averagebid : response.data[0].averagebid,
                        number_of_bids : response.data[0].number_of_bids
                    }, () => {
                        console.log(this.state);
                    })
                }
            )
    //     }
    // )
};

    handleBid = (e) => {
        // debugger
        e.preventDefault();
        let averagebid =  this.state.averagebid;
        console.log("Average bid", this.state.averagebid);
        // debugger;
        if( averagebid === 0 ) {
            console.log("Average Bid is 0  ");
            const bid1 = {
                projectid : Number(this.state.projectid),
                freelancer : localStorage.username,
                period : Number(this.state.deliveryDays),
                bidamount : Number(this.state.bid),
                averagebid : Number(this.state.bid),
                number_of_bids : 1
            };
            console.log(bid1);
            axios.post('http://localhost:3001/bid/updatebid', bid1)
                .then((response) => {
                        console.log(response);
                        alert('Your bid is placed successfully...');
                        window.location.reload(true);
                    }
                );
        }
        else {
            console.log("Average Bid is not 0 ", this.state.averagebid );
            console.log("Average Bid From Local Storage : ", localStorage.averagebid );
            console.log("Number of Bids : ", this.state.number_of_bids );
            console.log("Number of Bids from Local Storage :  ", localStorage.number_of_bids  );
            // debugger;
            let lsaveragebid = Number(localStorage.averagebid);
            let lsnumofbids = Number(localStorage.number_of_bids);
            let averagebid = Number(( lsaveragebid*lsnumofbids + Number(this.state.bid) ) / ( lsnumofbids + 1 ));
            let updatednumofbids = Number(lsnumofbids) + 1;
            console.log(averagebid);
            const bid2 = {
                averagebid : averagebid,
                projectid : localStorage.projectid,
                freelancer : localStorage.username,
                period : Number(this.state.deliveryDays),
                bidamount : Number(this.state.bid),
                number_of_bids : updatednumofbids
            };
            console.log(bid2);
            debugger;
            axios.post('http://localhost:3001/bid/updatebid', bid2 )
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
                    data-target="#myModal" onClick={this.handleClick.bind(this)} > Bid Now
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
                                        id='btnSubmitBid' name='submitBid' onClick={this.handleBid.bind(this)} />
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