"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaBirthdayCake, FaGem, FaStar } from "react-icons/fa";

const BirthdayStory = () => {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("userName");
    const birthday = urlParams.get("birthday");

    const fetchFacts = async () => {
      if (!birthday) return;
      const [month, day] = birthday.split("-").slice(1);

      const zodiacSigns = [
        "Capricorn",
        "Aquarius",
        "Pisces",
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
      ];
      const zodiacDates = [
        [19, "♑"],
        [18, "♒"],
        [20, "♓"],
        [19, "♈"],
        [20, "♉"],
        [20, "♊"],
        [22, "♋"],
        [22, "♌"],
        [22, "♍"],
        [22, "♎"],
        [21, "♏"],
        [21, "♐"],
      ];
      const birthstones = [
        "Garnet",
        "Amethyst",
        "Aquamarine",
        "Diamond",
        "Emerald",
        "Pearl",
        "Ruby",
        "Peridot",
        "Sapphire",
        "Opal",
        "Topaz",
        "Turquoise",
      ];

      const zodiacIndex =
        day <= zodiacDates[month - 1][0] ? month - 1 : month % 12;
      const zodiacSign = `${zodiacDates[zodiacIndex][1]} You’re a ${zodiacSigns[zodiacIndex]} 🌟. That means you’re bold and brave.`;
      const birthstone = `💎 Your birthstone is ${
        birthstones[month - 1]
      } – the gem of protection.`;

      const birthDate = new Date(birthday);
      const now = new Date();
      const daysAlive = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
      const secondsAlive = Math.floor((now - birthDate) / 1000);
      const aliveFacts = [
        `🎉 You’ve been alive for ${daysAlive} days.`,
        `⏳ That’s over ${secondsAlive.toLocaleString()} seconds of existence!`,
      ];

      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`
        );
        const data = await response.json();

        const events = data.events
          .slice(0, 3)
          .map((event) => `On your birthday in ${event.year}, ${event.text}`);
        const births = data.births
          .slice(0, 2)
          .map((birth) => `Also born on your day: ${birth.text}`);

        setFacts([
          `Happy Birthday, ${userName}!`,
          `Your birthday is on ${birthday}.`,
          zodiacSign,
          birthstone,
          ...aliveFacts,
          ...events,
          ...births,
          "Thanks for being born on such an awesome day 🎉",
          "Slide 12 Placeholder",
        ]);
      } catch (error) {
        console.error("Error fetching birthday facts:", error);
      }
    };

    fetchFacts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
        {facts.slice(0, 12).map((fact, index) => (
          <motion.div
            key={index}
            className="snap-start w-full h-screen flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.5 }}
          >
            <motion.div
              className="p-6 bg-[rgba(255,255,255,0.05)] backdrop-filter backdrop-blur-lg border border-[rgba(255,255,255,0.2)] rounded-2xl shadow-xl max-w-md transition-transform transform hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.p
                className="mt-4 text-gray-300 text-4xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {fact}
              </motion.p>
              {index === 11 && (
                <div className="mt-6 flex flex-col items-center">
                  <FacebookShareButton
                    url={window.location.href}
                    quote="Check out my birthday story!"
                    className="mb-4"
                  >
                    <div className="px-4 py-2 bg-blue-600 text-white rounded-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                      Share on Facebook
                    </div>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title="Check out my birthday story!"
                    className="mb-4"
                  >
                    <div className="px-4 py-2 bg-blue-400 text-white rounded-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                      Share on Twitter
                    </div>
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={window.location.href}
                    title="Check out my birthday story!"
                    className="mb-4"
                  >
                    <div className="px-4 py-2 bg-green-500 text-white rounded-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                      Share on WhatsApp
                    </div>
                  </WhatsappShareButton>
                  <div
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  >
                    Restart Story
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayStory;
