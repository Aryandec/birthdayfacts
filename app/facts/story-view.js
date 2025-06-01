import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const StoryView = ({ facts }) => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans flex items-center justify-center">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        className="w-full h-full"
      >
        {facts.map((fact, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="min-h-screen flex flex-col items-center justify-center bg-[rgba(255,255,255,0.05)] backdrop-filter backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">{fact.title}</h2>
              <div className="text-6xl mb-6">{fact.icon}</div>
              <p className="text-lg text-gray-300">{fact.text}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StoryView;
