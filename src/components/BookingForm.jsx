import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CustomCalendar, GuestsInput, GuestsLabel } from '../styles/Calendar';
import { ModalBackground, ModalContainer} from '../styles/FormsStyle';
import { useBookingForm } from '../handlers/BookingHandlers';
import { load } from '../api/storage';
import { SubmitButton } from '../styles/ButtonStyle';

const BookingForm = () => {
  const { id } = useParams();
  const profile = load('profile');

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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>

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
