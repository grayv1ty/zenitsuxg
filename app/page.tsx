"use client";

import { MorphingText } from "@/components/ui/morphing-text";
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, 2000); // Change every 2 seconds to match morphing animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center gap-12 p-4">
      <div className="flex flex-row items-center gap-2 md:gap-4 w-fit mx-auto">
        <span className="text-[20pt] font-sans font-black leading-none md:text-[4rem]">
          ZenitsuX
        </span>
        <div className="w-[150px] md:w-[400px]">
          <MorphingText
            texts={roles.map(r => r.name)}
            className="!h-[20pt] md:!h-[4rem] !mx-0"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 md:gap-8">
        {roles.map((role, index) => (
          role.image && (
            <div
              key={role.name}
              className={`relative w-16 h-16 md:w-24 md:h-24 transition-all duration-500 ${
                index === activeIndex ? "grayscale-0 scale-110" : "grayscale hover:grayscale-0"
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
