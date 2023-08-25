import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { BASE_URL } from '../api/Constants';
import { load } from '../api/storage';
import UpdateAvatarPage from './UpdateProfile';
import Layout from '../components/Layout';
import VenueCreationForm from '../components/CreateVenue';
import { CardWrapper } from './Home';
import VenueCard from '../components/VenueCard';
import { SubmitButton } from '../styles/Forms';
import { AvatarImage, LeftColumn, PageContainer, ProfileEmail, ProfileHeader, RightColumn, VenuesContainer } from '../styles/Profile';

const ProfilePage = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [showUpdateAvatarPage, setShowUpdateAvatarPage] = useState(false);

   async function getBookingsByProfile(name) {
    const url = `${BASE_URL}/profiles/${name}/bookings`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
  
  async function getVenuesByProfile(name) {
    const ManagerUrl = `${BASE_URL}/profiles/${name}/venues`;
    const token = localStorage.getItem("token");  // Fetch the token from local storage
    
    const response = await fetch(ManagerUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const user = load('profile');
    setProfile(user);

    if (user && (user.venueManager || user.customer)) {
      if (user.customer) {
        getBookingsByProfile(name)
          .then(data => setBookings(data))
          .catch(error => console.error('Error fetching bookings:', error));
      }
      if (user.venueManager) {
        getVenuesByProfile(name)
          .then(data => {        
          setVenues(data);
        })
        .catch(error => console.error('Error fetching venues:', error));
      }
    }
  }, [name]);

  const handleUpdateAvatar = () => {
    setShowUpdateAvatarPage(true);
  };

  const handleVenueCreation = (newVenue) => {

  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <Layout>
    <PageContainer>
      
      <LeftColumn>
      <ProfileHeader>Welcome, {profile?.name}!</ProfileHeader>
      <ProfileEmail>Email: {profile?.email}</ProfileEmail>
      {profile?.avatar && <AvatarImage src={profile?.avatar} alt="Profile Avatar" />}

      <SubmitButton onClick={handleUpdateAvatar}>Update Avatar</SubmitButton>

      {showUpdateAvatarPage && (
        <UpdateAvatarPage profile={profile} onUpdateAvatar={() => setShowUpdateAvatarPage(false)} />
      )}
      </LeftColumn>

      <RightColumn>
      {profile?.venueManager && (
          <VenueCreationForm onSubmitVenue={handleVenueCreation} />
        )}

      {bookings.length > 0 && profile.customer && (
        <div>
          <h2>Your Upcoming Bookings:</h2>
          <ul>
            {bookings.map(booking => (
              <li key={booking.id}>
                {booking.dateFrom} to {booking.dateTo}
              </li>
            ))}
          </ul>
        </div>
      )}

      {venues.length > 0 && profile.venueManager && (
        <div>
          <h2>Your Managed Venues:</h2>
          <VenuesContainer>
            {venues.map(venue => (
              <CardWrapper key={venue.id} to={`/venues/${venue.id}`}>
              <VenueCard               imageSrc={venue.media[0]}
              city={venue.location.city}
              country={venue.location.country}
              title={venue.name}
              rating={venue.rating}
              price={venue.price}>{venue.name}</VenueCard></CardWrapper>
            ))}
          </VenuesContainer>
        </div>
      )}
      
      </RightColumn>
</PageContainer>
</Layout>

  );
};

export default ProfilePage;