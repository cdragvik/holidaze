import React, { useState } from "react";
import { ArrowButton, CarouselContainer, CarouselImage, Dot, TextBox, DotContainer } from "../styles/CarouselStyle";
import image1 from '../assets/destination4.avif';
import image2 from '../assets/destination5.avif';
import image3 from '../assets/destination6.avif';
import image4 from '../assets/destination7.avif';
import image5 from '../assets/destination8.avif';

const ImageCarousel = () => {
    const images = [image1, image2, image3, image4, image5];

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

