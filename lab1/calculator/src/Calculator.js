import React, { Component } from 'react';
import './App.css';

class Calculator extends Component {

    constructor(props){
        super(props);
        this.state={
            val1: '0',
            val2: '0',
            result: ''
        }   
    }

    handleOp(e) {
        e.preventDefault();

        let val = e.target.id;

        if (val === 'add') {
            
        }
        if (val === 'sub') {

        }
        if (val === 'mul') {

        }
        if (val === 'div') {

        }

    }

    render() {
        return (
            <div className="Calaculator">
                <h2>Calculator</h2>
                <form>
                    <label> Value 1:
                        <input type="text" ref="v1" required/>
                    </label>
                    <br /><br />
                    <label> Value 2:
                        <input type="text" ref="v2" required/>
                    </label>
                    <br /><br />
                        <button onClick={this.handleOp.bind(this)} id="add">Add</button>
                        <button onClick={this.handleOp.bind(this)} id="sub">Add</button>
                        <button onClick={this.handleOp.bind(this)} id="mul">Add</button>
                        <button onClick={this.handleOp.bind(this)} id="div">Add</button>
                        <br/> <br/>
                    <label> Result:
                        <input type="text" ref="result" />
                    </label>
                    
                </form>
            </div>
        );
    }
}

export default Calculator;
