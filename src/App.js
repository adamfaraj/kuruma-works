import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Amplify from 'aws-amplify';
import { withAuthenticator, AmplifySignOut, AmplifySignIn, AmplifyAuthenticator } from '@aws-amplify/ui-react';
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


const App = () => (
  // React Hooks
    <AmplifyAuthenticator>
      <Router>
        <div className="wrapper">

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/mechanics">
              <Mechanics />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>

          <ul>
            <li>
              <Link to="/">Your Kuruma</Link>
            </li>
            <li>
              <Link to="/mechanics">Mechanics</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </Router>
    </AmplifyAuthenticator>
)

export default withAuthenticator(App);
