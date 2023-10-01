import React, { useState } from "react";
import { ArrowButton, CarouselContainer, CarouselImage, Dot, TextBox, DotContainer } from "../styles/CarouselStyle";
import image1 from '../assets/home1.jpeg';
import image2 from '../assets/home2.jpeg';
import image3 from '../assets/home3.jpeg';
import image4 from '../assets/home4.jpeg';


const ImageCarousel = () => {
    const images = [image1, image2, image3, image4];

    const [current, setCurrent] = useState(0);

    const handleArrowClick = (direction) => {
        direction === 'left'
            ? setCurrent(current > 0 ? current - 1 : images.length - 1)
            : setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    return (
        <CarouselContainer>
            <TextBox>Your Perfect Getaway Awaits</TextBox>
            <CarouselImage src={images[current]} alt="Carousel image" />
            <ArrowButton direction="left" onClick={() => handleArrowClick('left')}>◄</ArrowButton>
            <ArrowButton direction="right" onClick={() => handleArrowClick('right')}>►</ArrowButton>
            <DotContainer>
                {images.map((_, index) => (
                    <Dot key={index} active={index === current} />
                ))}
            </DotContainer>
        </CarouselContainer>
    );
};

export default ImageCarousel;

