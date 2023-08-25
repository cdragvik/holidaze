import { useState } from 'react';
import { BASE_URL } from '../api/Constants';

export const useRegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [venueManager, setVenueManager] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    const registrationData = {
      name,
      email,
      password,
      avatar,
      venueManager,
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Registration successful:', responseData);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
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
  };
};
