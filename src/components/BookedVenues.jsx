import React, { useEffect, useState } from "react";
import { VenuesContainer } from "../styles/ProfileStyle";
import { CardContainer, CardContent, CardImage, CardWrapper, Container } from "../styles/Cards";
import { SecondaryButton } from "../styles/ButtonStyle";

function BookedVenues() {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const userProfile = JSON.parse(localStorage.getItem("profile") || '{}');
      const currentUserName = encodeURIComponent(userProfile.name || 'UNKNOWN_USER');
  
      const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${currentUserName}/bookings?_customer=true&_venue=true`;
  
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          console.error(`Server responded with status: ${response.status}`);
          return;
        }
  
        const data = await response.json();
        console.log(data);  // Log the response data to the console
  
        // Assuming the response data is an array of bookings
        setBookings(data);
  
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, []);
  
  
  
  return (
    <Container>
      <h2>Your Bookings:</h2>
      
      <VenuesContainer>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <CardWrapper key={index}>
              <CardContainer>
                <CardImage src={booking.venue?.media} ></CardImage>
                <CardContent>
                  <h3>{booking.venue?.name}</h3>
                  <p>From: {new Date (booking.dateFrom).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p>Number of guests: {booking.guests}</p>
                </CardContent>
              </CardContainer>
            </CardWrapper>
          ))
        ) : (
          <div>
            <p>You have no bookings yet.</p>
            <p><SecondaryButton onClick={() => window.location.replace('/')}>Click here</SecondaryButton> to find a venue to book.</p>
          </div>
        )}
      </VenuesContainer>
    </Container>
  );
}


export default BookedVenues;
