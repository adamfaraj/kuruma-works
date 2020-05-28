import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './App.css';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

// AWS amplify stuff
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.REGION,
    userPoolId: awsConfig.USER_POOL_ID,
    userPoolWebClientId: awsConfig.APP_CLIENT_ID
  }
});


function App() {
  // React Hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  function setAuthStatus(authenticated) {
    // this.setState({ isAuthenticated: authenticated });
    setIsAuthenticated(authenticated);
  }

  function setAWSUser(user) {
    // this.setState({ user: user });
    setUser(user);
    console.log('app state', this.state);
  }

  const authProps = {
    isAuthenticated: isAuthenticated,
    user: user,
    setAuthStatus: setAuthStatus,
    setUser: setAWSUser
  }

  if(isAuthenticated) {
    return <Home />;
  }
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Login screenProps={authProps}/>
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
