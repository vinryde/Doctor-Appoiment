"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import profileone from "@/assets/profileone.png";
import booking from "@/assets/booking.png";
import video from "@/assets/video.png";
import herb from "@/assets/herb.png";
import meditation from "@/assets/meditation.png";
import lotus from "@/assets/lotus.png";
import ayur from "@/assets/ayur.png";
import yoga from "@/assets/yoga.png";
import Link from "next/link";
// --- Data: team members ---
const people = [
  {
    id: 1,
    name: "Create Your Profile",
    role: "Sign up and complete your profile to get personalized healthcare recommendations and services.",
    profile: profileone,
    href: "./onboarding"
    
      },
  {
    id: 2,
    name: "Book Appointments",
    role: "Browse doctor profiles, check availability, and book appointments that fit your schedule.",
   
    profile: booking,
    href: "./appointments"
  },
  {
    id: 3,
    name: "Video Consultation",
    role: "Connect with doctors through secure, high-quality video consultations from the comfort of your home.",
    
    profile:
      video, // Calm consultation vibe
      href: "./doctors"
  },
  {
    id: 4,
    name: "Consultation Credits",
    role: "Purchase credit packages that fit your healthcare needs with our simple subscription model.",
   
    profile:
      herb, // Ayurveda treatment herbs
      href: "./"
  },
  {
    id: 5,
    name: "Verified Doctors",
    role: "All healthcare providers are carefully vetted and verified to ensure quality care.",
   
    profile:
      meditation, // Ayurveda practitioner
      href: "./doctors"
  },
  {
    id: 6,
    name: "Medical Documentation",
    role: "Access and manage your appointment history, doctor\'s notes, and medical recommendations.",
  
    profile:
      lotus, // Wellness journals / notes
      href: "./"
  },
  {
    id: 7,
    name: "Holistic Wellness Support",
    role: "Ongoing Ayurvedic lifestyle guidance with diet, mindfulness, and herbal recommendations.",
    
    profile:
      ayur, // Meditation wellness
      href: "./"
  },
  {
    id: 8,
    name: "Mind-Body Balance",
    role: "Integrating yoga, meditation, and breathwork for complete mind-body harmony.",
    profile:
      yoga, // Yoga balance image
      href: "./"
  },
];




// --- Utility for fallback images ---
const safeImage = (e) => {
  const target = e.target;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

// --- Custom hook for responsive detection ---
const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState('lg');
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else setScreenSize('lg');
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  
  return screenSize;
};

