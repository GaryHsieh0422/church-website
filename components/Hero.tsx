"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 0,
      content: (
        <div className="">
        </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="">
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="">
        </div>
      ),
    },
  ];

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  // Handle arrow navigation
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Handle bullet click
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero bg-gray-100 py-16 min-h-[300px] md:min-h-[500px] flex justify-center items-center">
      <div className="container mx-auto text-center">
        <div className="relative">
          <div className="w-full h-[250px] md:h-[400px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  currentSlide === index
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {slide.content}
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-amber-500 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-amber-500 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>

  
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-amber-500" : "bg-gray-300"
              } hover:bg-amber-400 transition-colors`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
