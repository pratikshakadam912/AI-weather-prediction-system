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

    setPredictionLoading,

    setError,

    theme,
  } = useContext(WeatherContext);

  const isDark = theme === "dark";

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);

      setPredictionLoading(true);

      setError("");

      // Get current weather
      const weatherData = await getWeather(city);

      setWeather(weatherData);

      // Get AI prediction
      const predictionData = await getPrediction(city);

      setPrediction(predictionData);

      setCity("");
    } catch (error) {
      console.error(error);

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

      <button
        onClick={handleSearch}
        disabled={loading || predictionLoading}
        className={`
          px-7
          py-4
          rounded-2xl
          font-semibold
          text-white
          transition-all
          duration-300

          disabled:opacity-50

          ${
            isDark
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 hover:scale-105 shadow-lg"
          }
        `}
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
