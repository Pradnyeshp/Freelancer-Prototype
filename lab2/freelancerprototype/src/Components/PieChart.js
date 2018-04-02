import React, { Component } from 'react';
import ReactSvgPieChart from "react-svg-piechart"
import axios from "axios/index";
import './userhome.css'

class PieChart extends Component {

    constructor () {
        super();
        this.state = ({
            debitArray: [],
            creditArray: []
        })
    }

    componentWillMount = () => {

        const u = {
            u : localStorage.getItem('username')
        }

        axios.post('http://localhost:3001/gettranstypeDebit', u , { withCredentials : true } )
            .then((response) => {
                console.log('In Tras History', response.data)
                this.setState({
                    debitArray : response.data
                }, () => {
                    console.log('After Getting Trans History', this.state)
                })
            })

        axios.post('http://localhost:3001/gettranstypeCredit', u , { withCredentials : true } )
            .then((response) => {
                console.log('In Tras History', response.data)
                this.setState({
                    creditArray : response.data
                }, () => {
                    console.log('After Getting Trans History', this.state)
                })
            })
    }

render() {

    let debit = 0,
          credit = 0

    for(let i=0;  i < this.state.debitArray.length; i++ )
        {
            debit = debit + this.state.debitArray[i].amount
        }
        console.log(debit)

    for(let i=0;  i < this.state.creditArray.length; i++ )
    {
        credit = credit + this.state.creditArray[i].amount
    }
    console.log(credit)

        const data = [
            {title: "Debit", value: debit, color: '#EF3B3A' } ,
            {title: "Credit", value: credit, color: "#4CAF50"}
        ]

        return (
            <div className="container-fluid piechart col-md-10"><br/>
                <h3>Pie Chart</h3>
                <div className='row'>

                <div className='container-fluid col-sm-5'>
                <ReactSvgPieChart
                    data = { data }
                    expandOnHover={true}
                    expandSize={5}
                    shrinkOnTouchEnd={true}
                    strokeColor="#fff"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    viewBoxSize={100}
                />
                </div>
                    <div className='container-fluid col-sm-3'>
                        <div className='debit col-sm-7'>
                            <input className='form-control text-dark' id='credit' type="text" value='Debit' />
                            <input className='form-control text-dark' id='debit' type="text" value='Credit' />
                        </div>
                    </div>
            </div>
            </div>
        );
    }
}

export default PieChart;
