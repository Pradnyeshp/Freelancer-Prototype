import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: 0,
      val2: 0,
      result: 0
    };
    this.handleOp = this.handleOp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name] : value
    })
  }

  handleOp(e) {
    e.preventDefault();

    let val = e.target.id;
    
    const operation = {
      op1: this.state.val1,
      op2: this.state.val2,
      op: val
    }
    
    axios.post('http://localhost:3001/operations', operation)
      .then((response) => {
        console.log(response.data)
        this.setState({
          result: response.data
        })
      })
  }

  render() {
    return (
      <div className="App" ><br/>
        <Helmet>
          <style>{'body { background-color: 	rgb(245,245,245); }'}</style>
        </Helmet>
        <h1>Basic Calculator</h1><br/>
          <form>
          <div className="form-group">
            <label> Value 1 :
              <input type="text" className="form-control" name="val1" onChange={this.handleChange.bind(this)} required />
            </label>
              <br /><br />
            <label> Value 2 :
              <input type="text" className="form-control" name='val2' onChange={this.handleChange.bind(this)} required />
            </label><br/><br />
            <div className="btn-group">
              <Button className='btn btn-primary' onClick={this.handleOp.bind(this)} id="add">Addition</Button> 
              <button className='btn btn-primary' onClick={this.handleOp.bind(this)} id="sub">Subtraction</button>
              <button className='btn btn-primary' onClick={this.handleOp.bind(this)} id="mul">Multiplication</button>
              <button className='btn btn-primary' onClick={this.handleOp.bind(this)} id="div">Division</button>
            </div><br /> <br />
            <label> Result :
                <input type="text" className="form-control" ref="result" value={this.state.result} readOnly/>
            </label>
          </div>
          </form>
      </div>
    );
  }
}
export default App;