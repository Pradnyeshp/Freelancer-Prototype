import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom' ;
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import Navigator from './Navigator';
import SignUp from './SignUp';
import AddProject from './AddProject';
import Profile from './Profile';
import Userhome from './Userhome';
import Navbar from './Navbar';
import ProjectDetails from './ProjectDetails'
import Dashboard from './Dashboard'
import FreelancerDashboard from './FreelancerDashboard'
import RelevantProjects from "./RelevantProjects";
import Payment from "./Payment";

const Home = () => (
  <div>
    <Switch>
      <Route exact path = '/' component = {Navigator} />
      <Route path = '/signin' component = {SignIn} />
      <Route path = '/signup' component = {SignUp} />
      <Route path = '/addproject' component = {AddProject} />
      <Route path = '/profile/:value/' component = {Profile} />
      <Route path = '/dashboard' component={Dashboard} />
      <Route path = '/freelancerdashboard' component={FreelancerDashboard} />
      <Route path = '/userhome' component = {Userhome} /> 
      <Route path = '/Navbar' component = {Navbar} />
      <Route path = '/projectdetails/:value/' component={ProjectDetails} />
      <Route path = '/relevantprojects' component={RelevantProjects} />
      <Route path = '/payment/:value' component={Payment} />
      <Route path = '*' component = {NotFound} />
    </Switch>
  </div>
)

const NotFound = () => (
  <div><br/>
    <h2> 404... This page is not found</h2>
    <p> Whoops! Sorry, there is nothing to see here </p>
    <p><Link to="/">Back to Home</Link></p>
  </div>
)

export default Home;
