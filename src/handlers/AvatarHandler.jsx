import React from 'react';
import UpdateAvatarPage from '../components/UpdateProfile';
import { SubmitButton } from '../styles/ButtonStyle';
import Modal from '../components/Modal';
import { save } from '../api/storage';

export const handleUpdateAvatar = (newAvatar, profile, onUpdateAvatar) => {
    
  profile.avatar = newAvatar;
  save('profile', profile);

  onUpdateAvatar();

  window.location.href = `/profile/${profile.name}`;
};

export const AvatarHandler = ({ profile, setShowUpdateAvatarPage, showUpdateAvatarPage }) => {
  const handleUpdateAvatar = () => {
    setShowUpdateAvatarPage(true);
  };

  const handleUpdateAvatarClose = () => {
    setShowUpdateAvatarPage(false);
  };

  return (
    <>
      <SubmitButton onClick={handleUpdateAvatar}>Update Avatar</SubmitButton>
      <Modal show={showUpdateAvatarPage} onClose={handleUpdateAvatarClose}>
        <UpdateAvatarPage profile={profile} onUpdateAvatar={handleUpdateAvatarClose} />
      </Modal>
    </>
  );
};
