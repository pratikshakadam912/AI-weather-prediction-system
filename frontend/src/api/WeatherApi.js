import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-weather-prediction-system-83sb.onrender.com",
});

export const getWeather = async (city) => {
  const response = await API.get(`/weather/${city}`);
  return response.data;
};

export const getWeatherByLocation = async (lat, lon) => {
  const response = await API.get(`/weather/location/${lat}/${lon}`);
  return response.data;
};
