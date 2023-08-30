import React from 'react';
import Layout from '../components/Layout';
import { SecondaryButton, StyledForm, StyledInput, SubmitButton } from '../styles/Forms';
import { useLoginForm } from '../handlers/LoginHandlers';

const LoginPage = () => {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    validationErrors,
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
        
        {validationErrors.length > 0 && <div>{validationErrors.map((error, index) => <div key={index}>{error}</div>)}</div>}

        <SubmitButton type="submit">Login</SubmitButton>
        <p>Don't have an account? <SecondaryButton><a href='/register'>Register here</a></SecondaryButton></p>
      </StyledForm>
    </Layout>
  );
};

export default LoginPage;
