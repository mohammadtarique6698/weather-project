import React, { useState, useLayoutEffect } from "react";

import BackgroundLayout from "./BackgroundLayout";
import WeatherCard from "./WeatherCard";
import MiniCard from "./SmallCard";

import { useStateContext } from "../assets/Context";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Weather = () => {
  const { weather, location, values, airQuality } = useStateContext();

  const [chartWidth, setChartWidth] = useState(800); // Default width

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ff7f0e",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#d62728",
    "#ff9896",
    "#9467bd",
    "#c5b0d5",
  ];
  const dataKeys = ["pv", "uv"];

  //console.log(values);
  console.log(airQuality);

  const data = values.map((value) => {
    const dayOfWeek = new Date(value.datetime)
      .toLocaleDateString("en", {
        weekday: "long",
      })
      .slice(0, 3);

    return {
      day: dayOfWeek,
      pv: value.mint,
      uv: value.maxt,
    };
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      // Change the width based on screen size
      const newWidth =
        window.innerWidth < 600
          ? 275
          : window.innerWidth > 600 && window.innerWidth < 1000
          ? 350
          : window.innerWidth > 1000 && window.innerWidth < 1200
          ? 450
          : 900;
      setChartWidth(newWidth);
    };
    // Initial call
    handleResize();
    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto bg-gradient-to-b from-blue-400 to-purple-500 flex flex-col">
      {/* Search input */}
      <BackgroundLayout />
      <div className="flex flex-row items-center justify-between my-5 px-10">
        <h1 className="sm:text-lg md:text-xl lg:text-3xl font-bold">
          Weather in {location}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto mt-2 px-10">
        {/* Weather and Mini cards */}
        <div className="md:grid md:grid-cols-12 gap-4 sm:flex sm:flex-col sm:justify-center sm:items-center">
          {/* Weather card */}
          <div className="col-span-6 sm:col-span-6 lg:col-span-4">
            <WeatherCard
              place={location}
              windspeed={weather.windspeed ? weather.windspeed : 0}
              humidity={weather.humidity}
              temperature={weather.temp}
              heatIndex={weather.heatindex}
              iconString={weather.conditions ? weather.conditions : ""}
              conditions={weather.conditions}
              data={weather}
            />
          </div>

          <div className="col-span-6 sm:col-span-6 lg:col-span-8 mt-5">
            {/* MiniCards */}
            <div className="flex flex-row gap-4 flex-wrap sm:items-center sm:justify-center">
              {values?.slice(2, 9).map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink bg-gradient-to-b from-lime-300 to-yellow-400 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <MiniCard
                    time={item.datetime}
                    temperature={item.temp}
                    iconString={item.conditions ? weather.conditions : ""}
                  />
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="mt-6">
              <div className="bg-white rounded-xl shadow-xl p-2">
                <BarChart width={chartWidth} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    label={{
                      value: "Day",
                      position: "insideBottom",
                      offset: -4,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Temp.(°C)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 15,
                    }}
                  />
                  <Tooltip
                    formatter={(value, name, props) => [`${value}°C`, name]}
                    labelFormatter={(label) => `${label}`}
                  />
                  {dataKeys.map((key, index) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </BarChart>
              </div>
            </div>
          </div>
        </div>

        {/* Additional content */}
        <div className="w-full mt-8">
          <h1 className="text-2xl font-semibold mb-4">
            Today's AQI for {location}
          </h1>
          <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-6 relative z-0">
            {Object.entries(airQuality)
              .slice(0, -1)
              .map(([key, value], index) => (
                <div
                  key={index}
                  className="rounded-xl shadow-md p-4 flex flex-col justify-between bg-gradient-to-b from-red-200 to-orange-400 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <h4 className="text-xl font-semibold text-center">{key}</h4>
                  <hr className="my-2" />
                  <div className="flex flex-col items-center">
                    <p>
                      Concentration:{" "}
                      <span className="font-semibold">
                        {value.concentration} ppm
                      </span>
                    </p>
                    <p>
                      AQI: <span className="font-semibold">{value.aqi}</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Overall AQI */}
        <div className="w-full mt-8 mb-16">
          <div className="rounded-xl p-4 relative z-0 shadow-md bg-gradient-to-b from-yellow-400 to bg-orange-400 hover:scale-105 transition-all duration-300 ease-in-out">
            <h4 className="text-lg text-center font-semibold">
              Overall AQI: <span>{airQuality.overall_aqi}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weather;

//   return (
//     <>
//       <div className="w-screen h-screen sm:w-full sm:h-full md:w-full md:h-full lg:w-screen lg:h-screen xl:w-screen xl:h-screen bg-gradient-to-b from-blue-400 to-purple-500">
//         <div className="flex flex-row items-center justify-center">
//           <input
//             className="text-[#212121] bg-transparent border border-black text-xl p-4 mt-5 w-80 rounded-full shadow-xl"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             onKeyUp={(e) => {
//               if (e.key === "Enter") {
//                 submitCity(city);
//               }
//             }}
//             placeholder="Enter city name and hit enter 😃"
//           />
//         </div>

//         <div className="mt-2">
//           {/* <BackgroundLayout /> */}

//           <div className="sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-3 md:grid grid-cols-12 py-4 px-8">
//             <div className="col-span-4 flex flex-col justify-center items-center">
//               <WeatherCard
//                 place={location}
//                 windspeed={weather.windspeed ? weather.windspeed : 0}
//                 humidity={weather.humidity}
//                 temperature={weather.temp}
//                 heatIndex={weather.heatindex}
//                 iconString={weather.conditions ? weather.conditions : ""}
//                 conditions={weather.conditions}
//                 data={weather}
//               />
//             </div>
//             <div className="col-span-8 flex flex-row justify-center md:justify-start items-start gap-3 flex-wrap mt-10 md:mt-0">
//               {values?.slice(2, 9).map((item, index) => (
//                 <div key={index} className="col-span-6">
//                   <MiniCard
//                     time={item.datetime}
//                     temperature={item.temp}
//                     iconString={item.conditions ? weather.conditions : ""}
//                   />
//                 </div>
//               ))}

//               <div
//                 style={{
//                   backgroundColor: "white",
//                   borderRadius: "2rem",
//                   padding: "1rem",
//                 }}
//               >
//                 <BarChart width={chartWidth} height={300} data={data}>
//                   <CartesianGrid strokeDasharray="4 4" />
//                   <XAxis
//                     dataKey="day"
//                     label={{
//                       value: "Day",
//                       position: "insideBottom",
//                       offset: -4,
//                     }}
//                   />
//                   <YAxis
//                     label={{
//                       value: "Temp. (\u00B0C)",
//                       angle: -90,
//                       position: "insideLeft",
//                       offset: 15,
//                     }}
//                   />
//                   <Tooltip />
//                   {dataKeys.map((key, index) => (
//                     <Bar
//                       key={key}
//                       dataKey={key}
//                       fill={colors[index % colors.length]}
//                     />
//                   ))}
//                 </BarChart>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-center">
//           <div className="w-[70%] h-[10rem] bg-white p-4 rounded-xl">
//             <div className="flex flex-wrap justify-around">
//               {Object.entries(airQuality)
//                 .slice(0, -1)
//                 .map(([key, value], index) => (
//                   <div
//                     key={index}
//                     className="w-48 h-48 mb-4 border border-black/50 rounded-xl shadow-md p-4 flex flex-col justify-between"
//                   >
//                     <h4 className="text-xl font-semibold text-center">{key}</h4>
//                     <hr />
//                     <div className="flex flex-col justify-center items-start">
//                       <h5 className="text-base">
//                         Concentration:{" "}
//                         <span className="font-semibold">
//                           {value.concentration} ppm
//                         </span>
//                       </h5>
//                       <h5 className="text-base">
//                         AQI: <span className="font-semibold">{value.aqi}</span>
//                       </h5>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>

//         <div className="w-full h-auto">
//           <div className="flex flex-row border border-black/50 rounded-xl shadow">
//             <h4>
//               Overall AQI: <span>{airQuality.overall_aqi}</span>
//             </h4>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Weather;
