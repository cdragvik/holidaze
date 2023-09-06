import Calendar from "react-calendar";
import { styled } from "styled-components";

export const GuestsLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const GuestsInput = styled.input`
  width: 50px;
  padding: 5px;
`;

export const CustomCalendar = styled(Calendar)`

  .react-calendar__tile {
    background-color: #F5EFE7;
    border: 0.1px solid black;
    padding: 5px;
  }

  .react-calendar__navigation button {
    background: none;
    border: 0.1px solid black;
    padding: 5px;
    margin: 10px 0px;

  }

  .react-calendar__month-view__weekdays {
    padding-bottom: 5px;
  }

  .booked {
    background-color: #d8c4b6b8 !important;
    
  }
  
  .selected-start {
    background-color: #4F709C !important;
  }
  
  .selected-end {
    background-color: #4F709C !important;
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