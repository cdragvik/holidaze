// useBookingForm.js
import { useEffect, useState } from "react";

export const useBookingForm = (id) => {
  const [venue, setVenue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectingStartDate, setSelectingStartDate] = useState(true);
  const [numGuests, setNumGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
      .then(response => response.json())
      .then(parsed => {
        setVenue(parsed);
        
        // If bookings are public, populate booked dates here
        if (parsed.bookings) {
          const allBookedDates = [];
          parsed.bookings.forEach(booking => {
            let currentDate = new Date(booking.dateFrom);
            const endDate = new Date(booking.dateTo);
            while (currentDate <= endDate) {
              allBookedDates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
          });
          setBookedDates(allBookedDates);
        }
      });
  }, [id]);

  const handleBooking = async () => {
    if (startDate === null || endDate === null || numGuests === null) {
      alert("Please fill in all the details before booking.");
      return;
    }

    const bookingInfo = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: numGuests,
      venueId: venue.id
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
        setShowModal(true); // Show the modal when booking is successful
      } else {
        alert('Booking failed');
      }
    };

  const isBooked = date => {
    const formattedDate = new Date(date);
    return bookedDates.some(bookedDate =>
      formattedDate.toDateString() === bookedDate.toDateString()
    );
  };

  const handleCalendarClick = (date) => {
    if (selectingStartDate) {
      if (!isBooked(date)) {
        setStartDate(date);
        setSelectingStartDate(false); // Switch to end date selection
      } else {
        alert('This start date is already booked.');
      }
    } else {
      if (date > startDate) {
        setEndDate(date);
        setSelectingStartDate(true); // Switch back to start date selection
      } else {
        alert('End date must be after start date.');
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return;
    if (isBooked(date)) return "booked"; // Class name for booked dates
    if (date.toDateString() === startDate?.toDateString()) return "selected-start"; // Class name for start date
    if (date.toDateString() === endDate?.toDateString()) return "selected-end"; // Class name for end date
  };

  return {
    venue,
    startDate,
    endDate,
    bookedDates,
    selectingStartDate,
    numGuests,
    setStartDate,
    setEndDate,
    setSelectingStartDate,
    setNumGuests,
    handleBooking,
    isBooked,
    handleCalendarClick,
    tileClassName,
    showModal,
    setShowModal,
  };
};
