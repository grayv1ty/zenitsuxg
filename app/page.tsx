"use client";


import { MorphingText } from "@/components/ui/morphing-text";


export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      <div className="flex flex-row items-center gap-2 md:gap-4 w-fit mx-auto">
        <span className="text-[20pt] font-sans font-black leading-none md:text-[4rem]">
          ZenitsuX
        </span>
        <div className="w-[150px] md:w-[400px]">
          <MorphingText texts={["Gaming", "Assasin", "Tank", "Marksman"]} className="!h-[20pt] md:!h-[4rem] !mx-0"/>
        </div>
      </div>
    </div>
  );
}
