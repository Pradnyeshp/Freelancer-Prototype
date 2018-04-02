import React, { Component } from 'react';
import axios from "axios/index";
import uuid from 'uuid'
import PieChart from "./PieChart";
import NavigationBar from "./NavigationBar";
import './userhome.css'

class TransactionManager extends Component {

    constructor () {
        super()
        this.state = ({
            username : '',
            balance : '',
            transactionTable : []
        })
        this.handleWithdraw = this.handleWithdraw.bind(this);
        this.handleAddMoney = this.handleAddMoney.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name] : e.target.value
        }, () => {
            console.log(this.state)
        })
}

    handleWithdraw (e) {
        e.preventDefault()

        let user = ({
            id : uuid.v4(),
            username : this.state.username,
            amount : this.state.balance - Number(this.state.debit),
            debit : Number(this.state.debit),
            pname : 'Money Withdrawn'
        })

        axios.post( 'http://localhost:3001/withdrawmoney', user, { withCredentials : true } )
            .then((response) => {
                console.log('Withdrawal of money : success', response.data)
                alert("Money Successfully Withdrawn, Check Transaction History below for more details")
                window.location.reload(true)
            })
    }

    handleAddMoney (e) {
        e.preventDefault()

        let user = ({
            id : uuid.v4(),
            username : this.state.username,
            amount : this.state.balance + Number(this.state.credit),
            credit : Number(this.state.credit),
            pname : 'Money Added'
        })

        axios.post( 'http://localhost:3001/addmoney', user, { withCredentials : true } )
            .then((response) => {
                console.log('Addition of money : success', response.data)
                alert("Money Successfully Added, Check Transaction History below for more details")
                window.location.reload(true)
            })

    }

    componentWillMount() {

        const u = {
            u : localStorage.getItem('username')
        }
        this.setState({
            username : u.u
        }, () => {
            console.log(this.state)
        })

        axios.post('http://localhost:3001/getbalance', u , {withCredentials : true})
            .then((response) => {
                console.log(response.data);
                this.setState({
                    balance : response.data[0].balance
                }, () => {
                    console.log(this.state)
                })
            })

        axios.post('http://localhost:3001/gettranshistory', u , { withCredentials : true } )
            .then((response) => {
                console.log('In Tras History', response.data)
                this.setState({
                    transactionTable : response.data
                }, () => {
                    console.log('After Getting Trans History', this.state)
                })
            })

    }

    render() {

        let transTable = this.state.transactionTable.map( p => {
            return (
                    <tr className='text-dark' key={p.id}>
                        <th> {p.id} </th>
                        <th> {p.date} </th>
                        <th> {p.pname} </th>
                        <th> {p.amount} </th>
                        <th> {p.transType} </th>
                    </tr>
            )
        })
        return (
            <div className="tm container-fluid"><br/>
                <NavigationBar/> <br/>
                <div className='container-fluid' >
                <div className='row'><br/>
                    <div className='col-lg-4 text-left'>
                        <form className='balance form-group'><br/>
                            <h3 >Account Balance</h3><br/>
                            <div className='col-lg-10'>
                            <div>
                                <input  className='form-control btn-outline-primary' type='text' value={this.state.balance}/>
                            </div>
                            <br/>
                            <div >
                                <input  className='form-control btn-success' type='button' value='Add Money'
                                        data-toggle="modal"
                                        data-target="#myModal1"  />
                            </div>
                            <br/>
                            <div>
                                <input  className='form-control btn-danger' type='button' data-toggle="modal"
                                        data-target="#myModal"  value='Withdraw Money'/>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div className=' col-lg-8'>
                        <PieChart transArray={this.state.transactionTable}/>
                    </div>
                </div>
                </div>

                <div className='container-fluid'><br/><br/>
                    <h3>Transaction History Table</h3><br/>
                </div>
                <div className="container text-truncate">
                    <div className="row">
                        <div className="table-responsive table-striped tab-content">
                            <table className="table table-bordered">
                                <thead className='table-dark'>
                                    <tr>
                                        <th>Transaction-Id</th>
                                        <th>Date</th>
                                        <th>Project Name / Activity </th>
                                        <th>Amount</th>
                                        <th>Transaction Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transTable}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"> Withdrawing Money </h4>
                            </div>
                            <div className="modal-body">
                                <div className='form-group'>
                                    Enter Amount (USD) :
                                    <input type='text' onChange={this.handleChange} className='form-control text-center'
                                           name='debit'
                                           id='txtBid'  required />
                                </div>
                                <div className='form-group'>
                                    <input type='submit' value='Withdraw' className='form-control btn btn-success col-md-5'
                                           id='btnSubmitBid' name='submitBid' onClick={this.handleWithdraw} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="myModal1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title "> Adding Money </h4>
                            </div>
                            <div className="modal-body">
                                <form className="needs-validation" >
                                    <hr className="mb-4"/>
                                    <h4 className="mb-3">Payment</h4>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="cc-name">Name on card</label>
                                        <input type="text" className="form-control" id="cc-name" placeholder="" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="cc-number">Credit card number</label>
                                        <input type="text" className="form-control" id="cc-number" placeholder="" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="cc-number">Amount to be Paid</label>
                                        <input type="text" className="form-control text-center"
                                               name='credit' onChange={this.handleChange} />
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
                                    <div className="col-md-8 mb-3">
                                        <button className="btn btn-primary btn-lg btn-block col-md-12 mb-3"
                                                type="submit"
                                                onClick={this.handleAddMoney} >Make Payment</button>
                                    </div>
                                </form>

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

export default TransactionManager;
