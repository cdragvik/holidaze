import { styled } from "styled-components";

export const CardContainer = styled.div`
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  overflow: hidden;
  cursor: pointer;

  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out; // Add transition for transform
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;


export const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border: none;
  border-radius: 8px;
`

export const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 12px;
  background-color: #ffffff;
  
`;

export const CardTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
`;

export const StarIcon = styled.span`
  color: #D8C4B6;
  margin-right: 4px;
`;
