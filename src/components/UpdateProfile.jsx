import React, { useState } from 'react';
import { StyledForm, StyledInput } from '../styles/FormsStyle';
import { SubmitButton } from '../styles/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import { save } from '../api/storage';

const UpdateAvatarPage = ({ profile, onUpdateAvatar }) => {
  const [newAvatar, setNewAvatar] = useState('');
  const navigate = useNavigate();

  const updateAvatarClickHandler = () => {
    profile.avatar = newAvatar;
    save('profile', profile);
    onUpdateAvatar();
    navigate(`/profile/${profile.name}`);
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
