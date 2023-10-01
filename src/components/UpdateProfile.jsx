// Import necessary dependencies and styles
import React, { useState } from 'react';
import { StyledForm, StyledInput } from '../styles/FormsStyle';
import { SubmitButton } from '../styles/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import { save } from '../api/storage';

// Define the UpdateAvatarPage component
const UpdateAvatarPage = ({ profile, onUpdateAvatar }) => {
  // State hook for holding the new avatar URL
  const [newAvatar, setNewAvatar] = useState('');
  // Hook for programmatically navigating
  const navigate = useNavigate();

  // Handler for the avatar update click event
  const updateAvatarClickHandler = () => {
    // Update the profile object with the new avatar
    profile.avatar = newAvatar;
    // Save the updated profile object to storage
    save('profile', profile);
    // Call the passed in onUpdateAvatar function
    onUpdateAvatar();
    // Navigate to the user's profile page
    navigate(`/profile/${profile.name}`);
  }

  return (
    <>
      <StyledForm>
        <h2>Update Avatar</h2>
        {/* Input field for the new avatar URL */}
        <StyledInput
          type="text"
          placeholder="New Avatar URL"
          value={newAvatar}
          onChange={e => setNewAvatar(e.target.value)}
        />
        {/* Button to trigger the avatar update */}
        <SubmitButton onClick={updateAvatarClickHandler}>Update Avatar</SubmitButton>
      </StyledForm>
    </>
  );
};

// Export the UpdateAvatarPage component
export default UpdateAvatarPage;
