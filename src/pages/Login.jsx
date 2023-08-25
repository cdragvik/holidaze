import React, { useState } from 'react';
import Layout from '../components/Layout';
import { styled } from 'styled-components';
import { login } from '../api/auth';


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 30px auto;
    background-color: #f5efe7;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const StyledButton = styled.button`
    padding: 10px;
    background-color: #4f709c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #213555;
    }
`;

const LoginForm = () => {
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      await login(loginData); 
      window.location.href = "/";

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Layout>
      <StyledForm onSubmit={handleLogin}>

          <h1>Login</h1>

          <StyledInput type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" required />
          <StyledInput type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" required />
          <StyledButton type="submit">Login</StyledButton>
          
          <p>Don't have an account?</p> <a href='/register'>Register here</a>

        </StyledForm>
  
        
      </Layout>
    );
  };
  
  export default LoginForm;