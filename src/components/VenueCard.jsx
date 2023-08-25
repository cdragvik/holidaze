import React from 'react';
import styled from 'styled-components';


const CardContainer = styled.div`
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 12px;
  background-color: #ffffff;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
`;

const StarIcon = styled.span`
  color: #D8C4B6;
  margin-right: 4px;
`;

const VenueCard = ({ imageSrc, title, rating, price, city, country}) => (
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
