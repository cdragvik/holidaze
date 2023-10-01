// Import necessary dependencies and styles
import React from 'react';
import { CardContainer, CardContent, CardImage } from '../styles/Cards';

// Define the VenueCard component
const VenueCard = ({ imageSrc, title, price, city, country, rating }) => (
  <CardContainer>
    {/* Image of the venue */}
    <CardImage 
      src={imageSrc} 
      alt={title} 
    />
    <CardContent>
      {/* Title of the venue */}
      <h3>{title}</h3>
      {/* Rating of the venue */}
      <p>★ {rating}</p>
      {/* City and country of the venue */}
      <p>{city}, {country}</p>
      {/* Price per night of the venue */}
      <p>${price} /night</p>
    </CardContent>
  </CardContainer>
);

// Export the VenueCard component
export default VenueCard;
