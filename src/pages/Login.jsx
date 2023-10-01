import React from 'react';
import Layout from '../components/Layout';
import { StyledForm, StyledInput } from '../styles/FormsStyle';
import { useLoginForm } from '../handlers/LoginHandlers';
import { SecondaryButton, SubmitButton } from '../styles/ButtonStyle';

/**
 * LoginPage Component
 *
 * A component that renders a login page allowing users to input their
 * credentials (email and password) to login to the application.
 * Utilizes the `useLoginForm` custom hook to manage login state and submission logic.
 *
 * @component
 * @example
 *
 * return (
 *   <LoginPage />
 * )
 */
const LoginPage = () => {
  const {
    loginEmail,          // Email entered by the user
    setLoginEmail,       // Function to update the loginEmail state
    loginPassword,       // Password entered by the user
    setLoginPassword,    // Function to update the loginPassword state
    handleLogin,         // Function to handle form submission
    validationErrors,    // Array of validation error messages
  } = useLoginForm();

  return (
    <Layout>
      <StyledForm onSubmit={handleLogin}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>Login</h1>
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
        
        {/* Display validation errors if any exist */}
        {validationErrors.length > 0 && (
          <div>
            {validationErrors.map((error, index) => <div key={index}>{error}</div>)}
          </div>
        )}

        <SubmitButton type='submit'>Login</SubmitButton>
        <p>
          Don't have an account?
          <SecondaryButton to="/register">Register here</SecondaryButton>
        </p>
      </StyledForm>
    </Layout>
  );
};

export default LoginPage;
