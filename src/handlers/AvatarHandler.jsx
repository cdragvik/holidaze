import React from 'react';
import UpdateAvatarPage from '../components/UpdateProfile';
import { SubmitButton } from '../styles/ButtonStyle';
import Modal from '../components/Modal';


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
