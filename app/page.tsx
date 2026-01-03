"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const roles = [
  { name: "Gaming", image: "" },
  { name: "Assassin", image: "/images/assassin-1.webp" },
  { name: "Tank", image: "/images/tank-1.webp" },
  { name: "Marksman", image: "/images/mm-1.webp" },
  { name: "Mage", image: "/images/mage-1.webp" },
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTextStyle = (index: number) => {
    const activeIndex = hoveredIndex ?? autoIndex;
    const diff = index - activeIndex;
    
    if (diff === 0) {
      // Selected text
      return "translate-y-0 opacity-100";
    } else if (diff === 1) {
      // One after
      return "translate-y-[-100%] opacity-50";
    } else if (diff === 2) {
      // Two after
      return "translate-y-[-200%] opacity-30";
    } else if (diff === 3) {
      // Three after
      return "translate-y-[-300%] opacity-15";
    } else if (diff > 3) {
      // Beyond - very faded
      return "translate-y-[-400%] opacity-5";
    } else if (diff === -1) {
      // One before
      return "translate-y-[100%] opacity-50";
    } else if (diff === -2) {
      // Two before
      return "translate-y-[200%] opacity-30";
    } else if (diff === -3) {
      // Three before
      return "translate-y-[300%] opacity-15";
    } else {
      // Far before - very faded
      return "translate-y-[400%] opacity-5";
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center gap-12 p-4">
      <div className="flex flex-row items-center gap-2 md:gap-4 w-fit mx-auto">
        <span className="text-[20pt] font-sans font-black leading-none md:text-[4rem] text-yellow-400">
          ZenitsuX
        </span>
        <div className="w-[150px] md:w-[400px] h-[20pt] md:h-[4rem] flex items-center relative ">
          {roles.map((role, index) => {
            const isActive = (hoveredIndex ?? autoIndex) === index;
            return (
              <span 
                key={role.name}
                className={`absolute text-[20pt] font-sans font-black leading-none md:text-[4rem] transition-all duration-500 ease-out ${getTextStyle(index)}`}
                style={{
                  WebkitTextStroke: isActive ? '2px #facc15' : '2px white',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {role.name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 md:gap-8">
        {roles.map((role, index) => (
          role.image && (
            <div
              key={role.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative w-16 h-16 md:w-24 md:h-24 transition-all duration-500 cursor-pointer ${
                (hoveredIndex ?? autoIndex) === index ? "grayscale-0 scale-110" : "grayscale"
              }`}
            >
              <Image
                src={role.image}
                alt={role.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
}
