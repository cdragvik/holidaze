import { useEffect, useState } from "react";

/**
 * Custom hook to manage booking form state and actions.
 *
 * @function
 * @param {string} id - Venue id.
 * @returns {Object} - Various state and handlers.
 */
export const useBookingForm = (id) => {
  
  // State variables for holding venue data, selected dates, number of guests, and modal visibility.
  const [venue, setVenue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectingStartDate, setSelectingStartDate] = useState(true);
  const [numGuests, setNumGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Effect to fetch venue data and booked dates from the API on component mount or id change.
  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`)
      .then(response => response.json())
      .then(parsed => {
        setVenue(parsed);
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

  // Effect to check and show success modal based on local storage flag, on component mount.
  useEffect(() => {
    if (localStorage.getItem('showSuccessModal') === 'true') {
      setShowModal(true);
      localStorage.removeItem('showSuccessModal');  // Clear the flag
    }
  }, []);

  /**
   * Handler for booking action.
   */
  const handleBooking = async () => {
    if (startDate === null || endDate === null || numGuests === null) {
      alert("Please fill in all the details before booking.");
      return;
    }
    const bookingInfo = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: Number(numGuests),
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
      localStorage.setItem('showSuccessModal', 'true');  // Set the flag before reloading
      window.location.reload();
    } else {
      alert('Booking failed');
    }
  };

  /**
   * Function to check if a date is already booked.
   * 
   * @param {Date} date - Date to check.
   * @returns {boolean} - True if date is booked, false otherwise.
   */
  const isBooked = date => {
    const formattedDate = new Date(date);
    return bookedDates.some(bookedDate =>
      formattedDate.toDateString() === bookedDate.toDateString()
    );
  };

  /**
   * Handler for calendar date selection.
   *
   * @param {Date} date - Date clicked.
   */
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

  /**
   * Function to determine the CSS class for a calendar date tile.
   *
   * @param {Object} params - Parameters with date and view properties.
   * @returns {string|null} - CSS class name or null.
   */
  const tileClassName = ({ date, view }) => {
    if (view !== "month") return;
    if (date < new Date(new Date().setHours(0,0,0,0))) return "unavailable";  // Class name for unavailable dates
    if (isBooked(date)) return "booked";  // Class name for booked dates
    if (date.toDateString() === startDate?.toDateString()) return "selected-start";  // Class name for start date
    if (date.toDateString() === endDate?.toDateString()) return "selected-end";  // Class name for end date
  };
  
  // Expose state and handlers to be used by consumer components.
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
