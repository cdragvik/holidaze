import { styled } from "styled-components";

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 600px;
  z-index: 1;
  
`;

export const CarouselImage = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  position: absolute;
  transition: all 0.5s ease;
  transform: translateX(${(props) => props.translateValue}%);
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => props.direction}: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  color: #ffffff;
`;

export const Dot = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.active ? 'white' : 'grey')};
  border-radius: 50%;
  display: inline-block;
  margin: 2px;
`;

export const TextBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: #fff;
  text-align: center;
  z-index: 1;  // Ensure it is above the image but below the controls
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;