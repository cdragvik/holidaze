import React, { useState } from 'react';

import { SubmitButton } from '../styles/Forms';
import UpdateAvatarPage from '../pages/UpdateProfile';

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
