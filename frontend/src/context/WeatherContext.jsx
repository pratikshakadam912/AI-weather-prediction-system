import { createContext, useState } from "react";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);

  const [predictionLoading, setPredictionLoading] = useState(false);

  const [error, setError] = useState("");

  const [theme, setTheme] = useState("dark");

  return (
    <WeatherContext.Provider
      value={{
        // Weather
        weather,
        setWeather,

        // Prediction
        prediction,
        setPrediction,

        // Loading
        loading,
        setLoading,

        predictionLoading,
        setPredictionLoading,

        // Error
        error,
        setError,

        // Theme
        theme,
        setTheme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
