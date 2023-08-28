import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api/Constants';
import VenueCard from '../components/VenueCard';
import { VenuesContainer } from '../styles/Profile';
import { CardWrapper } from '../pages/Home';

export const DisplayVenues = ({ name }) => {
  const [venues, setVenues] = useState([]);

  async function getVenuesByProfile(name) {
    const url = `${BASE_URL}/profiles/${name}/venues`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getVenuesByProfile(name)
      .then(data => {
        setVenues(data);
      })
      .catch(error => console.error('Error fetching venues:', error));
  }, [name]);

  return (
    <div>
      <h2>Your Managed Venues:</h2>
      <VenuesContainer>
        {venues.map(venue => (
          <CardWrapper key={venue.id} to={`/venues/${venue.id}`}>
            <VenueCard
              imageSrc={venue.media[0]}
              city={venue.location.city}
              country={venue.location.country}
              title={venue.name}
              rating={venue.rating}
              price={venue.price}>
              {venue.name}
            </VenueCard>
          </CardWrapper>
        ))}
      </VenuesContainer>
    </div>
  );
};
