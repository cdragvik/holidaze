// Importing necessary libraries and components for this component
import React, { useEffect, useState } from "react";
import { VenuesContainer } from "../styles/ProfileStyle";
import { CardContainer, CardContent, CardImage, CardWrapper, Container } from "../styles/Cards";
import { SecondaryButton } from "../styles/ButtonStyle";

/**
 * BookedVenues Component: Display a list of booked venues of the user.
 * The user's bookings are fetched from the API and displayed in a list format.
 */
function BookedVenues() {
  
  // State hook for managing the bookings data
  const [bookings, setBookings] = useState([]);
  
  // Effect hook to fetch the bookings data on component mount
  useEffect(() => {
    /**
     * fetchBookings - Asynchronous function to fetch the user's bookings from the API
     */
    const fetchBookings = async () => {
      // Retrieving token and user profile from local storage
      const token = localStorage.getItem("token");
      const userProfile = JSON.parse(localStorage.getItem("profile") || '{}');
      const currentUserName = encodeURIComponent(userProfile.name || 'UNKNOWN_USER');
      
      // API URL
      const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${currentUserName}/bookings?_customer=true&_venue=true`;
  
      try {
        // Making a GET request to fetch the bookings data
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
  
        // Checking for unsuccessful response
        if (!response.ok) {
          console.error(`Server responded with status: ${response.status}`);
          return;
        }
  
        // Parsing the response data
        const data = await response.json();
        // Updating the bookings state with the fetched data
        setBookings(data);
  
      } catch (error) {
        // Handling and logging any errors during the fetch process
        console.error("Error fetching bookings:", error);
      }
    };
  
    // Calling fetchBookings function to initiate data fetching
    fetchBookings();
  }, []);
  
  return (
    <Container>
      <h2>Your Bookings:</h2>
      {/* Container for the booked venues */}
      <VenuesContainer>
        {/* Checking if there are any bookings */}
        {bookings.length > 0 ? (
          // Mapping over the bookings array to generate a list of booked venues
          bookings.map((booking, index) => (
            <CardWrapper key={index} to={`/venues/${booking.venue?.id}`}>
              <CardContainer>
                <CardImage src={booking.venue?.media}></CardImage>
                <CardContent>
                  <h3>{booking.venue?.name}</h3>
                  {/* Displaying the booking details */}
                  <p>From: {new Date (booking.dateFrom).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p>Number of guests: {booking.guests}</p>
                </CardContent>
              </CardContainer>
            </CardWrapper>
          ))
        ) : (
          // Displaying a message and a button to book venues if there are no bookings
          <div>
            <p>You have no bookings yet.</p>
            <p><SecondaryButton to="/">Click here</SecondaryButton> to find a venue to book.</p>
          </div>
        )}
      </VenuesContainer>
    </Container>
  );
}


// Exporting BookedVenues component to be used in other parts of the application
export default BookedVenues;
