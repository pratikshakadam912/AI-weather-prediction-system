import { useContext, useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";

import { getWeather, getPrediction } from "../api/WeatherApi";

function SearchBar() {
  const [city, setCity] = useState("");

  const {
    setWeather,
    setPrediction,

    loading,
    setLoading,

    predictionLoading,
    setPredictionLoading,

    setError,

    theme,
  } = useContext(WeatherContext);

  const isDark = theme === "dark";

  const handleSearch = async () => {
    const searchedCity = city.trim();

    if (!searchedCity) return;

    try {
      setLoading(true);
      setPredictionLoading(true);
      setError("");

      // ==========================================
      // 1. GET CURRENT WEATHER
      // ==========================================

      const weatherData = await getWeather(searchedCity);

      setWeather(weatherData);

      // Save latest weather
      localStorage.setItem("weather_current", JSON.stringify(weatherData));

      // ==========================================
      // 2. GET AI PREDICTION
      // ==========================================

      const predictionData = await getPrediction(searchedCity);

      setPrediction(predictionData);

      // Save latest prediction
      localStorage.setItem(
        "weather_prediction",
        JSON.stringify(predictionData),
      );

      // ==========================================
      // 3. SAVE SEARCH TO HISTORY
      // ==========================================

      const historyItem = {
        id: Date.now(),

        city: weatherData.city,
        country: weatherData.country,

        temperature: weatherData.temperature,
        description: weatherData.description,

        time: new Date().toLocaleString(),

        weather: weatherData,
        prediction: predictionData,
      };

      let existingHistory = [];

      try {
        existingHistory =
          JSON.parse(localStorage.getItem("weather_history")) || [];
      } catch (error) {
        console.error("Could not read weather history:", error);
      }

      // Remove previous search of the same city
      const filteredHistory = existingHistory.filter(
        (item) => item.city.toLowerCase() !== weatherData.city.toLowerCase(),
      );

      // Put newest search first
      const updatedHistory = [historyItem, ...filteredHistory];

      // Keep only latest 20 searches
      const limitedHistory = updatedHistory.slice(0, 20);

      // Save history
      localStorage.setItem("weather_history", JSON.stringify(limitedHistory));

      // Clear input
      setCity("");
    } catch (error) {
      console.error("Weather search error:", error);

      setError("Unable to find weather information for this city.");

      setWeather(null);
      setPrediction(null);
    } finally {
      setLoading(false);
      setPredictionLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* ================= SEARCH INPUT ================= */}

      <div
        className={`
          flex
          flex-1
          items-center
          rounded-2xl
          px-5
          py-4
          transition-all
          duration-300

          ${
            isDark
              ? "bg-slate-900 border border-slate-800"
              : "bg-white border border-pink-100 shadow-md"
          }
        `}
      >
        <FaMagnifyingGlass
          className={isDark ? "text-slate-400" : "text-pink-500"}
        />

        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className={`
            flex-1
            bg-transparent
            outline-none
            ml-4

            ${
              isDark
                ? "text-white placeholder:text-slate-500"
                : "text-slate-800 placeholder:text-slate-400"
            }
          `}
        />
      </div>

      {/* ================= SEARCH BUTTON ================= */}

      <button
        onClick={handleSearch}
        disabled={loading || predictionLoading || !city.trim()}
        className={`
          px-7
          py-4
          rounded-2xl
          font-semibold
          text-white
          transition-all
          duration-300

          disabled:opacity-50
          disabled:cursor-not-allowed

          ${
            isDark
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 hover:scale-105 shadow-lg"
          }
        `}
      >
        {loading || predictionLoading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
