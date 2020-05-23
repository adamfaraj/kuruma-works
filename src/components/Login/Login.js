import React from 'react';
import './Login.css';

export default function Login() {
  return(
    <div class="container">
      <h2>Kuruma Works</h2>
      <form>
          <input type="email" placeholder="Email" required/>
          <input type="password" placeholder="Password" required/>
      </form>
    </div>
  );
}
