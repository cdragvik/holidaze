import React from 'react';
import { CardContainer, CardContent, CardImage, CardTitle, StarIcon } from '../styles/Cards';

const VenueCard = ({ imageSrc, title, rating, price, city, country }) => (
  <CardContainer>
    <CardImage 
      src={imageSrc} 
      alt={title} 
      onError={(e) => { e.target.onerror = null; e.target.src = 'src/assets/placeholderImage.avif'; }} 
    />
    <CardContent>
      <h3>{title}</h3>
      <p>{city}, {country}</p>
      <p>${price} /night</p>
    </CardContent>
  </CardContainer>
);

export default VenueCard;
