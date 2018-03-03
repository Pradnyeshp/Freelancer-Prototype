import React, { Component } from 'react'
import './App.css'
import { Switch,Route,Link } from 'react-router-dom'
import SignIn from './SignIn'
import Navigator from './Navigator'
import SignUp from './SignUp'

const Home = () => (
    <Switch>
      <Route exact path = '/' component = {Navigator} />
      <Route exact path = '/SignIn' component = {SignIn} />
      <Route exact path = '/SignUp' component = {SignUp} />
      <Route exact path='*' component={NotFound} /> 
    </Switch>
)

const NotFound = () => (
  <div>
    <h2> 404... This page is not found</h2>
    <p>Whoops! Sorry, there is nothing to see here</p>
    <p><Link to="/">Back to Home</Link></p>
  </div>
)

export default Home;
