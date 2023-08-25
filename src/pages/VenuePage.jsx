import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import { load } from "../api/storage";

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

const ActionButton = styled.button`
  background-color: #4f709c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #213555;
  }
`;

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const profile = load('profile');

  useEffect(() => {
    fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true`)
      .then(response => response.json())
      .then(parsed => setVenue(parsed));
  }, [id]);

  const handleDelete = async () => {
    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (response.ok) window.location.replace("/");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedVenue = {
      name: e.target.name.value,
      description: e.target.description.value,
    };

    const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedVenue),
    });

    if (response.ok) {
      const updatedVenue = await response.json();
      setVenue(updatedVenue);
      setIsEditing(false);
    }
  };


  console.log(venue)

  return (
    <Layout>
      <PageContainer>
        <Title>{venue?.name}</Title>
        <Location>{venue?.location?.city}, {venue?.location?.country}</Location>
        <VenueInfoContainer>
          <ImageContainer>
            <Image src={venue?.media?.[0]} alt={venue?.name} />
          </ImageContainer>

          <p>{venue?.description}</p>

          <InfoRow>
            <span>Price:</span> <span>${venue?.price} /night</span>
          </InfoRow>
          <InfoRow>
            <span>Max Guests:</span> <span>{venue?.maxGuests}</span>
          </InfoRow>
          <InfoRow>
            <span>Rating:</span> <span>{venue?.rating} ★</span>
          </InfoRow>

          <FeatureList>
            {venue?.meta?.wifi && <Feature>WiFi</Feature>}
            {venue?.meta?.parking && <Feature>Parking</Feature>}
            {venue?.meta?.breakfast && <Feature>Breakfast</Feature>}
            {venue?.meta?.pets && <Feature>Pets Allowed</Feature>}
          </FeatureList>

          {venue?.owner && (
            <div>
              <h3>Owner Information</h3>
              <p>Name: {venue.owner.name}</p>
              <p>Email: {venue.owner.email}</p>
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleEdit}>
              <input type="text" name="name" defaultValue={venue?.name} />
              <input type="text" name="description" defaultValue={venue?.description} />
              <button type="submit">Update Venue</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          ) : null}

          {profile?.email === venue?.owner?.email && (
            <>
              <ActionButton onClick={handleDelete}>Delete Venue</ActionButton>
              <ActionButton onClick={() => setIsEditing(true)}>Edit Venue</ActionButton>
            </>
          )}

        </VenueInfoContainer>
      </PageContainer>
    </Layout>
  );
};

export default VenuePage;
