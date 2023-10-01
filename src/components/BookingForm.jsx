// Importing necessary libraries, hooks, and styled components
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookingDate, BookingInfo, CustomCalendar, GuestsInput, GuestsLabel } from '../styles/Calendar';
import { ModalBackground, ModalContainer} from '../styles/FormsStyle';
import { useBookingForm } from '../handlers/BookingHandlers';
import { load } from '../api/storage';
import { SubmitButton } from '../styles/ButtonStyle';
import { Container } from '../styles/Cards';

/**
 * BookingForm Component: Provides an interface for users to book a venue.
 * The component renders a calendar to select booking dates and an input for the number of guests.
 */
const BookingForm = () => {
  // Hooks for navigation and retrieving the venue id from URL parameters
  const navigate = useNavigate();
  const { id } = useParams();
  const profile = load('profile');

  // Destructuring properties and functions from the useBookingForm custom hook
  const {
    venue,
    startDate,
    endDate,
    numGuests,
    setNumGuests,
    handleBooking,
    isBooked,
    handleCalendarClick,
    tileClassName,
    showModal,
    setShowModal,
  } = useBookingForm(id);

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>

      {/* Conditional rendering based on user authentication */}
      {!localStorage.getItem('token') && (
        <>
        <h3>Book this Venue</h3>
          <CustomCalendar
            onClickDay={handleCalendarClick}
            tileDisabled={({ date, view }) => view === 'month' && isBooked(date)}
            tileClassName={tileClassName}
          />
          <SubmitButton to="/login">
            Want to book? Login
          </SubmitButton>
        </>
      )}

      {/* Conditional rendering for logged in users who aren't the venue owner */}
      {localStorage.getItem('token') && profile?.email !== venue?.owner?.email && (
        <>
          <h3>Book this Venue</h3>

          <CustomCalendar
            onClickDay={handleCalendarClick}
            tileDisabled={({ date, view }) =>
              view === 'month' && (isBooked(date) || date < new Date(new Date().setHours(0,0,0,0)))
            }
            tileClassName={tileClassName}
          />

          <BookingInfo>
            {startDate && <BookingDate>Check in date: {startDate.toDateString()}</BookingDate>}
            {endDate && <BookingDate>Check out date: {endDate.toDateString()}</BookingDate>}
          </BookingInfo>

          <GuestsLabel>
            Number of Guests:
            <GuestsInput
              type='number'
              value={numGuests}
              onChange={(e) => setNumGuests(e.target.value)}
              min='1'
              max={venue?.maxGuests}
            />
          </GuestsLabel>
          <SubmitButton onClick={handleBooking}>Confirm Booking</SubmitButton>
        </>
      )}
      
      {/* Conditional rendering for displaying a success modal upon booking */}
      {showModal && (
        <ModalBackground>
          <ModalContainer>
            <Container>
              <h3>Booking Success</h3>
              <SubmitButton
                onClick={() => {
                  closeModal();
                  navigate('/');
                }}
              >Keep Browsing</SubmitButton>
              <SubmitButton
                onClick={() => {
                  closeModal();
                  navigate(`/profile/${profile.name}`);
                }}
              >
                See Your Booked Venues
              </SubmitButton>
            </Container>
          </ModalContainer>
        </ModalBackground>
      )}
    </div>
  );
};

// Exporting BookingForm component to be used in other parts of the application
export default BookingForm;
