import React, { useEffect, useState } from "react";

function BookedVenues() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
        const url = "https://api.noroff.dev/api/v1/holidaze/bookings?_customer=true&_venue=true";

      const token = localStorage.getItem("token");

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
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking, index) => (
                  <li key={index}>
    
                  <div>
                    <strong>Start Date:</strong> {booking.dateFrom}
                  </div>
                  <div>
                    <strong>End Date:</strong> {booking.dateTo}
                  </div>
                  <div>
                    <strong>Number of Guests:</strong> {booking.guests}
                  </div>
                  <div>
                    <strong>Venue:</strong> {booking.venue?.name || "N/A"}
                  </div>
                </li>
        ))}
      </ul>
    </div>
  );
}

export default BookedVenues;
