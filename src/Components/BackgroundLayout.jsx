import React, { useState, useEffect } from "react";
import { useStateContext } from "../assets/Context";

import Clear from "../assets/images/Clear.jpg";
import Cloudy from "../assets/images/Cloudy.jpg";
import Rainy from "../assets/images/Rainy.jpg";
import Snowy from "../assets/images/snow.jpg";
import Thunderstorm from "../assets/images/Stormy.jpg";
import Fog from "../assets/images/fog.png";
import Sunny from "../assets/images/Sunny.jpg";

const BackgroundLayout = () => {
  const { weather } = useStateContext();

  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions;
      if (imageString.toLowerCase().includes("clear")) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes("cloud")) {
        setImage(Cloudy);
      } else if (
        imageString.toLowerCase().includes("rain") ||
        imageString.toLowerCase().includes("shower")
      ) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes("snow")) {
        setImage(Snowy);
      } else if (imageString.toLowerCase().includes("fog")) {
        setImage(Fog);
      } else if (
        imageString.toLowerCase().includes("thunder") ||
        imageString.toLowerCase().includes("storm")
      ) {
        setImage(Thunderstorm);
      } else {
        setImage(Sunny);
      }
    }
  }, [weather]);
  return (
    <img
      src={image}
      alt={"weather"}
      className="h-full w-full fixed left-0 top-15 opacity-30 z-0"
    />
  );
};

export default BackgroundLayout;
