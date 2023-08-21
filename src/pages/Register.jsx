import React, { useState } from 'react';

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
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>Username:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" required /><br />
        <label>Avatar URL:</label>
        <input type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} /><br />
        <label>Register as Venue Manager:</label>
        <input type="checkbox" checked={venueManager} onChange={(e) => setVenueManager(e.target.checked)} /><br />
        <button type="submit">Register</button>
      </form>

      <p>Already have an account?</p><a href='/login'><button>Login</button></a>
    </div>
  );
};

export default RegisterForm;
