import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import Calendar from "react-calendar"; // Import the calendar component
import "react-calendar/dist/Calendar.css"; // Import the default styles for the calendar

const PageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  font-size: 1rem;
  margin-top: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  font-size: 0.9rem;
`;

const FeatureList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Feature = styled.span`
  font-size: 0.9rem;
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
      return venue.bookings.map((booking) => {
        return new Date(booking.dateFrom);
      });
    }
    return [];
  };

  return (
    <Layout>
      <PageContainer>
        <Title>{venue?.name}</Title>
        <Image src={venue?.media[0]} alt={venue?.name} />
        <Description>{venue?.description}</Description>
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
        <InfoRow>
          <span>Location:</span>
          <span>
            {venue?.location.city}, {venue?.location.country}
          </span>
        </InfoRow>
        <Calendar bookedDates={getBookedDates()} />
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
