import React, { useEffect, useState } from "react";
import { VenuesContainer } from "../styles/ProfileStyle";
import { CardWrapper } from "../pages/Home";
import { CardContainer, CardContent, CardImage, CardTitle, Container } from "../styles/Cards";
import { Link } from "react-router-dom";
import { SecondaryButton, SubmitButton } from "../styles/ButtonStyle";

function BookedVenues() {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      const url = "https://api.noroff.dev/api/v1/holidaze/bookings?_customer=true&_venue=true";
      const token = localStorage.getItem("token");
      const userProfile = JSON.parse(localStorage.getItem("profile") || '{}');
      const currentUserName = userProfile.name || 'UNKNOWN_USER';
  
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
        const userBookings = data.filter(booking => booking.customer.name === currentUserName);
    
        setBookings(userBookings);
    
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
                  <CardTitle>{booking.venue?.name}</CardTitle>
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
