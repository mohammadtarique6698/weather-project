import { useContext, createContext, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Bhilai");
  const [location, setLocation] = useState("");

  const [data, setData] = useState([]);
  const [airQuality, setAirQuality] = useState([]);

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
      },
      headers: {
        "X-RapidAPI-Key": "c3e2c990d3msh249fb82d580f6abp1a6753jsn8754c56b0fd4",
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      const data = Object.values(response.data.locations)[0];
      console.log(data);

      setData(data);
      setLocation(data.address);
      setValues(data.values);
      setWeather(data.values[0]);
    } catch (error) {
      enqueueSnackbar("No Such City found 😞", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "left" },
      });
      console.error(error);
    }
  };

  const fetchAirQualityData = async () => {
    const options = {
      method: "GET",
      url: "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality",
      params: { lat: data.latitude, lon: data.longitude },
      headers: {
        "X-RapidAPI-Key": "c3e2c990d3msh249fb82d580f6abp1a6753jsn8754c56b0fd4",
        "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      setAirQuality(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //console.log(airQuality);

  useEffect(() => {
    fetchWeather();
    fetchAirQualityData();
  }, [place, data.latitude, data.longitude]);

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        location,
        place,
        airQuality,
        data,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
