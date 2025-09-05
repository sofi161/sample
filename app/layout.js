import { Libre_Baskerville, Open_Sans } from "next/font/google";
import "./globals.css";

const LibreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400"],
});

const OpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Moodl",
  description: "Track your mood every day!",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1
        className={
          "text-base sm:text-lg textGradient " + LibreBaskerville.className
        }
      >
        Moodl
      </h1>
      <div className="flex items-center justify-between">something here</div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={"text-indigo-900 " + LibreBaskerville.className}>
        ~ Created by Sofi
      </p>
    </footer>
  );
  return (
    <html lang="en">
      <body
        className={
          "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-gray-700 " +
          OpenSans.className
        }
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
