"use client";
import React, { useEffect, useState } from "react";
import { Libre_Baskerville } from "next/font/google";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";
import { doc, setDoc } from "firebase/firestore";

const LibreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400"],
});

const Dashboard = () => {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }
    return {
      num_days: total_number_of_days,
      average_mood: sum_moods / total_number_of_days,
    };
  }

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;
      // update the current state
      setData(newData);
      // update the global state
      setUserDataObj(newData);
      // update firebase
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
      console.log("Failed to set data: ", err.message);
    }
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  const moods = {
    "&*$@+": "😭",
    "Can't be more sad?": "🥲",
    "Just Existing": "🙂",
    Lovely: "🥰",
    "Fantastic!!": "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

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
              <p className="truncate font-medium capitalize text-xs sm:text-sm ">
                {status.replaceAll("_", " ")}
              </p>
              <p
                className={
                  "truncate text-base sm:text-lg overflow-hidden" +
                  LibreBaskerville.className
                }
              >
                {statuses[status]} {status === "num_days" ? "🔥" : ""}
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
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
};

export default Dashboard;
