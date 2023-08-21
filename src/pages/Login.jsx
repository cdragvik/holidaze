import React, { useState } from 'react';
import Layout from '../components/Layout';

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle successful login and store token in localStorage
        console.log('Login successful:', responseData);
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required /><br />
        <label>Password:</label>
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required /><br />
        <button type="submit">Login</button>
      </form>

      <p>Dont have an account? Register here:</p><a href='/register'><button>Register</button></a>
    </Layout>
  );
};

export default LoginForm;
