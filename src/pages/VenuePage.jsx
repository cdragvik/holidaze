import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const VenueTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const VenueImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const VenueDescription = styled.p`
  font-size: 1rem;
  margin-top: 20px;
`;

const VenueInfo = styled.div`
  margin-top: 20px;
`;

const VenueInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  font-size: 0.9rem;
`;

const VenueFeatures = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState();

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((parsed) => setVenue(parsed));
  }, [id]);

  return (
    <Layout>
      <PageContainer>
        <VenueTitle>{venue?.name}</VenueTitle>
        <VenueImage src={venue?.media[0]} alt={venue?.name} />
        <VenueDescription>{venue?.description}</VenueDescription>
        <VenueInfo>
          <VenueInfoRow>
            <span>Price:</span>
            <span>${venue?.price} /night</span>
          </VenueInfoRow>
          <VenueInfoRow>
            <span>Max Guests:</span>
            <span>{venue?.maxGuests}</span>
          </VenueInfoRow>
          <VenueInfoRow>
            <span>Rating:</span>
            <span>{venue?.rating} ★</span>
          </VenueInfoRow>
          <VenueFeatures>
            {venue?.meta.wifi && <span>WiFi</span>}
            {venue?.meta.parking && <span>Parking</span>}
            {venue?.meta.breakfast && <span>Breakfast</span>}
            {venue?.meta.pets && <span>Pets Allowed</span>}
          </VenueFeatures>
          <VenueInfoRow>
            <span>Location:</span>
            <span>
              {venue?.location.city}, {venue?.location.country}
            </span>
          </VenueInfoRow>
        </VenueInfo>
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
