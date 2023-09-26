import React, { useState } from 'react';
import { save } from '../api/storage';
import { Card, StyledInput } from '../styles/FormsStyle';
import { SubmitButton } from '../styles/ButtonStyle';

const UpdateAvatarPage = ({ profile, onUpdateAvatar }) => {
  const [newAvatar, setNewAvatar] = useState('');

  const handleUpdateAvatar = () => {
    // Update the avatar in the profile
    profile.avatar = newAvatar;
    save('profile', profile);

    // Call the parent function to trigger an update
    onUpdateAvatar();

    // Redirect back to the profile page
    window.location.href = `/profile/${profile.name}`;
  };

  return (
    <>
    <Card>
      <h2>Update Avatar</h2>
      <StyledInput
        type="text"
        placeholder="New Avatar URL"
        value={newAvatar}
        onChange={e => setNewAvatar(e.target.value)}
      />
      <SubmitButton onClick={handleUpdateAvatar}>Update Avatar</SubmitButton>
    </Card>

    </>
  );
};

export default UpdateAvatarPage;
