"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Heart, Sparkles, HeartHandshake } from 'lucide-react';

const AyurvedicHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
  id: 1,
  title: "Personalized Ayurveda, Anytime, Anywhere",
  subtitle: "Holistic care tailored to your unique constitution",
  description: "Receive in-depth online consultations with Dr. Kajal, blending classical Ayurvedic wisdom with practical lifestyle guidance—accessible globally from the comfort of your home.",
  cta: "Book a Consultation",
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  icon: Leaf
},
{
  id: 2,
  title: "Restore Balance, Prevent Disease",
  subtitle: "Ayurvedic wellness for modern lifestyles",
  description: "From digestive issues to stress and women’s health, Ayurveechi empowers you to heal deeply through customized diet, lifestyle, and herbal recommendations aligned with your natural rhythm.",
  cta: "Start Your Healing Journey",
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  icon: Heart
},
{
  id: 3,
  title: "Herbal Remedies & Lifestyle Guidance",
  subtitle: "Natural solutions for lasting wellness",
  description: "Harness the healing power of Ayurvedic herbs, detox therapies, and rejuvenation practices, while learning simple lifestyle habits that bring lasting harmony to body, mind, and spirit.",
  cta: "Discover Remedies",
  image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  icon: HeartHandshake
}

  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          {/* Sage green overlay for brand consistency */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-amber-100/10" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-6 lg:space-y-8">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg">
                {React.createElement(slides[currentSlide].icon, { 
                  className: "w-8 h-8 text-white" 
                })}
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <p className="text-green-300 text-sm lg:text-sm font-medium tracking-wide uppercase">
                  {slides[currentSlide].subtitle}
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-amber-400"></div>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-serif leading-tight">
                <span className="block">{slides[currentSlide].title}</span>
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-md text-gray-200 leading-relaxed max-w-2xl font-serif ">
                {slides[currentSlide].description}
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <span className="relative z-10">{slides[currentSlide].cta}</span>
                  <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Large decorative circle */}
                <div className="w-96 h-96 rounded-full border border-white/20 animate-pulse"></div>
                {/* Medium decorative circle */}
                <div className="absolute top-12 left-12 w-72 h-72 rounded-full border border-green-400/30"></div>
                {/* Small decorative circle */}
                <div className="absolute top-24 left-24 w-48 h-48 rounded-full border border-amber-400/40 animate-pulse"></div>
                
                {/* Central icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-amber-400/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  {React.createElement(slides[currentSlide].icon, { 
                    className: "w-12 h-12 text-white" 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gradient-to-r from-green-400 to-amber-400 w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-amber-400 transition-all duration-6000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-green-400 rounded-full animate-ping hidden lg:block"></div>
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-amber-400 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute top-40 left-1/3 w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce hidden lg:block"></div>
    </div>
  );
};

export default AyurvedicHeroSlider;