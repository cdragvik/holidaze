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

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const VenuesContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 20px;
`

const LeftColumn = styled.div`
  flex: 0 0 30%;
`;

const RightColumn = styled.div`
  padding-top: 30px;
  flex: 0 0 65%;
`;

const ProfileHeader = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ProfileEmail = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const AvatarImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4f709c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #213555;
  }
`;

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

      <Button onClick={handleUpdateAvatar}>Update Avatar</Button>

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