"use client";
import React, { useEffect, useState } from "react";
import { Libre_Baskerville } from "next/font/google";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const LibreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400"],
});

const Dashboard = () => {
  const { currentUser, userDataOb, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});

  function countValues() {}

  async function handleSetMood(mood) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    try {
      const newData = { ...userDataOb };

      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;

      // update current state
      setData(newData);
      // update global state
      setUserDataObj(newData);
      // update firestore
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log("failed to set data: ", err.message);
    }
  }

  const statuses = {
    num_days: 14,
    time_left: "13:14:45",
    date: new Date().toDateString(),
  };

  const moods = {
    "&*$@+": "😭",
    "Can't be more sad?": "🥲",
    "Just Existing": "🙂",
    Lovely: "🥰",
    "Fantastic!!": "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataOb) {
      return;
    }
    setData(userDataOb);
  }, [currentUser, userDataOb]);

  if (!currentUser) {
    return <Login />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-10 md:gap-12">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-800 rounded-lg place-items-center">
        {Object.keys(statuses).map((status, index) => {
          return (
            <button
              onClick={handleSetMood}
              key={index}
              className="p-4 flex flex-col gap-1
            sm:gap-2 overflow-hidden"
            >
              <p className="truncate font-medium uppercase text-xs sm:text-sm ">
                {status.replaceAll("_", " ")}
              </p>
              <p
                className={
                  "truncate text-base sm:text-lg overflow-hidden" +
                  LibreBaskerville.className
                }
              >
                {statuses[status]}
              </p>
            </button>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " +
          LibreBaskerville.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(moods).map((mood, index) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = index + 1;
                handleSetMood(currentMoodValue);
              }}
              key={index}
              className={
                "p-4 text-center rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-00 " +
                (index === 4 ? "col-span-2 sm:col-span-1" : "")
              }
            >
              <p className="text-4xl sm:text-5xl md:text-6xl mb-2">
                {moods[mood]}
              </p>
              <p className={"text-indigo-800 " + LibreBaskerville.className}>
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calendar data={data} handleSetMood={handleSetMood} />
    </div>
  );
};

export default Dashboard;
