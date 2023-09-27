import React, { useState } from 'react';
import { save } from '../api/storage';
import { StyledForm, StyledInput } from '../styles/FormsStyle';
import { SubmitButton } from '../styles/ButtonStyle';

const UpdateAvatarPage = ({ profile, onUpdateAvatar }) => {
  const [newAvatar, setNewAvatar] = useState('');

  const handleUpdateAvatar = () => {
    
    profile.avatar = newAvatar;
    save('profile', profile);

    onUpdateAvatar();

    window.location.href = `/profile/${profile.name}`;
  };

  return (
    <>
    <StyledForm>
      <h2>Update Avatar</h2>
      <StyledInput
        type="text"
        placeholder="New Avatar URL"
        value={newAvatar}
        onChange={e => setNewAvatar(e.target.value)}
      />
      <SubmitButton onClick={handleUpdateAvatar}>Update Avatar</SubmitButton>
    </StyledForm>
    </>
  );
};

export default UpdateAvatarPage;
