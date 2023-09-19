import { useState } from "react";
import { BASE_URL } from "../api/Constants";

export const useRegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [venueManager, setVenueManager] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]); // Store validation errors

  const validateForm = () => {
    const errors = [];

    // Validate email
    if (!email.includes('@')) {
      errors.push('Invalid email format.');
    }

    if (!email.endsWith('stud.noroff.no')) {
      errors.push('Users must register with a stud.noroff.no email.');
    }

    // Validate password length
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }

    setValidationErrors(errors);

    return errors.length === 0;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        setIsRegistered(true);
      } else {
        console.error('Registration failed');
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsRegistered(false);
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
    isRegistered,
    validationErrors,
  };
};
