import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]); // Store validation errors

  const validateForm = () => {
    const errors = [];

    if (!loginEmail.endsWith('@stud.noroff.no')) {
      errors.push('Invalid email.');
    }

    if (loginPassword.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };
  
    try {
      await login(loginData); // Only proceed if this is successful
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setValidationErrors([error.message]); // Display the error message as a validation error
    }
  };
  

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    validationErrors,
  };
};

