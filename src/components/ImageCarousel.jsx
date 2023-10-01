// Importing necessary libraries, styles, and images
import React, { useState } from "react";
import {
    ArrowButton,
    CarouselContainer,
    CarouselImage,
    Dot,
    TextBox,
    DotContainer,
} from "../styles/CarouselStyle";
import image1 from '../assets/home1.jpeg';
import image2 from '../assets/home2.jpeg';
import image3 from '../assets/home3.jpeg';
import image4 from '../assets/home4.jpeg';

// Defining the ImageCarousel functional component
const ImageCarousel = () => {
    // Defining an array of images to be used in the carousel
    const images = [image1, image2, image3, image4];

    // Using the useState hook to manage the current image index
    const [current, setCurrent] = useState(0);

    // Defining a function to handle arrow button clicks
    const handleArrowClick = (direction) => {
        // Ternary operator to check the direction and update the current index accordingly
        direction === 'left'
            ? setCurrent(current > 0 ? current - 1 : images.length - 1)  // if left, decrement index or wrap around
            : setCurrent(current === images.length - 1 ? 0 : current + 1);  // if right, increment index or wrap around
    };

    return (
        <CarouselContainer>
            <TextBox>Your Perfect Getaway Awaits</TextBox>  // Displaying a text box with a message
            <CarouselImage src={images[current]} alt="Carousel image" />  // Displaying the current image
            {/* Left arrow button, with an onClick handler to update the current index */}
            <ArrowButton direction="left" onClick={() => handleArrowClick('left')}>◄</ArrowButton>
            {/* Right arrow button, with an onClick handler to update the current index */}
            <ArrowButton direction="right" onClick={() => handleArrowClick('right')}>►</ArrowButton>
            {/* Dot navigation, with an active dot for the current image */}
            <DotContainer>
                {images.map((_, index) => (
                    <Dot key={index} active={index === current} />
                ))}
            </DotContainer>
        </CarouselContainer>
    );
};

// Exporting the ImageCarousel component as the default export
export default ImageCarousel;


