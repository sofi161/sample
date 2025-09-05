import React from "react";
import { Libre_Baskerville } from "next/font/google";

const LibreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400"],
});

const Button = (props) => {
  const { text, dark } = props;
  return (
    <button
      className={
        "rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-indigo-900 " +
        (dark ? " text-white bg-indigo-900" : " text-indigo-900")
      }
    >
      <p
        className={
          "px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 " +
          LibreBaskerville.className
        }
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
