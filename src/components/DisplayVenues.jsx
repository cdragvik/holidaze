import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api/Constants';
import VenueCard from '../components/VenueCard';
import { VenuesContainer } from '../styles/ProfileStyle';
import { CardWrapper, Container } from '../styles/Cards';
import { SecondaryButton } from '../styles/ButtonStyle';

/**
 * DisplayVenues Component
 *
 * This component fetches and displays venues managed by a user based on their profile name.
 *
 * @param {string} name - The name of the user whose managed venues need to be displayed.
 * @returns {JSX.Element} - A React component that displays the managed venues.
 */
export const DisplayVenues = ({ name }) => {
  // Using the useState hook to declare a state variable 'venues' with an initial value of an empty array
  const [venues, setVenues] = useState([]);

  /**
   * Fetches venues based on the profile name.
   *
   * @param {string} name - The name of the user whose managed venues need to be fetched.
   * @returns {Promise<Array>} - A Promise that resolves to an array of venues.
   */
  async function getVenuesByProfile(name) {
    const url = `${BASE_URL}/profiles/${name}/venues`;  // Constructing the URL
    const token = localStorage.getItem('token');  // Getting the token from localStorage
    const response = await fetch(url, {  // Fetching data from the API
      headers: {
        'Authorization': `Bearer ${token}`,  // Adding Authorization header with the token
      },
    });
    const data = await response.json();  // Parsing the JSON response
    return data;  // Returning the parsed data
  }

  // Using the useEffect hook to call getVenuesByProfile when the component mounts or the 'name' prop changes
  useEffect(() => {
    getVenuesByProfile(name)
      .then(data => {
        setVenues(data);  // Updating the 'venues' state variable with the fetched data
      })
      .catch(error => console.error('Error fetching venues:', error));  // Logging any errors to the console
  }, [name]);  // Dependency array containing 'name' to trigger the useEffect hook whenever 'name' changes

  return (
    <Container>
      <h2>Your Managed Venues:</h2>
      <VenuesContainer>
        {venues.length > 0 ? (
          venues.map(venue => (
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
          ))
        ) : (
          <div>
            <p>You have no managed venues yet.</p>
          </div>
        )}
      </VenuesContainer>
    </Container>
  );
};
