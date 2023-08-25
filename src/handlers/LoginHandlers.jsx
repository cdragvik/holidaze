import { useState } from 'react';
import { login } from '../api/auth';

export const useLoginForm = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      await login(loginData);
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
  };
};
