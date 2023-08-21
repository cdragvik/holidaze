import React from "react";
import Calendar from "react-calendar"; // Import the calendar component
import "react-calendar/dist/Calendar.css"; // Import the default styles for the calendar

const Calendar = ({ bookedDates }) => {
  return (
    <div>
      <h2>Availability Calendar</h2>
      <Calendar
        tileDisabled={({ date }) =>
          bookedDates.some(
            (bookedDate) =>
              date.getFullYear() === bookedDate.getFullYear() &&
              date.getMonth() === bookedDate.getMonth() &&
              date.getDate() === bookedDate.getDate()
          )
        }
      />
    </div>
  );
};

export default AvailabilityCalendar;
