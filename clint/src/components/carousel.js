import React, { useState } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={goToPrevious}>Previous</button>
      <img src={images[currentIndex]} alt="carousel-image" />
      <button onClick={goToNext}>Next</button>
    </div>
  );
};

export default Carousel;
