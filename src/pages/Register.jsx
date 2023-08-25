import React from 'react';
import Layout from '../components/Layout';
import { StyledForm, StyledInput, SubmitButton } from '../styles/Forms';
import { useRegisterForm } from '../handlers/RegisterHandlers';

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
  } = useRegisterForm();

  return (
    <Layout>
      <StyledForm onSubmit={handleRegister}>
        <h1>Register</h1>
        <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" required />
        <StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength="8" required />
        <StyledInput type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Avatar URL" />
        <div>
          <label>Register as Venue Manager:</label>
          <input type="checkbox" checked={venueManager} onChange={(e) => setVenueManager(e.target.checked)} />
        </div>
        <SubmitButton type="submit">Register</SubmitButton>
        <p>Already have an account?</p><a href='/login'> Login here</a>
      </StyledForm>
    </Layout>
  );
};

export default RegisterPage;

