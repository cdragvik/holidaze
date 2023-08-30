import React from "react";
import { useParams } from "react-router-dom";
import { load } from "../api/storage";
import { CustomCalendar, GuestsInput, GuestsLabel } from "../styles/Venue";
import { SubmitButton } from "../styles/Forms";
import { useBookingForm } from "../handlers/BookingHandlers";

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
  } = useBookingForm(id);
    return (
    <div>

    {!localStorage.getItem("token") ? (
    <>

    <CustomCalendar
    onClickDay={(value) => handleCalendarClick(value)}
    tileDisabled={({ date, view }) =>
      view === "month" && isBooked(date)
    }
    tileClassName={tileClassName}
    />
    
    <SubmitButton onClick={() => window.location.replace("/login")}>
      Want to book? Login
    </SubmitButton></>
  ) : null}
  

        {localStorage.getItem("token") ? (
    <>
    {profile?.email !== venue?.owner?.email ? (
    <>
  <h3>Book this Venue</h3>
  <CustomCalendar
    onClickDay={(value) => handleCalendarClick(value)}
    tileDisabled={({ date, view }) =>
      view === "month" && isBooked(date)
    }
    tileClassName={tileClassName}
  />
  <GuestsLabel>
    Number of Guests: 
    <GuestsInput 
      type="number" 
      value={numGuests} 
      onChange={(e) => setNumGuests(e.target.value)} 
      min="1" max={venue?.maxGuests}
    />
  </GuestsLabel>
  
  <SubmitButton onClick={handleBooking}>Confirm Booking</SubmitButton>
  
  {startDate && <div>Start Date: {startDate.toDateString()}</div>}
  {endDate && <div>End Date: {endDate.toDateString()}</div>}
        </>
        ) : (
        <div></div>
        )}
        </>
        ) : null}
        </div>

        )};


export default BookingForm;