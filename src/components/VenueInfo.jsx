import React from "react";
import { VenueInfoContainer, Location, Title, ImageContainer, InfoRow, FeatureList, Image, Feature } from "../styles/VenuePageStyle";

const VenueInfo = ({ venue }) => {
  return (

    <VenueInfoContainer>    
        
        <Title>{venue?.name}</Title>
        <Location>{venue?.location?.city}, {venue?.location?.country}</Location>
        
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
        <span>Rating:</span><span>★ {venue?.rating}</span>
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

    </VenueInfoContainer>
  );
};

export default VenueInfo;
