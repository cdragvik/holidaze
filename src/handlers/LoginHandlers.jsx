import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to manage login form state and actions.
 *
 * @function
 * @returns {Object} - State and handlers associated with the login form.
 */
export const useLoginForm = () => {
  const navigate = useNavigate();  // Hook for navigation
  const [loginEmail, setLoginEmail] = useState('');  // State for email input field
  const [loginPassword, setLoginPassword] = useState('');  // State for password input field
  const [validationErrors, setValidationErrors] = useState([]);  // State to store validation errors

  /**
   * Validates the login form, checking for email format and password length.
   * 
   * @returns {boolean} - Returns true if the form is valid, false otherwise.
   */
  const validateForm = () => {
    const errors = [];  // Array to store any validation errors

    // Validate email
    if (!loginEmail.endsWith('@stud.noroff.no')) {
      errors.push('Invalid email.');
    }

    // Validate password length
    if (loginPassword.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }

    setValidationErrors(errors);  // Update state with any validation errors
    return errors.length === 0;  // Return true if no errors, false otherwise
  };

  /**
   * Handles the login form submission.
   *
   * @async
   * @param {Object} event - Event object for the form submission.
   */
  const handleLogin = async (event) => {
    event.preventDefault();  // Prevent default form submission behavior
  
    if (!validateForm()) {  // Validate form before proceeding
      return;
    }
  
    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };
  
    try {
      await login(loginData);  // Attempt login with provided data
      navigate('/');  // Navigate to home on successful login
    } catch (error) {
      console.error('Login failed:', error);  // Log error to console
      setValidationErrors([error.message]);  // Display the error message as a validation error
    }
  };

  // Expose state and handlers to be used by consumer components.
  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    validationErrors,
  };
};
