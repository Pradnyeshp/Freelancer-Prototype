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
  <div>
    <Switch>
      <Route exact path = '/' component = {Navigator} />
      <Route path = '/signin' component = {SignIn} />
      <Route path = '/signup' component = {SignUp} />
      <Route path = '/AddProject' component = {AddProject} />
      <Route path='*' component={NotFound} />
    </Switch>
  </div>
)

const NotFound = () => (
  <div>
{/* <Route path='*' component={NotFound} />  */ }
    <h2> 404... This page is not found</h2>
    <p>Whoops! Sorry, there is nothing to see here</p>
    <p><Link to="/">Back to Home</Link></p>
  </div>
)

export default Home;
