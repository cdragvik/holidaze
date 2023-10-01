import React from 'react';
import { CardContainer, CardContent, CardImage } from '../styles/Cards';

const VenueCard = ({ imageSrc, title, price, city, country }) => (
  <CardContainer>
    <CardImage 
      src={imageSrc} 
      alt={title} 
    />
    <CardContent>
      <h3>{title}</h3>
      <p>{city}, {country}</p>
      <p>${price} /night</p>
    </CardContent>
  </CardContainer>
);

export default VenueCard;
