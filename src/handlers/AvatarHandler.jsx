// Import necessary dependencies, components, and styles
import React from 'react';
import UpdateAvatarPage from '../components/UpdateProfile';
import { SubmitButton } from '../styles/ButtonStyle';
import Modal from '../components/Modal';

// Define the AvatarHandler component
export const AvatarHandler = ({ profile, setShowUpdateAvatarPage, showUpdateAvatarPage }) => {

  // Handler to show the Update Avatar modal
  const handleUpdateAvatar = () => {
    setShowUpdateAvatarPage(true);
  };

  // Handler to close the Update Avatar modal
  const handleUpdateAvatarClose = () => {
    setShowUpdateAvatarPage(false);
  };

  return (
    <>
      {/* Button to trigger the display of Update Avatar modal */}
      <SubmitButton onClick={handleUpdateAvatar}>Update Avatar</SubmitButton>
      
      {/* Modal component to show the UpdateAvatarPage component */}
      <Modal show={showUpdateAvatarPage} onClose={handleUpdateAvatarClose}>
        {/* UpdateAvatarPage component with profile and callback as props */}
        <UpdateAvatarPage profile={profile} onUpdateAvatar={handleUpdateAvatarClose} />
      </Modal>
    </>
  );
};