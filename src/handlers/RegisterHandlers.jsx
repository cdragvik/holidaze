import { useState } from "react";
import { BASE_URL } from "../api/Constants";

/**
 * Custom hook to manage registration form state and actions.
 *
 * @function
 * @returns {Object} - State and handlers associated with the registration form.
 */
export const useRegisterForm = () => {
  const [name, setName] = useState('');  // State for name input field
  const [email, setEmail] = useState('');  // State for email input field
  const [password, setPassword] = useState('');  // State for password input field
  const [avatar, setAvatar] = useState('');  // State for avatar input field
  const [venueManager, setVenueManager] = useState(false);  // State for venue manager toggle
  const [isRegistered, setIsRegistered] = useState(false);  // State to track registration success
  const [validationErrors, setValidationErrors] = useState([]);  // State to store validation errors

  /**
   * Validates the registration form, checking for email format and password length.
   * 
   * @returns {boolean} - Returns true if the form is valid, false otherwise.
   */
  const validateForm = () => {
    const errors = [];  // Array to store any validation errors

    // Validate email includes '@' symbol
    if (!email.includes('@')) {
      errors.push('Invalid email format.');
    }

    // Validate email domain
    if (!email.endsWith('stud.noroff.no')) {
      errors.push('Users must register with a stud.noroff.no email.');
    }

    // Validate password length
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }

    setValidationErrors(errors);  // Update state with any validation errors
    return errors.length === 0;  // Return true if no errors, false otherwise
  };

  /**
   * Handles the registration form submission.
   *
   * @async
   * @param {Object} event - Event object for the form submission.
   */
  const handleRegister = async (event) => {
    event.preventDefault();  // Prevent default form submission behavior

    if (!validateForm()) {  // Validate form before proceeding
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
        setIsRegistered(true);  // Update registration success state
      } else {
        console.error('Registration failed');
        setIsRegistered(false);  // Update registration success state
      }
    } catch (error) {
      console.error('Error:', error);
      setIsRegistered(false);  // Update registration success state
    }
  };

  // Expose state and handlers to be used by consumer components.
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
