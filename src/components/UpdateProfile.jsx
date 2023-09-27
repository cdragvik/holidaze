import React, { useState } from 'react';
import { StyledForm, StyledInput } from '../styles/FormsStyle';
import { SubmitButton } from '../styles/ButtonStyle';
import { handleUpdateAvatar } from '../handlers/AvatarHandler';

const UpdateAvatarPage = ({ profile, onUpdateAvatar }) => {
  const [newAvatar, setNewAvatar] = useState('');

  const updateAvatarClickHandler = () => {
    handleUpdateAvatar(newAvatar, profile, onUpdateAvatar);
  }

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
      <SubmitButton onClick={updateAvatarClickHandler}>Update Avatar</SubmitButton>
    </StyledForm>
    </>
  );
};

export default UpdateAvatarPage;
