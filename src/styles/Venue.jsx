import Calendar from "react-calendar";
import { styled } from "styled-components";

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const VenueInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
`;

export const ImageContainer = styled.div`
  max-height: 500px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Feature = styled.span`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #D8C4B6;
`;

export const Location = styled.div`
  padding-bottom: 20px;
`;

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