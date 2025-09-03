"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import meditation from "@/assets/meditation.png";

export default function ConsultPack() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-10">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-[#dde6d5] dark:bg-[#dde6d5] backdrop-blur-sm shadow-xl min-h-[500px] lg:min-h-[300px]"
        className="">
        <div className="max-w-3xl">
          <h2
            className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-amber-800">
            Introductory Wellness Consult
          </h2>
          <p className="mt-4 text-left  text-base/6 text-gray-600">
            A one-hour personalized session to understand your health concerns, assess your dosha (mind-body constitution), and provide initial recommendations. You’ll receive a follow-up email with notes and practical guidance to begin your Ayurvedic wellness journey.
          </p>
        </div>
        <img
          src={meditation}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl" />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#e6eac2] dark:bg-[#e6eac2] backdrop-blur-lg shadow-xl">
        <h2
          className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-amber-800">
          Ongoing Support
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-gray-600">
         Stay connected with flexible follow-up consultations after your initial plan. Choose from quick 20-minute check-ins for small adjustments or extended sessions for deeper guidance—ensuring your Ayurvedic journey continues with consistent care and support.
        </p>
      </WobbleCard>
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-3 bg-[#e6e6d5] dark:bg-[#e6e6d5] backdrop-blur-sm shadow-xl min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-3xl">
          <h2
            className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-amber-800">
            3-Session Wellness Journey
          </h2>
          <p className="mt-4 max-w-3xl text-left  text-base/6 text-gray-600">
            A structured program of three 45-minute sessions spread over 4–6 weeks. This journey includes a detailed health and lifestyle analysis, a tailored diet and daily routine, customized herbal support, and progress reviews—along with ongoing Email/WhatsApp support to keep you on track.
          </p>
        </div>
        <img
          src={meditation}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl" />
      </WobbleCard>
    </div>
  );
}
