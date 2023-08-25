import React from 'react';
import Layout from '../components/Layout';
import { StyledForm, StyledInput, SubmitButton } from '../styles/Forms';
import { useLoginForm } from '../handlers/LoginHandlers';


const LoginPage = () => {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
  } = useLoginForm();

  return (
    <Layout>
      <StyledForm onSubmit={handleLogin}>
        <h1>Login</h1>
        <StyledInput
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <StyledInput
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <SubmitButton type="submit">Login</SubmitButton>
        <p>Don't have an account?</p>
        <a href='/register'>Register here</a>
      </StyledForm>
    </Layout>
  );
};

export default LoginPage;
