import React, { useState } from 'react';
import UpdateAvatarPage from '../pages/UpdateProfile';
import { SubmitButton } from '../styles/ButtonStyle';

export const AvatarHandler = ({ profile, setShowUpdateAvatarPage, showUpdateAvatarPage }) => {
  const handleUpdateAvatar = () => {
    setShowUpdateAvatarPage(true);
  };

  return (
    <>
      <SubmitButton onClick={handleUpdateAvatar}>Update Avatar</SubmitButton>
      {showUpdateAvatarPage && (
        <UpdateAvatarPage profile={profile} onUpdateAvatar={() => setShowUpdateAvatarPage(false)} />
      )}
    </>
  );
};
