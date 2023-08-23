import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getBookingsByProfile, getVenuesByProfile } from '../api/Constants';
import { load } from '../api/storage';


const ProfilePage = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    // Load profile data from local storage or your authentication context
    const user = load('profile');
    setProfile(user);

    // Fetch bookings and venues if the user is a customer or venue manager
    if (user && (user.venueManager || user.customer)) {
      if (user.customer) {
        getBookingsByProfile(name)
          .then(data => setBookings(data))
          .catch(error => console.error('Error fetching bookings:', error));
      }
      if (user.venueManager) {
        getVenuesByProfile(name)
          .then(data => setVenues(data))
          .catch(error => console.error('Error fetching venues:', error));
      }
    }
  }, [name]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      <p>Email: {profile.email}</p>
      {profile.avatar && <img src={profile.avatar} alt="Profile Avatar" />}

      {/* Display upcoming bookings for customers */}
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

      {/* Display venue management options for venue managers */}
      {venues.length > 0 && profile.venueManager && (
        <div>
          <h2>Your Managed Venues:</h2>
          <ul>
            {venues.map(venue => (
              <li key={venue.id}>{venue.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
