// Import necessary dependencies and styles
import React from "react";
import {
  VenueInfoContainer,
  Location,
  Title,
  ImageContainer,
  InfoRow,
  FeatureList,
  Image,
  Feature
} from "../styles/VenuePageStyle";

// Define the VenueInfo component
const VenueInfo = ({ venue }) => {
  return (
    <VenueInfoContainer>
      {/* Display the name of the venue */}
      <Title>{venue?.name}</Title>
      {/* Display the location of the venue */}
      <Location>{venue?.location?.city}, {venue?.location?.country}</Location>
      
      {/* Container for the image of the venue */}
      <ImageContainer>
        {/* Display the image of the venue */}
        <Image src={venue?.media?.[0]} alt={venue?.name} />
      </ImageContainer>

      {/* Display the description of the venue */}
      <p>{venue?.description}</p>

      {/* Display the price of the venue per night */}
      <InfoRow>
        <span>Price:</span> <span>${venue?.price} /night</span>
      </InfoRow>
      
      {/* Display the maximum number of guests the venue can accommodate */}
      <InfoRow>
        <span>Max Guests:</span> <span>{venue?.maxGuests}</span>
      </InfoRow>
      
      {/* Display the rating of the venue */}
      <InfoRow>
        <span>Rating:</span><span>★ {venue?.rating}</span>
      </InfoRow>

      {/* List of features the venue offers */}
      <FeatureList>
        {venue?.meta?.wifi && <Feature>WiFi</Feature>}
        {venue?.meta?.parking && <Feature>Parking</Feature>}
        {venue?.meta?.breakfast && <Feature>Breakfast</Feature>}
        {venue?.meta?.pets && <Feature>Pets Allowed</Feature>}
      </FeatureList>

      {/* Display owner information if available */}
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

// Export the VenueInfo component
export default VenueInfo;
