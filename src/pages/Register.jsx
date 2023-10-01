import React from 'react';
import Layout from '../components/Layout';
import { RegistrationSuccess, StyledForm, StyledInput } from '../styles/FormsStyle';
import { useRegisterForm } from '../handlers/RegisterHandlers';
import { SecondaryButton, SubmitButton } from '../styles/ButtonStyle';

/**
 * RegisterPage Component
 *
 * This component renders a registration form that allows users to create a new account.
 * The registration form collects the following information from the user:
 * - Username
 * - Email
 * - Password
 * - Avatar URL (optional)
 * - A checkbox to indicate whether the user is registering as a venue manager
 *
 * The form validation and submission are handled by a custom hook named `useRegisterForm`.
 * After successful registration, a success message is displayed to the user along with a link to the login page.
 *
 * @component
 * @example
 *
 * return (
 *   <RegisterPage />
 * )
 */
const RegisterPage = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    avatar,
    setAvatar,
    venueManager,
    setVenueManager,
    handleRegister,
    isRegistered,
    validationErrors,
  } = useRegisterForm();  // Custom hook to handle form validation and submission

  return (
    <Layout>
      <StyledForm onSubmit={handleRegister}>
        <h1>Register account</h1>

        <StyledInput 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <StyledInput 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <StyledInput 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          minLength="8" 
          required 
        />
        <StyledInput 
          type="url" 
          value={avatar} 
          onChange={(e) => setAvatar(e.target.value)} 
          placeholder="Avatar URL" 
        />
        
        <div>
          <label>Register as Venue Manager:</label>
          <input 
            type="checkbox" 
            checked={venueManager} 
            onChange={(e) => setVenueManager(e.target.checked)} 
          />
        </div>

        {/* Display validation errors, if any */}
        {validationErrors.length > 0 && (
          <div>{validationErrors.map((error, index) => <div key={index}>{error}</div>)}</div>
        )}

        {/* Conditionally render the Register button or success message based on the registration status */}
        {!isRegistered && (
          <SubmitButton type="submit">Register</SubmitButton>
        )}
        
        {isRegistered && (
          <RegistrationSuccess>
            Registration successful! Welcome to Holidaze. Proceed to
            <SecondaryButton to="/login">Login</SecondaryButton>  
          </RegistrationSuccess>
        )}
        
        {/* Display login link if user is not registered yet */}
        {!isRegistered && (
          <p>
            Already have an account?
            <SecondaryButton to="/login"> Login here</SecondaryButton>
          </p>
        )}
      </StyledForm>
    </Layout>
  );
};

export default RegisterPage;
