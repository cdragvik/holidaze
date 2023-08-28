import React from 'react';
import { CardContainer, CardContent, CardImage, CardTitle, StarIcon } from '../styles/Cards';

const VenueCard = ({ imageSrc, title, rating, price, city, country }) => (
  <CardContainer>
    <CardImage src={imageSrc} alt={title} />
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <div><StarIcon>★</StarIcon>{rating}</div>
      <p>{city}, {country}</p>
      <p>${price} /night</p>
    </CardContent>
  </CardContainer>
);

export default VenueCard;