// --- Main Component ---
export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const screenSize = useResponsive();

  // Responsive sizing
  const getResponsiveValues = () => {
    switch (screenSize) {
      case 'xs':
        return {
          containerRadius: 150,
          profileSize: 45,
          cardWidth: 'w-36',
          avatarSize: 'w-12 h-12',
          avatarMargin: '-mt-8',
          fontSize: {
            name: 'text-sm',
            role: 'text-xs',
            email: 'text-xs'
          }
        };
      case 'sm':
        return {
          containerRadius: 130,
          profileSize: 50,
          cardWidth: 'w-40',
          avatarSize: 'w-14 h-14',
          avatarMargin: '-mt-9',
          fontSize: {
            name: 'text-base',
            role: 'text-xs',
            email: 'text-xs'
          }
        };
      case 'md':
        return {
          containerRadius: 150,
          profileSize: 65,
          cardWidth: 'w-44',
          avatarSize: 'w-16 h-16',
          avatarMargin: '-mt-10',
          fontSize: {
            name: 'text-base',
            role: 'text-sm',
            email: 'text-xs'
          }
        };
      default:
        return {
          containerRadius: 200,
          profileSize: 80,
          cardWidth: 'w-52',
          avatarSize: 'w-20 h-20',
          avatarMargin: '-mt-12',
          fontSize: {
            name: 'text-lg',
            role: 'text-sm',
            email: 'text-xs'
          }
        };
    }
  };

  const { containerRadius, profileSize, cardWidth, avatarSize, avatarMargin, fontSize } = getResponsiveValues();
  const containerSize = containerRadius * 2 + 100;

  // Calculate rotation for each profile
  const getRotation = React.useCallback(index => (index - activeIndex) * (360 / people.length), [activeIndex]);

  // Navigation
  const next = () => setActiveIndex((i) => (i + 1) % people.length);
  const prev = () => setActiveIndex((i) => (i - 1 + people.length) % people.length);

  const handleProfileClick = React.useCallback((index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  }, [activeIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'ArrowLeft') prev();
      else if (event.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-rotation
  React.useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    (<div
      className="flex flex-col items-center p-2 sm:p-4 relative min-h-[350px] sm:min-h-[400px] transition-colors duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
        <div className="container mx-auto px-4 z-20">
                  <div className="text-center mb-16">
                   
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4 mt-4">
                      Consultation Packages
                    </h2>
                    <p className=" text-lg max-w-2xl mx-auto text-gray-700">
                      Choose the perfect consultation package that fits your healthcare
                      needs
                    </p>
                  </div>
                  </div>
        
      <div
        className="relative flex items-center justify-center "
        style={{ width: containerSize, height: containerSize }}>
          
           

        {/* Active Person Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={people[activeIndex].id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className={`z-10 bg-[#dde6d5] dark:bg-[#dde6d5] backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 rounded-xl p-2 sm:p-2 md:p-4 ${cardWidth} text-center border border-gray-100 dark:border-gray-800`}>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              src={people[activeIndex].profile.src}
              alt={people[activeIndex].name}
              onError={safeImage}
              className={`${avatarSize} rounded-full mx-auto ${avatarMargin} border-4 border-white dark:border-black object-cover shadow-md`} />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}>
              <h2
                className={`mt-2 font-bold text-[#cc560d]  ${fontSize.name}`}>
                {people[activeIndex].name}
              </h2>
              <div
                className={`flex items-center justify-center text-gray-600 dark:text-gray-700 mt-1 ${fontSize.role}`}>
                <span className="text-[10px]">{people[activeIndex].role}</span>
              </div>
              <div
                className={`flex items-center justify-center text-gray-500 dark:text-gray-500 mt-0.5 ${fontSize.email}`}>
                
                <span className="truncate">{people[activeIndex].email}</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center items-center mt-2 sm:mt-3 space-x-1 sm:space-x-2">
              <button
                onClick={prev}
                className="p-1 sm:p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <ChevronLeft size={14} className="text-gray-700 dark:text-gray-300 sm:w-4 sm:h-4" />
              </button>
              <button
                className="px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full bg-[#cc560d] text-white hover:bg-indigo-700 dark:bg-[#cc560d] dark:hover:bg-indigo-600 transition-colors">
                <Link href={people[activeIndex].href}> Connect </Link>
              </button>
              <button
                onClick={next}
                className="p-1 sm:p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <ChevronRight size={14} className="text-gray-700 dark:text-gray-300 sm:w-4 sm:h-4" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting Profiles with Counter-Rotation */}
        {people.map((p, i) => {
          const rotation = getRotation(i);
          const isActive = i === activeIndex;
          
          return (
            (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.05
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
                zIndex: isActive ? 20 : 10,
                 
              }}>
              {/* Counter-rotation to keep image upright */}
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="w-full h-full">
                <motion.img
                  src={p.profile.src}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "border-4 border-gray-600 dark:border-gray-600 shadow-lg" 
                      : "border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                  }`} />
              </motion.div>
            </motion.div>
            )
          );
        })}
      </div>
      {/* Progress Indicator */}
      <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 sm:space-x-2">
        {people.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
              index === activeIndex 
                ? "bg-indigo-600 dark:bg-indigo-400" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }} />
        ))}
      </div>
    </div>)
  );
}