import React, { useState, useEffect } from "react";

import Sun from "../assets/icons/sun.png";
import Rain from "../assets/icons/rain.png";
import Cloud from "../assets/icons/cloud.png";
import Fog from "../assets/icons/fog.png";
import Snow from "../assets/icons/snow.png";
import Storm from "../assets/icons/storm.png";
import Wind from "../assets/icons/windy.png";

const SmallCard = ({ time, temperature, iconString }) => {
  const [icon, setIcon] = useState();
  const locale = "en";

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
      className="sm:w-auto md:w-28 h-44 p-4 flex flex-col"
      style={{
        backgroundImage: "rgba(225, 225, 225, 0.18)",
        boxShadow: "0, 0.5rem 2rem 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(0.5rem)",
        WebkitBackdropFilter: "blur(0.5rem)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: "1.25rem",
      }}
    >
      <h4 className="text-center mb-1">
        {
          new Date(time)
            .toLocaleTimeString(locale, { weekday: "long" })
            .split(" ")[0]
        }
      </h4>

      <hr />

      <div className="w-full flex justify-center items-center flex-1 mt-1">
        <img src={icon} alt="weather icon" className="w-16 h-16" />
      </div>
      <h4 className="text-center font-bold">
        Temp: <span className="font-normal">{temperature}&deg;C</span>
      </h4>
    </div>
  );
};

export default SmallCard;
