import React from 'react';
import { AvatarImage, LeftColumn, ProfileEmail, ProfileHeader } from '../styles/Profile';
import { AvatarHandler } from '../handlers/AvatarHandler';

const ProfileInfo = ({ profile, setShowUpdateAvatarPage, showUpdateAvatarPage }) => {
  return (
    <LeftColumn>
      <ProfileHeader>Welcome, {profile.name}!</ProfileHeader>
      <ProfileEmail>Email: {profile.email}</ProfileEmail>
      {profile.avatar && <AvatarImage src={profile.avatar} alt="Profile Avatar" />}
      <AvatarHandler 
        profile={profile} 
        setShowUpdateAvatarPage={setShowUpdateAvatarPage} 
        showUpdateAvatarPage={showUpdateAvatarPage} 
      />
    </LeftColumn>
  );
};

export default ProfileInfo;
