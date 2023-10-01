import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center' }}>
      <p>An error occurred:</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
