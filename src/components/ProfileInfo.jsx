// Import necessary dependencies and styles
import React from 'react';
import { AvatarImage, ProfileHeader } from '../styles/ProfileStyle';
import { AvatarHandler } from '../handlers/AvatarHandler';

// Define the ProfileInfo component
const ProfileInfo = ({ profile, setShowUpdateAvatarPage, showUpdateAvatarPage }) => {
  return (
    <>
      <ProfileHeader>Welcome, {profile.name}!</ProfileHeader>
      {profile.avatar && <AvatarImage src={profile.avatar} alt="Profile Avatar" />}
      <AvatarHandler 
        profile={profile} 
        setShowUpdateAvatarPage={setShowUpdateAvatarPage} 
        showUpdateAvatarPage={showUpdateAvatarPage} 
      />
    </>
  );
};

// Export the ProfileInfo component
export default ProfileInfo;
