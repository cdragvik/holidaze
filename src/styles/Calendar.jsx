import Calendar from "react-calendar";
import { styled } from "styled-components";

export const GuestsLabel = styled.label`
  display: block;
  margin: 16px 0;
  font-size: 18px;
  font-weight: bold;
`;

export const GuestsInput = styled.input`
  width: 60px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 8px;
`;


export const CustomCalendar = styled(Calendar)`
  margin-bottom: 20px;

  .react-calendar__tile {
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 5px;
  }

  .react-calendar__tile:hover {
    background-color: #ebebeb;
  }

  .react-calendar__tile--active {
    background-color: #4F709C;
    color: #fff;
  }

  .booked {
    background-color: #d8c4b6b8 !important;
  }

  .selected-start, .selected-end {
    background-color: #4F709C !important;
    color: #fff;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__navigation button {
    background: none;
    border: 1px solid #ccc;
    cursor: pointer;
    padding: 10px;
    margin: auto;
  }

  .react-calendar__month-view__days__day {
    color: #4F709C;   
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 10px 0px;
  }
`;



export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  thead {
    background-color: #f2f2f2;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

export const BookingInfo = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

export const BookingDate = styled.div`
  padding: 5px;
`;
