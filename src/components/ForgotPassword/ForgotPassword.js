import React, { useState } from 'react'

import AWS from 'aws-sdk'
import { TextField, Button, FormGroup } from '@material-ui/core'

import awsConfig from '../../aws-exports'
import './ForgotPassword.css'
// import { CognitoIdentityServiceProvider } from 'aws-sdk';


export default function ForgotPassword() {
  AWS.config.update({region:'us-east-1'});
  // React Hooks
  const [email, setEmail] = useState('');
  const [sentCode, setSentCode] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  function onSendCode() {
    var params = {
      ClientId: awsConfig.APP_CLIENT_ID,
      Username: email,
    };
    cognitoidentityserviceprovider.forgotPassword(params, function(err, data) {
      if (err) {
        console.log(err, err.stack) // an error occurred 
      }
      else {
        console.log(data); // successful response
        setSentCode(true);
      }
    });
  }

  function resetPassword(e) {
    e.preventDefault();
    var params = {
      ClientId: awsConfig.APP_CLIENT_ID, /* required */
      ConfirmationCode: code, /* required */
      Password: password, /* required */
      Username: email, /* required */
    }
    cognitoidentityserviceprovider.confirmForgotPassword(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    })
  }

  return (
    <div className="container">
      <h1 align='center'>Forgot Your Password?</h1>
      <p>Enter your email address below and we'll email you a verification code.</p>
      <TextField label="Email" required onChange={e => setEmail(e.target.value)}/>
      <Button onClick={onSendCode}>Send Verification Code</Button>
      <div>
        {sentCode && (
          <form onSubmit={resetPassword}>
            <TextField label="Verification Code" onChange={e => setCode(e.target.value)}/>
            <TextField label="Password" onChange={e => setPassword(e.target.value)}/>
            <TextField label="Verification Password" onChange={e => setConfirmPassword(e.target.value)}/>
            <Button type="submit">Change Password</Button>
          </form>
        )}
      </div>
    </div>
  )
}
