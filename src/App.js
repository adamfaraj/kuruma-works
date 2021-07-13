import React, { useState } from 'react';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EventIcon from '@material-ui/icons/Event';
import BuildIcon from '@material-ui/icons/Build';
import PersonIcon from '@material-ui/icons/Person';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignIn, AmplifyAuthenticator, AmplifySignUp, AmplifyConfirmSignUp } from '@aws-amplify/ui-react';
import awsConfig from './aws-exports';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './App.css';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Mechanics from './components/Mechanics/Mechanics';
import Profile from './components/Profile/Profile';

// AWS amplify stuff
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.REGION,
    userPoolId: awsConfig.USER_POOL_ID,
    userPoolWebClientId: awsConfig.APP_CLIENT_ID
  }
});

const addKurumaUrl = "https://5n15ch3u0f.execute-api.us-east-1.amazonaws.com/beta/kuruma";

async function confirmSignUp(e) {
  debugger;
  const { username, code } = e.target;
  console.log(username);
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}

const App = () => (
  // React Hooks
  <AmplifyAuthenticator usernameAlias="email">
    <AmplifySignIn 
      headerText="Sign Into Your Kuruma Account"
      slot="sign-in"/>
    <AmplifySignUp
      headerText="Create a Kuruma Account"
      slot="sign-up"
      usernameAlias="email"
    />
    <AmplifyConfirmSignUp
      headerText="Confirm Your Kuruma Account"
      slot="confirm-sign-up"
      // handleSubmit={event => confirmSignUp(event)}
    >
    </AmplifyConfirmSignUp>
    <Router>
      <div className="wrapper">

        <Switch>
          <Route exact path="/">
            <Home Auth={Auth} />
          </Route>
          <Route path="/mechanics">
            <Mechanics />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>

        <ul className="navigation">
          <li>
            <DriveEtaIcon />
            <Link to="/">Your Kuruma</Link>
          </li>
          <li>
            <EventIcon />
            <Link to="/appointments">Appointments</Link>
          </li>
          <li>
            <BuildIcon />
            <Link to="/mechanics">Mechanics</Link>
          </li>
          <li>
            <PersonIcon />
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>

    </Router>
  </AmplifyAuthenticator>
)

// export default withAuthenticator(App, {
//   // theme: Bootstrap,
//   usernameAttributes: 'email'
// });

export default (App);