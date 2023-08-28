import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitButton } from "../styles/Forms";

const BookingForm = ({ bookedDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const handleBooking = async () => {
    const bookingInfo = {
      dateFrom: startDate,
      dateTo: endDate,
    
    };

    const response = await fetch('https://api.noroff.dev/api/v1/holidaze/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(bookingInfo),
    });

    if (response.ok) {
      alert('Booking successful');
    } else {
      alert('Booking failed');
    }
  };

  return (<>
        <h3>Book this Venue</h3>
        <DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  selectsStart
  startDate={startDate}
  endDate={endDate}
  minDate={new Date()}
  excludeDates={bookedDates}
/>
<DatePicker
  selected={endDate}
  onChange={(date) => setEndDate(date)}
  selectsEnd
  startDate={startDate}
  endDate={endDate}
  minDate={startDate}
  excludeDates={bookedDates}
/>

<SubmitButton onClick={handleBooking}>Book Now</SubmitButton>  </> 
  );
};

export default BookingForm;
