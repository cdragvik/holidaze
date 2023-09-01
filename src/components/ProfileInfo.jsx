import React from 'react';
import { AvatarImage, LeftColumn, ProfileEmail, ProfileHeader } from '../styles/Profile';
import { AvatarHandler } from '../handlers/AvatarHandler';

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

export default ProfileInfo;
