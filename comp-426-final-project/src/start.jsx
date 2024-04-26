//this file controls the login/signup page
import React from 'react';

function Start({ setCurrentPage }) {
  const navigateToHome = () => {
    setCurrentPage('home');
  };

  function handleSignUp() {
    
    alert("Sign Up button clicked!");
    navigateToHome();
  }

  function handleLogin() {
    
    alert("Log In button clicked!");
    navigateToHome();
  }

  return (
    <>
      <h2>Sign Up</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="urmomdotcom"
        maxLength="20"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        maxLength="20"
        required
      />
      <button onClick={handleSignUp}>Sign Up</button>

      <h2>Login</h2>
      <label htmlFor="username2">Username:</label>
      <input
        type="text"
        id="username2"
        name="username2"
        placeholder="urmomdotcom"
        maxLength="20"
        required
      />
      <label htmlFor="password2">Password:</label>
      <input
        type="password"
        id="password2"
        name="password2"
        placeholder="password"
        maxLength="20"
        required
      />
      <button onClick={handleLogin}>Log In</button>
    </>
  );
}

export default Start;