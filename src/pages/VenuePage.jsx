import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const VenueInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const ImageContainer = styled.div`
  max-height: 500px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;


const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 20px;
`;

const Feature = styled.span`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #D8C4B6;
`;

const Location = styled.div`
  padding-bottom: 20px;
`;

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState();

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((parsed) => setVenue(parsed));
  }, [id]);

  const getBookedDates = () => {
    if (venue && venue.bookings) {
      return venue.bookings.map((booking) => new Date(booking.dateFrom));
    }
    return [];
  };

  return (
    <Layout>
      <PageContainer>

        <Title>{venue?.name}</Title>
        <Location>{venue?.location.city}, {venue?.location.country}</Location>
        
        <VenueInfoContainer>

          <ImageContainer>
            <Image src={venue?.media[0]} alt={venue?.name} />
          </ImageContainer>

          <p>{venue?.description}</p>

          <InfoRow>
            <span>Price:</span>
            <span>${venue?.price} /night</span>
          </InfoRow>
          <InfoRow>
            <span>Max Guests:</span>
            <span>{venue?.maxGuests}</span>
          </InfoRow>
          <InfoRow>
            <span>Rating:</span>
            <span>{venue?.rating} ★</span>
          </InfoRow>

          <FeatureList>
            {venue?.meta.wifi && <Feature>WiFi</Feature>}
            {venue?.meta.parking && <Feature>Parking</Feature>}
            {venue?.meta.breakfast && <Feature>Breakfast</Feature>}
            {venue?.meta.pets && <Feature>Pets Allowed</Feature>}
          </FeatureList>

        </VenueInfoContainer>
        
        <Calendar bookedDates={getBookedDates()} />
      
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
