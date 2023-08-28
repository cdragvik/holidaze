import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { load } from '../api/storage';
import Layout from '../components/Layout';
import VenueCreationForm from '../components/CreateVenue';
import { PageContainer, RightColumn } from '../styles/Profile';
import { DisplayVenues } from '../components/DisplayVenues';
import ProfileInfo from '../components/ProfileInfo';

const ProfilePage = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [showUpdateAvatarPage, setShowUpdateAvatarPage] = useState(false);

  useEffect(() => {
    const user = load('profile');  // Assuming load() fetches the profile correctly
    setProfile(user);
  }, []);


  if (!profile) {
    return <div>Loading profile...</div>;
  }
  
  return (
    <Layout>
      <PageContainer>

      <ProfileInfo 
          profile={profile} 
          setShowUpdateAvatarPage={setShowUpdateAvatarPage} 
          showUpdateAvatarPage={showUpdateAvatarPage} />

        <RightColumn>
          {profile.venueManager && <VenueCreationForm />}
          {profile.venueManager && <DisplayVenues name={name} />}
        
        
        </RightColumn>

      </PageContainer>
    </Layout>
  );
};

export default ProfilePage;
