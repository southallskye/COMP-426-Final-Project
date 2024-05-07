//this file controls the login/signup page
import React from 'react';

function Start({ setCurrentPage }) {
  const navigateToHome = () => {
    setCurrentPage('home');
  };

    function handleSignUp() {
      //POST username and password

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      //send username and password to server
      fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then((response) => {
        //user already exists error
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.error);
          });
        }
        return response.json();
      })
      .then(() => {
        localStorage.setItem('username', username);
        // handle successful response
        // how to send username data to home
        navigateToHome();
      })
      .catch(error => {
        // handle error
        alert(error.message);
      });
    }

    async function handleLogin() {
      //send a login request to the server
      const username = document.getElementById('username2').value;
      const password = document.getElementById('password2').value;

      fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(async (response) => {
        //user does not exist error
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.error);
          });
        }
        return response.json();
      })
      .then(() => {
        localStorage.setItem('username', username);
        // handle successful response
        // how to send username data to home
        navigateToHome();
      })
      .catch(error => {
        // handle 
        alert(error.message);
      });
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