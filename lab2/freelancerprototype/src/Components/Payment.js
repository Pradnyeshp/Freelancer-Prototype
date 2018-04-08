import React, { Component } from 'react';
import './userhome.css'
import axios from 'axios'
import uuid from 'uuid'
import url from '../serverurl';

class Payment extends Component {

    constructor() {
        super();
        this.state = ({
            projectid : '' ,
            employer : '',
            worker : '',
            bidamt : '',
            projectname: '',
            employerbal: '',
            workerbal: '',
            transactionid: ''
        });
        this.handlePayment = this.handlePayment.bind(this)
    }

    handlePayment = (e) => {
        e.preventDefault();

        if (this.state.bidamt >= this.state.employerbal) {
            alert("Insufficient Funds : Bid Amount is greater than Account Balance")
        }
        else {
            let transactionData = ({
                    pid : this.state.projectid,
                    projectname : this.state.projectname,
                    bidamt : this.state.bidamt,
                    employer : this.state.employer,
                    worker : this.state.worker,
                    workerbal: this.state.workerbal,
                    employerbal: this.state.employerbal,
                    transactionidEmployer : uuid.v4(),
                    transactionidWorker : uuid.v4()
            });
            axios.post(url + '/transaction', transactionData  , { withCredentials : true } )
                .then((response) => {
                    console.log('Transaction Result : ', response.data);
                    alert('Payment Processed Successfully');
                    this.props.history.push(`/projectdetails/${this.state.projectid}`)
                })
        }
    };

    componentWillMount() {

        const pid = { pid : this.props.match.params.value};
            this.setState({
            projectid : pid.pid
            }, () => {
            console.log("After ComponentWillMount", this.state)  });

        axios.post( url + '/getpaymentdetails', pid , { withCredentials : true } )
            .then((response => {
                console.log(response.data);
                this.setState({
                    employer : response.data[0].employer,
                    worker : response.data[0].worker,
                    bidamt : response.data[0].bidamt,
                    projectname : response.data[0].projectname
                }, () => {
                    console.log(this.state);
                    let u = {
                        u : this.state.employer
                    };
                    axios.post( url + '/getbalance', u , {withCredentials : true})
                        .then((response) => {
                            console.log(response.data);
                            this.setState({
                                employerbal : response.data[0].balance
                            }, () => {
                                console.log(this.state)
                            })
                        });
                    let u1 = {
                        u : this.state.worker
                    };
                    axios.post( url + '/getbalance', u1 , {withCredentials : true})
                        .then((response) => {
                            console.log(response.data);
                            this.setState({
                                workerbal : response.data[0].balance
                            }, () => {
                                console.log(this.state)
                            })
                        })
                })
            }))
    }

    render() {
        return (
            <div className="payment"><br/>
                <h2>Payment Page</h2>
                <div className='payment1'>
                <div className='container-fluid'>
                <div className="row">
                <div className="col-md-6 order-md-5">
                <form className="needs-validation" >
                    <hr className="mb-4"/>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="cc-name">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name" placeholder="" required/>
                                        <small className="text-muted">Full name as displayed on card</small>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="cc-number">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="" />
                                    <small className="text-muted">Enter your 16 digit Card Number</small>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="cc-number">Amount to be Paid (Bid Amount) </label>
                                    <input type="text" className="form-control text-center" value={this.state.bidamt} disabled/>
                                </div>
                    <br/>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="cc-expiration"> Expiration Month </label>
                                    <select className="form-control " id="cc-expiration" defaultValue="MM" required >
                                        <option>MM</option>
                                        <option> 01 </option>
                                        <option> 02 </option>
                                        <option> 03 </option>
                                        <option> 04 </option>
                                        <option> 05 </option>
                                        <option> 06 </option>
                                        <option> 07 </option>
                                        <option> 08 </option>
                                        <option> 09 </option>
                                        <option> 10 </option>
                                        <option> 11 </option>
                                        <option> 12 </option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="cc-expiration">Expiration Year</label>
                                    <select className="form-control" id="cc-expiration" required >
                                        <option> YYYY </option>
                                        <option> 2017 </option>
                                        <option> 2018 </option>
                                        <option>2019</option>
                                        <option>2020</option>
                                        <option>2021</option>
                                        <option>2022</option>
                                        <option>2023</option>
                                        <option>2024</option>
                                        <option>2025</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="cc-expiration">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="CVV" />
                                </div>
                            </div>
                            <hr className="mb-4"/>
                    <div className="container-fluid col-md-5 mb-3">
                                <button className="btn btn-primary btn-lg btn-block"
                                        type="submit"
                                        onClick={this.handlePayment}>Make Payment</button>
                    </div>
                </form>
                </div>
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Payment;
