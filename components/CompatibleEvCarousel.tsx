"use client";

import React, { useState, useEffect, useRef } from "react";

const logos = [
  "https://solamoenergy.com/wp-content/uploads/2026/05/BYD-Logo-2021-2022.png",
  "https://solamoenergy.com/wp-content/uploads/2026/05/MG_Motor_2021_logo.svg.png",
  "https://solamoenergy.com/wp-content/uploads/2026/05/Ioniq-Logo-scaled.jpg",
  "https://solamoenergy.com/wp-content/uploads/2026/05/NISHAT-MILLS-logo-vector.png",
  "https://solamoenergy.com/wp-content/uploads/2026/05/8315b7101321439.5f1c19f601155.webp",
  "https://solamoenergy.com/wp-content/uploads/2026/05/images-2.png",
];

export default function CompatibleEvCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const totalSlides = logos.length;

  // Drag/Swipe state
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 5 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, totalSlides]);

  // Max slide index constraint
  const maxIndex = Math.max(0, totalSlides - itemsPerView);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    if (diff < -50) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      setIsDragging(false);
    } else if (diff > 50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Slider Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out pointer-events-none"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
        }}
      >
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className={`w-1/3 lg:w-1/5 flex-shrink-0 px-4 flex items-center justify-center`}
          >
            <div className="h-28 flex items-center justify-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100 w-full">
              <img
                src={logo}
                alt={`EV Brand Logo ${idx + 1}`}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {logos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "w-8 bg-[#79B900]"
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
