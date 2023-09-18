import { useEffect, useState } from "react";
import { CardContainer } from "../styles/Cards";
import { ArrowButton, CarouselContainer, CarouselImage, Dot, TextBox } from "../styles/CarouselStyle";


const ImageCarousel = () => {
    const images = [
        'src/assets/destination4.avif', 
        'src/assets/destination5.avif', 
        'src/assets/destination6.avif', 
        'src/assets/destination7.avif', 
        'src/assets/destination8.avif'

      ];
      
      const [current, setCurrent] = useState(0);
      
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 6000); 
        return () => clearInterval(interval);
      }, [images.length]);
      
      const handleArrowClick = (direction) => {
        direction === 'left'
          ? setCurrent(current > 0 ? current - 1 : images.length - 1)
          : setCurrent(current === images.length - 1 ? 0 : current + 1);
      };

      return (
        <CarouselContainer>
        <TextBox>Your Perfect Getaway Awaits</TextBox>
          {images.map((image, index) => (
            <CarouselImage
              key={index}
              image={image}
              translateValue={(index - current) * 100}
            />
          ))}
          <ArrowButton direction="left" onClick={() => handleArrowClick('left')}>◄</ArrowButton>
          <ArrowButton direction="right" onClick={() => handleArrowClick('right')}>►</ArrowButton>
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
            {images.map((_, index) => (
              <Dot key={index} active={index === current} />
            ))}
          </div>
        </CarouselContainer>

      )
}


export default ImageCarousel;