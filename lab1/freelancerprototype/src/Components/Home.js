import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom' ;
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import Navigator from './Navigator';
import SignUp from './SignUp';
import AddProject from './AddProject';

const Home = () => (
    <Switch>
      <Route exact path = '/' component = {Navigator} />
      <Route path = '/SignIn' component = {SignIn} />
      <Route path = '/SignUp' component = {SignUp} />
      <Route path = '/AddProject' component = {AddProject} />
      <Route path='*' component={NotFound} /> 
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
