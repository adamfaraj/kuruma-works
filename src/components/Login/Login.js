import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { Auth } from 'aws-amplify';
import {TextField, Button, Typography} from '@material-ui/core';

import ForgotPassword from '../ForgotPassword/ForgotPassword';
import './Login.css';
import Home from '../Home/Home';

export default function Login({screenProps}) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  // const [user, setUser] = useState(null);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`${email}`);
  // }

  const handleSubmit = async event => {
    console.log(screenProps)
    event.preventDefault();
    try {
      const user = await Auth.signIn(email, password)
        // .then(
        //   render() { }
        // );
      console.log(user)
      screenProps.setUser(user);
      screenProps.setAuthStatus(true);
      // console.log('user ', user);
      // console.log('state ', this.state);
      // render() {
        // return <AppNavigator />;
      // }
      // this.props.navigation.navigate('AppNav');
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      setErrors({
        errors: {
          ...errors,
          cognito: err
        }
      });
      console.error(error);
    }
  };

  function onForgotPassword() {
    let path = `newPath`;
    // history.push('/forgot-password')
    history.push('/forgot-password')
    console.log(history);
  }

  return(
      <div className="container">
        <h1>Kuruma Works</h1>
        <form onSubmit={handleSubmit}>
            {/* <input type="email" placeholder="Email" required/> */}
            <TextField label="Email" required onChange={e => setEmail(e.target.value)}/>
            <TextField label="Password" type="password" required onChange={e => setPassword(e.target.value)}/>
            {/* <input type="password" placeholder="Password" required/> */}
            {/* <Button color="primary" onClick={onForgotPassword}>Forgot Your Password?</Button> */}
            <Link to="/forgot-password">Forgot Your Password?</Link>
            <Button type="submit" className="login-btn" variant="contained">Login</Button>
        </form>
        <Button className="register-btn" color="primary" variant="contained">Register</Button>
      </div>
  );
}
