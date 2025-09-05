import React from "react";
import { Libre_Baskerville } from "next/font/google";
import Button from "./Button";
import Calendar from "./Calendar";

const LibreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const Hero = () => {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " +
          LibreBaskerville.className
        }
      >
        <span className="textGradient font-bold">Moodl</span> helps you track
        your <span className="textGradient font-bold">daily</span> mood!
      </h1>

      <p className="w-full mx-auto max-w-[500px] text-lg sm:text-xl md:text-2xl text-center p-4">
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year.</span>
      </p>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Button text="Sign Up" />
        <Button text="Login" dark />
      </div>

      <Calendar />
    </div>
  );
};

export default Hero;
