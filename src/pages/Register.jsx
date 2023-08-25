import React, { useState } from 'react';
import Layout from '../components/Layout';
import { styled } from 'styled-components';
import { BASE_URL } from '../api/Constants';

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


const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [venueManager, setVenueManager] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    const registrationData = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
      venueManager: venueManager,
    };

    try {
      const response = await fetch(BASE_URL+'/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle successful registration and store token in localStorage
        console.log('Registration successful:', responseData);
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

        <StyledButton type="submit">Register</StyledButton>

        <p>Already have an account?</p><a href='/login'> Login here</a>
      </StyledForm>

    </Layout>
  );
};

export default RegisterForm;
