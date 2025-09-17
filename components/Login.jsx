"use client";
import React, { useState } from "react";
import { Libre_Baskerville } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
const LibreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400"],
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("Signing up a new user");
        await signup(email, password);
      } else {
        console.log("Logging in existing user");
        await login(email, password);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h3
        className={
          "text-4xl sm:text-5xl md:text-6xl " + LibreBaskerville.className
        }
      >
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You're one step away!</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="outline-none duration-200 focus:border-indigo-950 rounded-full hover:border-indigo-950 w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-950"
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="outline-none duration-200 focus:border-indigo-950 rounded-full hover:border-indigo-950 w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-950"
        placeholder="password"
        type="password"
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-700 cursor-pointer"
        >
          {isRegister ? "Sign In" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default Login;
