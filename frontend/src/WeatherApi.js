import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-weather-prediction-system-83sb.onrender.com",
});

// ==========================================
// CURRENT WEATHER BY CITY
// ==========================================

export const getWeather = async (city) => {
  const response = await API.get(`/weather/${city}`);

  return response.data;
};

// ==========================================
// CURRENT WEATHER BY LOCATION
// ==========================================

export const getWeatherByLocation = async (lat, lon) => {
  const response = await API.get(`/weather/location/${lat}/${lon}`);

  return response.data;
};

// ==========================================
// AI PREDICTION
// ==========================================

export const getPrediction = async (city) => {
  const response = await API.get(`/prediction/${city}`);

  return response.data;
};

// ==========================================
// FORECAST BY CITY
// ==========================================

export const getForecast = async (city) => {
  const response = await API.get(`/forecast/${city}`);

  return response.data;
};

// ==========================================
// FORECAST BY LOCATION
// ==========================================

export const getForecastByLocation = async (lat, lon) => {
  const response = await API.get(`/forecast/location/${lat}/${lon}`);

  return response.data;
};
