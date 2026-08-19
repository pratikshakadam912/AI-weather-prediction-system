import { createContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);

  const [error, setError] = useState("");

  const [theme, setTheme] = useState("dark");

  // =========================
  // Search History
  // =========================

  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem("weatherHistory");

      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to load history:", error);
      return [];
    }
  });

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  // =========================
  // Add Search To History
  // =========================

  const addToHistory = (weatherData, predictionData) => {
    if (!weatherData) return;

    const newSearch = {
      id: Date.now(),

      city: weatherData.city,
      country: weatherData.country,

      temperature: weatherData.temperature,
      description: weatherData.description,
      condition: weatherData.condition,

      humidity: weatherData.humidity,
      wind_speed: weatherData.wind_speed,
      pressure: weatherData.pressure,
      visibility: weatherData.visibility,

      predicted_temperature:
        predictionData?.prediction?.predicted_temperature ??
        predictionData?.predicted_temperature ??
        null,

      predicted_condition:
        predictionData?.prediction?.predicted_condition ??
        predictionData?.predicted_condition ??
        null,

      rain_probability:
        predictionData?.prediction?.rain_probability ??
        predictionData?.rain_probability ??
        null,

      confidence:
        predictionData?.prediction?.confidence ??
        predictionData?.confidence ??
        null,

      recommendation:
        predictionData?.prediction?.recommendation ??
        predictionData?.recommendation ??
        "",

      timestamp: new Date().toISOString(),
    };

    setHistory((previousHistory) => {
      // Remove an older search for the same city
      const filteredHistory = previousHistory.filter(
        (item) => item.city.toLowerCase() !== weatherData.city.toLowerCase(),
      );

      // Newest search appears first
      return [newSearch, ...filteredHistory].slice(0, 30);
    });
  };

  // =========================
  // Remove History Item
  // =========================

  const removeFromHistory = (id) => {
    setHistory((previousHistory) =>
      previousHistory.filter((item) => item.id !== id),
    );
  };

  // =========================
  // Clear History
  // =========================

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,

        prediction,
        setPrediction,

        loading,
        setLoading,

        predictionLoading,
        setPredictionLoading,

        error,
        setError,

        theme,
        setTheme,

        history,
        addToHistory,
        removeFromHistory,
        clearHistory,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
