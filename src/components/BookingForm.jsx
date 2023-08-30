import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CustomCalendar, GuestsInput, GuestsLabel } from '../styles/Venue';
import { ModalBackground, ModalContainer, SubmitButton } from '../styles/Forms';
import { useBookingForm } from '../handlers/BookingHandlers';
import { load } from '../api/storage';

const BookingForm = () => {
  const { id } = useParams();
  const profile = load('profile');

  const {
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
  } = useBookingForm(id);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Show login prompt if the user is not logged in */}
      {!localStorage.getItem('token') && (
        <>
          <CustomCalendar
            onClickDay={handleCalendarClick}
            tileDisabled={({ date, view }) => view === 'month' && isBooked(date)}
            tileClassName={tileClassName}
          />
          <SubmitButton onClick={() => window.location.replace('/login')}>
            Want to book? Login
          </SubmitButton>
        </>
      )}

      {/* Show booking form if the user is logged in and not the venue owner */}
      {localStorage.getItem('token') && profile?.email !== venue?.owner?.email && (
        <>
          <h3>Book this Venue</h3>
          <CustomCalendar
            onClickDay={handleCalendarClick}
            tileDisabled={({ date, view }) => view === 'month' && isBooked(date)}
            tileClassName={tileClassName}
          />
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
          {startDate && <div>Start Date: {startDate.toDateString()}</div>}
          {endDate && <div>End Date: {endDate.toDateString()}</div>}
        </>
      )}

      {/* Show modal if booking is successful */}
      {showModal && (
        <ModalBackground>
          <ModalContainer>
            <h3>Booking Success</h3>
            <SubmitButton onClick={() => { closeModal(); window.location.replace('/'); }}>
              Keep Browsing
            </SubmitButton>
            <SubmitButton onClick={closeModal}>
              <Link to={`/profile/${profile.name}`}>See Your Booked Venues</Link>
            </SubmitButton>
          </ModalContainer>
        </ModalBackground>
      )}
    </div>
  );
};

export default BookingForm;
