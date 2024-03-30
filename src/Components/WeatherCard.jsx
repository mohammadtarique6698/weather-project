import React, { useEffect, useState } from "react";

import Sun from "../assets/icons/sun.png";
import Rain from "../assets/icons/rain.png";
import Cloud from "../assets/icons/cloud.png";
import Fog from "../assets/icons/fog.png";
import Snow from "../assets/icons/snow.png";
import Storm from "../assets/icons/storm.png";
import Wind from "../assets/icons/windy.png";

export const useDate = () => {
  const locale = "en";
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = today.toLocaleDateString();
  const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;
  const time = today.toLocaleDateString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    second: "numeric",
  });

  return {
    date,
    time,
  };
};

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  data,
}) => {
  const [icon, setIcon] = useState(Sun);

  const { time } = useDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(Cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(Rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(Sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(Storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(Fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(Snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(Wind);
      }
    }
  }, [iconString]);

  return (
    <div
      className="w-100 h-auto p-4 bg-gradient-to-b from-green-300 to-blue-400 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="flex w-full justify-center items-center gap-4 mt-4">
        <img src={icon} alt="weather icon" className="w-10 h-10" />
        <h4 className="font-bold text-3xl flex items-center">
          {temperature} &deg;C
        </h4>
      </div>
      <div className="font-bold text-center mt-2">{place}</div>
      <div className="w-full flex justify-between mt-4">
        <h4 className="flex-1 text-center p-2">{new Date().toDateString()}</h4>
        <h4 className="flex-1 text-center p-2">{time}</h4>
      </div>
      <div className="w-full flex justify-center items-center mt-4 gap-4">
        <div className="flex-1 text-center p-2 font-bold bg-blue-500 text-white rounded-xl shadow-md">
          <h4 className="font-semibold">Wind Speed:</h4>
          <span className="font-normal">{windspeed} m/s</span>
        </div>
        <div className="flex-1 text-center p-2 font-bold bg-green-500 text-white rounded-xl shadow-md">
          Humidity: <span>{humidity} %</span>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-1">
        <div className="w-full p-4 mt-4 justify-between items-center">
          <h4 className="font-semibold text-lg">
            Heat Index:{" "}
            <span className="text-lg">{heatIndex ? heatIndex : "N/A"}</span>
          </h4>
        </div>
        <div className="w-full p-4 mt-4 justify-between items-center">
          <h4 className="font-semibold text-lg">
            Cloud Coverage: <span className="text-lg">{data.cloudcover}%</span>
          </h4>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-1">
        <h4 className="w-full p-4 mt-4 font-semibold text-lg">
          Pressure:{" "}
          <span className="text-md">
            {(data.sealevelpressure / 1.01325).toFixed(2).trim()} atm
          </span>
        </h4>
        <h4 className="w-full p-4 mt-4 font-semibold text-lg">
          Dew: <span className="text-lg">{data.dew}&deg;C</span>
        </h4>
      </div>

      <hr className="bg-gray-300 my-4" />

      <div className="w-full p-4 mt-4 text-center text-lg font-semibold">
        Status of Weather: <span className="font-bold">{conditions}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
